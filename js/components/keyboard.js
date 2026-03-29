import { getFeedback } from '../engine/game-logic.js';

export class Keyboard {
    constructor(state) {
        this.state = state;
        this.tray = document.getElementById('keymap');
        this.rows = [
            "QWERTYUIOP".split(''),
            "ASDFGHJKL".split(''),
            "ZXCVBNM".split('')
        ];
    }

    init() {
        this.tray.innerHTML = '';
        this.rows.forEach(rowKeys => {
            const row = document.createElement('div');
            row.className = 'key-row';
            rowKeys.forEach(l => {
                const k = document.createElement('div');
                k.className = 'key';
                k.id = `key-${l}`;
                k.innerText = l;
                row.appendChild(k);
            });
            this.tray.appendChild(row);
        });
    }

    update() {
        this.rows.flat().forEach(l => {
            const k = document.getElementById(`key-${l}`);
            let best = "";
            
            for (let i = 0; i < 8; i++) {
                // SKIP boards that are already solved
                if (this.state.boardStates[i].solved) continue;

                const target = this.state.targetWords[i];
                this.state.boardStates[i].guesses.forEach(g => {
                    const feedback = getFeedback(g, target);
                    for (let c = 0; c < 5; c++) {
                        if (g[c] === l) {
                            const state = feedback[c];
                            if (state === 'correct') best = 'correct';
                            else if (state === 'present' && best !== 'correct') best = 'present';
                            else if (best === "") best = 'absent';
                        }
                    }
                });
            }
            k.setAttribute('data-state', best);
        });
    }
}
