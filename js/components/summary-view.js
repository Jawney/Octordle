export class SummaryView {
    constructor(state) {
        this.state = state;
        this.container = document.getElementById('dock');
    }

    update() {
        // Create a summary container that replaces the keymap
        const summary = document.createElement('div');
        summary.id = 'game-summary';
        summary.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(4, 1fr);
            gap: 4px 20px;
            padding: 5px 20px;
            height: var(--dock-h);
            box-sizing: border-box;
        `;

        this.state.targetWords.forEach((word, i) => {
            const isSolved = this.state.boardStates[i].solved;
            const item = document.createElement('div');
            item.innerText = `${i + 1}. ${word}`;
            item.style.cssText = `
                font-weight: 900;
                font-size: 0.85rem;
                color: ${isSolved ? 'var(--correct)' : 'var(--invalid)'};
                text-align: left;
            `;
            summary.appendChild(item);
        });

        // Clear dock and show summary
        const keymap = document.getElementById('keymap');
        if (keymap) keymap.style.display = 'none';
        
        // Remove existing summary if any
        const oldSummary = document.getElementById('game-summary');
        if (oldSummary) oldSummary.remove();
        
        this.container.appendChild(summary);
    }

    hide() {
        const summary = document.getElementById('game-summary');
        if (summary) summary.remove();
        const keymap = document.getElementById('keymap');
        if (keymap) keymap.style.display = 'grid';
    }
}
