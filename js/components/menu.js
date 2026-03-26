export class Menu {
    constructor(callbacks) {
        this.callbacks = callbacks;
        this.isOpen = false;
        this.createMenu();
    }

    createMenu() {
        const header = document.querySelector('header');
        
        // Remove old button if exists
        const oldHamburger = document.getElementById('hamburger');
        if (oldHamburger) oldHamburger.remove();

        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.id = 'hamburger';
        hamburger.innerHTML = '&#9776;'; // Hamburger icon
        hamburger.style.cssText = `
            background: none; border: none; color: white;
            font-size: 1.5rem; padding: 0 5px; cursor: pointer;
        `;
        header.appendChild(hamburger); // Appends to the end (right side)

        // Create overlay menu
        this.overlay = document.createElement('div');
        this.overlay.id = 'menu-overlay';
        this.overlay.style.cssText = `
            position: absolute; top: var(--safe-top); right: -250px; width: 250px; 
            height: calc(100% - var(--safe-top));
            background: #1a1a1b; z-index: 10000; transition: right 0.3s ease;
            box-shadow: -2px 0 10px rgba(0,0,0,0.5); padding-top: 60px;
            display: flex; flex-direction: column; gap: 20px;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute; top: 10px; left: 10px; background: none; border: none;
            color: white; font-size: 2rem;
        `;
        closeBtn.onclick = () => this.toggle();
        this.overlay.appendChild(closeBtn);

        const dailyBtn = this.createMenuButton('Daily Octordle', () => {
            this.callbacks.startDaily();
            this.toggle();
        });
        const practiceBtn = this.createMenuButton('Practice Mode', () => {
            this.callbacks.startPractice();
            this.toggle();
        });
        const resetDailyBtn = this.createMenuButton('Reset Daily', () => {
            this.callbacks.resetDaily();
            this.toggle();
        });
        resetDailyBtn.style.marginTop = 'auto'; // Push to bottom
        resetDailyBtn.style.marginBottom = '30px'; // Add space below
        resetDailyBtn.style.background = '#8e1c1c'; // Dark red for "destructive" action

        this.overlay.appendChild(dailyBtn);
        this.overlay.appendChild(practiceBtn);
        this.overlay.appendChild(resetDailyBtn);
        
        const shell = document.getElementById('app-shell');
        if (shell) shell.appendChild(this.overlay);
        else document.body.appendChild(this.overlay);

        hamburger.onclick = () => this.toggle();
    }

    createMenuButton(text, callback) {
        const btn = document.createElement('button');
        btn.innerText = text;
        btn.style.cssText = `
            background: #3a3a3c; border: 1px solid #555; color: white;
            padding: 15px; margin: 0 20px; border-radius: 8px; font-weight: 800;
        `;
        btn.onclick = callback;
        return btn;
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.overlay.style.right = this.isOpen ? '0' : '-250px';
    }
}
