export class Menu {
    constructor(callbacks) {
        this.callbacks = callbacks;
        this.isOpen = false;
        this.createMenu();
    }

    createMenu() {
        const header = document.querySelector('header');
        
        // Remove old buttons
        const btnRow = header.querySelector('.btn-row');
        if (btnRow) btnRow.remove();

        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.id = 'hamburger';
        hamburger.innerHTML = '&#9776;'; // Hamburger icon
        hamburger.style.background = 'none';
        hamburger.style.border = 'none';
        hamburger.style.color = 'white';
        hamburger.style.fontSize = '1.5rem';
        hamburger.style.padding = '0 10px';
        header.appendChild(hamburger);

        // Create overlay menu
        this.overlay = document.createElement('div');
        this.overlay.id = 'menu-overlay';
        this.overlay.style.cssText = `
            position: absolute; top: 0; right: -250px; width: 250px; height: 100%;
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

        this.overlay.appendChild(dailyBtn);
        this.overlay.appendChild(practiceBtn);
        
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
