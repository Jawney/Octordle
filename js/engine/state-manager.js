const STORAGE_KEY = 'daily-octordle';

export class StateManager {
    constructor() {
        this.isDaily = true;
        this.dailySeed = 0;
        this.globalGuessCount = 0;
        this.boardStates = []; // { guesses: [], solved: false }
        this.targetWords = [];
        this.currentGuess = "";
        this.currentScreenIdx = 0;
    }

    save() {
        if (this.isDaily) {
            const data = {
                seed: this.dailySeed,
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
            if (s.seed === this.dailySeed) {
                this.globalGuessCount = s.count;
                for (let i = 0; i < 8; i++) {
                    this.boardStates[i].guesses = s.guesses[i] || [];
                    if (this.boardStates[i].guesses.includes(this.targetWords[i])) {
                        this.boardStates[i].solved = true;
                    }
                }
            }
        }
    }

    clear() {
        localStorage.removeItem(STORAGE_KEY);
    }

    reset(seed, isDaily) {
        this.isDaily = isDaily;
        this.dailySeed = seed;
        this.globalGuessCount = 0;
        this.currentGuess = "";
        this.currentScreenIdx = 0;
        this.boardStates = Array.from({ length: 8 }, () => ({ guesses: [], solved: false }));
        this.targetWords = [];
    }
}
