export function updateViewport() {
    const v = window.visualViewport;
    const shell = document.getElementById('app-shell');
    if (shell) {
        shell.style.height = v.height + "px";
        
        // On iOS, if the keyboard is open (v.offsetTop > 0), 
        // we move the shell to match the viewport's offset.
        if (v.offsetTop > 0) {
            shell.style.top = v.offsetTop + "px";
        } else {
            shell.style.top = "0";
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
