import { getFeedback } from '../engine/game-logic.js';

export class BoardView {
    constructor(state) {
        this.state = state;
        this.allAllowed = [];
        this.slider = document.getElementById('board-slider');
        this.dots = document.getElementById('nav-dots');
    }

    setAllowed(list) {
        this.allAllowed = list;
    }

    init() {
        this.slider.innerHTML = '';
        this.dots.innerHTML = '';
        
        for (let s = 0; s < 4; s++) {
            const screen = document.createElement('div');
            screen.className = 'screen-pair';
            
            // Create a container for the pair of dots
            const pairContainer = document.createElement('div');
            pairContainer.className = 'dot-pair';
            pairContainer.id = `pair-${s}`;

            for (let b = 0; b < 2; b++) {
                const idx = s * 2 + b;
                const box = document.createElement('div');
                box.className = 'board-box';
                
                const grid = document.createElement('div');
                grid.className = 'grid';
                grid.id = `board-${idx}`;
                
                for (let r = 0; r < 13; r++) {
                    const row = document.createElement('div');
                    row.className = 'row';
                    for (let c = 0; c < 5; c++) {
                        const t = document.createElement('div');
                        t.className = 'tile';
                        row.appendChild(t);
                    }
                    grid.appendChild(row);
                }
                box.appendChild(grid);
                screen.appendChild(box);

                // Create a dot for each board inside the pair container
                const dot = document.createElement('div');
                dot.className = 'dot';
                dot.id = `dot-${idx}`;
                pairContainer.appendChild(dot);
            }
            this.slider.appendChild(screen);
            this.dots.appendChild(pairContainer);
        }
    }

    update() {
        this.slider.style.transform = `translateX(-${this.state.currentScreenIdx * 100}%)`;
        
        // Update pairs and dots
        for (let s = 0; s < 4; s++) {
            const pair = document.getElementById(`pair-${s}`);
            pair.classList.toggle('active', s === this.state.currentScreenIdx);
            
            for (let b = 0; b < 2; b++) {
                const idx = s * 2 + b;
                const dot = document.getElementById(`dot-${idx}`);
                dot.setAttribute('data-solved', this.state.boardStates[idx].solved);
            }
        }

        const isGuessFull = this.state.currentGuess.length === 5;
        const isGuessInvalid = isGuessFull && !this.allAllowed.includes(this.state.currentGuess);
        
        for (let i = 0; i < 8; i++) {
            const grid = document.getElementById(`board-${i}`);
            const boardState = this.state.boardStates[i];
            const target = this.state.targetWords[i];
            
            for (let r = 0; r < 13; r++) {
                const row = grid.children[r];
                const guess = boardState.guesses[r];
                
                // Real-time invalid class toggle
                row.classList.toggle('invalid', r === this.state.globalGuessCount && !boardState.solved && isGuessInvalid);

                if (guess) {
                    const feedback = getFeedback(guess, target);
                    for (let c = 0; c < 5; c++) {
                        const tile = row.children[c];
                        tile.innerText = guess[c];
                        tile.setAttribute('data-state', feedback[c]);
                        
                        // Trigger flip animation only if it's the most recent guess
                        if (r === this.state.globalGuessCount - 1) {
                            tile.style.animationDelay = `${c * 100}ms`;
                            tile.classList.add('flip');
                        }
                    }
                } else if (r === this.state.globalGuessCount && !boardState.solved) {
                    for (let c = 0; c < 5; c++) {
                        const tile = row.children[c];
                        const char = this.state.currentGuess[c] || "";
                        const oldText = tile.innerText;
                        tile.innerText = char;
                        tile.setAttribute('data-state', char ? 'tbd' : 'empty');
                        
                        // Trigger pop animation when a new letter is added
                        if (char && !oldText) {
                            tile.classList.remove('pop');
                            void tile.offsetWidth; // Force reflow
                            tile.classList.add('pop');
                        }
                    }
                } else {
                    for (let c = 0; c < 5; c++) {
                        const tile = row.children[c];
                        tile.innerText = "";
                        tile.setAttribute('data-state', 'empty');
                    }
                }
            }
        }
    }

    showInvalid() {
        // Handled in update()
    }
}
