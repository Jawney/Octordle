const STORAGE_KEY = 'daily-octordle';

export class StateManager {
    constructor() {
        this.isDaily = true;
        this.dailySeed = 0;
        this.puzzleId = "";
        this.globalGuessCount = 0;
        this.boardStates = [];
        this.targetWords = [];
        this.currentGuess = "";
        this.currentScreenIdx = 0;
    }

    save() {
        if (!this.isDaily) return;
        
        // Load the full collection of saved games
        const saved = localStorage.getItem(STORAGE_KEY);
        const collection = saved ? JSON.parse(saved) : {};
        
        // Update only this specific puzzle's entry
        collection[this.puzzleId] = {
            guesses: this.boardStates.map(b => b.guesses),
            count: this.globalGuessCount
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    }

    load() {
        if (!this.isDaily) return;
        
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return;

        const collection = JSON.parse(saved);
        
        // 1. Automatic Cleanup: Remove any puzzles from previous days
        const currentSuffix = this.dailySeed.toString(16);
        let changed = false;
        for (const id in collection) {
            if (!id.endsWith(currentSuffix)) {
                delete collection[id];
                changed = true;
            }
        }
        if (changed) localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));

        // 2. Load the current puzzle if it exists in the collection
        const s = collection[this.puzzleId];
        if (s) {
            this.globalGuessCount = s.count;
            for (let i = 0; i < 8; i++) {
                this.boardStates[i].guesses = s.guesses[i] || [];
                if (this.boardStates[i].guesses.includes(this.targetWords[i])) {
                    this.boardStates[i].solved = true;
                }
            }
        }
    }

    clear() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const collection = JSON.parse(saved);
            delete collection[this.puzzleId];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
        }
    }

    clearAll() {
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
