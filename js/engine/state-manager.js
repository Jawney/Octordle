const STORAGE_KEY = 'daily-octordle';

export class StateManager {
    constructor() {
        this.isDaily = true;
        this.dailySeed = 0;
        this.puzzleId = ""; // e.g. "05f5"
        this.globalGuessCount = 0;
        this.boardStates = []; // { guesses: [], solved: false }
        this.targetWords = [];
        this.currentGuess = "";
        this.currentScreenIdx = 0;
    }

    save() {
        if (this.isDaily) {
            const data = {
                puzzleId: this.puzzleId,
                guesses: this.boardStates.map(b => b.guesses),
                count: this.globalGuessCount
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }

    load() {
        if (!this.isDaily) return;
        
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const s = JSON.parse(saved);
            if (s.puzzleId === this.puzzleId) {
                this.globalGuessCount = s.count;
                for (let i = 0; i < 8; i++) {
                    this.boardStates[i].guesses = s.guesses[i] || [];
                    if (this.boardStates[i].guesses.includes(this.targetWords[i])) {
                        this.boardStates[i].solved = true;
                    }
                }
            } else {
                // ID mismatch: It's a new day or different mode. Clear old progress.
                this.clear();
            }
        }
    }

    clear() {
        localStorage.removeItem(STORAGE_KEY);
    }

    reset(seed, isDaily, modePrefix = "0") {
        this.isDaily = isDaily;
        this.dailySeed = seed;
        this.puzzleId = `${modePrefix}${seed.toString(16)}`;
        this.globalGuessCount = 0;
        this.currentGuess = "";
        this.currentScreenIdx = 0;
        this.boardStates = Array.from({ length: 8 }, () => ({ guesses: [], solved: false }));
        this.targetWords = [];
    }

    get isFinished() {
        const allSolved = this.boardStates.every(b => b.solved);
        const outOfGuesses = this.globalGuessCount >= 13;
        return allSolved || outOfGuesses;
    }
}
