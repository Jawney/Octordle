export function updateViewport() {
    // Only resize the shell if we're on a mobile device (width < 500px)
    if (window.innerWidth < 500) {
        const v = window.visualViewport;
        const shell = document.getElementById('app-shell');
        if (shell) {
            shell.style.height = v.height + "px";
        }
    }
    window.scrollTo(0, 0);
}

export function focusInput() {
    const input = document.getElementById('hidden-input');
    if (input) input.focus();
}

export function initViewport() {
    window.visualViewport.addEventListener('resize', updateViewport);
    window.visualViewport.addEventListener('scroll', updateViewport);
    document.body.addEventListener('click', focusInput);
}
