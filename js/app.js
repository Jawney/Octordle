import { loadDictionaries } from './engine/dictionary.js';
import { StateManager } from './engine/state-manager.js';
import { mulberry32 } from './utils/random.js';
import { BoardView } from './components/board-view.js';
import { Keyboard } from './components/keyboard.js';
import { SummaryView } from './components/summary-view.js';
import { Menu } from './components/menu.js';
import { initViewport, updateViewport, focusInput } from './utils/viewport.js';

class App {
    constructor() {
        this.state = new StateManager();
        this.boardView = new BoardView(this.state);
        this.keyboard = new Keyboard(this.state);
        this.summaryView = new SummaryView(this.state);
        this.dictionaries = { solutions: [], allAllowed: [] };
        this.version = "v1.8.0"; // Default fallback

        this.menu = new Menu({
            startDaily: () => this.startDaily(),
            startPractice: () => this.startPractice(),
            resetDaily: () => this.resetDaily()
        });

        this.init();
        this.setupMidnightWatcher();
    }

    setupMidnightWatcher() {
        // Check every minute if the date has changed
        setInterval(() => {
            if (!this.state.isDaily) return;
            
            const now = new Date();
            const currentSeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
            
            if (currentSeed !== this.state.dailySeed) {
                console.log("Midnight detected! Resetting Daily game...");
                this.startDaily();
            }
        }, 60000);
    }

    resetDaily() {
        if (confirm("Reset Daily Game? This will wipe your progress for today.")) {
            this.state.clear();
            this.startDaily();
        }
    }

    async init() {
        // Fetch version from package.json
        try {
            const response = await fetch('package.json');
            const pkg = await response.json();
            this.version = `v${pkg.version}`;
        } catch (e) {
            console.warn("Could not fetch version from package.json, using fallback.");
        }
        
        this.displayVersion();
        this.dictionaries = await loadDictionaries();
        this.boardView.setAllowed(this.dictionaries.allAllowed);
        initViewport();
        this.setupInput();
        this.setupTouch();
        this.startDaily();
    }

    displayVersion() {
        const display = document.getElementById('version-display');
        if (display) {
            display.innerText = this.version;
            console.log("App Version:", this.version);
        }
        document.title = `Octordle ${this.version}`;
    }

    setupInput() {
        const input = document.getElementById('hidden-input');
        input.addEventListener('input', () => {
            if (this.state.isFinished) {
                input.value = "";
                return;
            }
            this.state.currentGuess = input.value.toUpperCase();
            this.updateUI();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                if (this.state.currentScreenIdx < 3) {
                    this.state.currentScreenIdx++;
                    this.updateUI();
                }
                return;
            } else if (e.key === 'ArrowLeft') {
                if (this.state.currentScreenIdx > 0) {
                    this.state.currentScreenIdx--;
                    this.updateUI();
                }
                return;
            }

            if (this.state.isFinished) return;

            if (e.key === 'Enter' && this.state.currentGuess.length === 5) {
                this.submitGuess();
            }
        });
    }

    submitGuess() {
        if (this.state.isFinished) return;

        const guess = this.state.currentGuess;
        if (!this.dictionaries.allAllowed.includes(guess)) {
            return;
        }

        let anyNewSolved = false;
        for (let i = 0; i < 8; i++) {
            if (!this.state.boardStates[i].solved) {
                this.state.boardStates[i].guesses.push(guess);
                if (guess === this.state.targetWords[i]) {
                    this.state.boardStates[i].solved = true;
                    anyNewSolved = true;
                }
            }
        }

        this.state.globalGuessCount++;
        this.state.currentGuess = "";
        document.getElementById('hidden-input').value = "";
        
        this.state.save();
        this.updateUI();
    }

    showInvalid() {
        // Handled in BoardView.update()
    }

    showMessage(txt) {
        // No longer needed for invalid words
    }

    setupTouch() {
        let touchStartX = 0;
        document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, false);
        document.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 40) {
                if (diff > 0 && this.state.currentScreenIdx < 3) this.state.currentScreenIdx++;
                else if (diff < 0 && this.state.currentScreenIdx > 0) this.state.currentScreenIdx--;
                this.updateUI();
            }
        }, false);
    }

    startDaily() {
        const d = new Date();
        const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
        this.resetGame(seed, true);
    }

    startPractice() {
        const seed = Math.floor(Math.random() * 1000000);
        this.resetGame(seed, false);
    }

    resetGame(seed, isDaily) {
        this.state.reset(seed, isDaily);
        const rand = mulberry32(seed);
        for (let i = 0; i < 8; i++) {
            const word = this.dictionaries.solutions[Math.floor(rand() * this.dictionaries.solutions.length)];
            this.state.targetWords.push(word);
        }

        if (isDaily) this.state.load();

        this.boardView.init();
        this.keyboard.init();
        this.updateUI();
        
        setTimeout(() => {
            updateViewport();
            focusInput();
        }, 300);
    }

    updateUI() {
        const modeText = document.getElementById('mode-text');
        if (modeText) {
            modeText.textContent = (this.state.isDaily ? "DAILY" : "PRACTICE") + " OCTORDLE";
        }
        this.boardView.update();
        
        if (this.state.isFinished) {
            this.summaryView.update();
        } else {
            this.summaryView.hide();
            this.keyboard.update();
        }
    }
}

// Initialize App
new App();
