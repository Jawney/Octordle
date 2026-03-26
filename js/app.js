import { loadDictionaries } from './engine/dictionary.js';
import { StateManager } from './engine/state-manager.js';
import { mulberry32 } from './utils/random.js';
import { BoardView } from './components/board-view.js';
import { Keyboard } from './components/keyboard.js';
import { Menu } from './components/menu.js';
import { initViewport, updateViewport, focusInput } from './utils/viewport.js';

class App {
    constructor() {
        this.state = new StateManager();
        this.boardView = new BoardView(this.state);
        this.keyboard = new Keyboard(this.state);
        this.dictionaries = { solutions: [], allAllowed: [] };
        
        this.menu = new Menu({
            startDaily: () => this.startDaily(),
            startPractice: () => this.startPractice()
        });

        this.init();
        this.displayVersion();
    }

    displayVersion() {
        const versionString = "v1.5.0"; 
        const display = document.getElementById('version-display');
        if (display) {
            display.innerText = versionString;
            console.log("App Version:", versionString);
        }
        document.title = `Octordle Pro Modular ${versionString}`;
    }

    async init() {
        this.dictionaries = await loadDictionaries();
        initViewport();
        this.setupInput();
        this.setupTouch();
        this.startDaily();
    }

    setupInput() {
        const input = document.getElementById('hidden-input');
        input.addEventListener('input', () => {
            this.state.currentGuess = input.value.toUpperCase();
            this.updateUI();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.state.currentGuess.length === 5) {
                this.submitGuess();
            } else if (e.key === 'ArrowRight') {
                if (this.state.currentScreenIdx < 3) {
                    this.state.currentScreenIdx++;
                    this.updateUI();
                }
            } else if (e.key === 'ArrowLeft') {
                if (this.state.currentScreenIdx > 0) {
                    this.state.currentScreenIdx--;
                    this.updateUI();
                }
            }
        });
    }

    submitGuess() {
        const guess = this.state.currentGuess;
        if (!this.dictionaries.allAllowed.includes(guess)) {
            this.showInvalid();
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
        this.boardView.showInvalid();
        this.showMessage("NOT IN WORD LIST");
    }

    showMessage(txt) {
        const m = document.getElementById('message');
        m.innerText = txt;
        m.style.display = 'block';
        setTimeout(() => m.style.display = 'none', 2000);
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
        const modeLabel = document.getElementById('mode-label');
        if (modeLabel) {
            // Update only the text node, not the whole innerHTML which contains the version
            modeLabel.childNodes[0].textContent = (this.state.isDaily ? "DAILY" : "PRACTICE") + " OCTORDLE ";
        }
        this.boardView.update();
        this.keyboard.update();
    }
}

// Initialize App
new App();
