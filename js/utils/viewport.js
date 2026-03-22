export function updateViewport() {
    const v = window.visualViewport;
    const shell = document.getElementById('app-shell');
    if (shell) {
        shell.style.height = v.height + "px";
        // On desktop, we don't want to offset the shell vertically 
        // unless we're simulating the keyboard.
        if (window.ontouchstart !== undefined) {
            shell.style.top = v.offsetTop + "px";
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
