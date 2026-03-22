import { getFeedback } from '../engine/game-logic.js';

export class BoardView {
    constructor(state) {
        this.state = state;
        this.slider = document.getElementById('board-slider');
        this.dots = document.getElementById('nav-dots');
    }

    init() {
        this.slider.innerHTML = '';
        this.dots.innerHTML = '';
        
        for (let s = 0; s < 4; s++) {
            const screen = document.createElement('div');
            screen.className = 'screen-pair';
            
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
            }
            this.slider.appendChild(screen);
            
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.id = `dot-${s}`;
            this.dots.appendChild(dot);
        }
    }

    update() {
        this.slider.style.transform = `translateX(-${this.state.currentScreenIdx * 100}%)`;
        
        for (let s = 0; s < 4; s++) {
            document.getElementById(`dot-${s}`).classList.toggle('active', s === this.state.currentScreenIdx);
        }
        
        for (let i = 0; i < 8; i++) {
            const grid = document.getElementById(`board-${i}`);
            const boardState = this.state.boardStates[i];
            const target = this.state.targetWords[i];
            
            for (let r = 0; r < 13; r++) {
                const row = grid.children[r];
                const guess = boardState.guesses[r];
                
                if (guess) {
                    const feedback = getFeedback(guess, target);
                    for (let c = 0; c < 5; c++) {
                        const tile = row.children[c];
                        tile.innerText = guess[c];
                        tile.setAttribute('data-state', feedback[c]);
                    }
                } else if (r === this.state.globalGuessCount && !boardState.solved) {
                    for (let c = 0; c < 5; c++) {
                        const tile = row.children[c];
                        const char = this.state.currentGuess[c] || "";
                        tile.innerText = char;
                        tile.setAttribute('data-state', char ? 'tbd' : 'empty');
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
        const currentScreen = this.slider.children[this.state.currentScreenIdx];
        const boards = currentScreen.querySelectorAll('.grid');
        boards.forEach(grid => {
            const row = grid.children[this.state.globalGuessCount];
            if (row) {
                row.classList.add('invalid');
                setTimeout(() => row.classList.remove('invalid'), 800);
            }
        });
    }
}
