let lastHeight = window.innerHeight;

export function updateViewport() {
    if (window.innerWidth < 500) {
        const v = window.visualViewport;
        const shell = document.getElementById('app-shell');
        
        // Only trigger a resize if the height change is significant (> 20px)
        // This prevents the 'flash' caused by the iOS suggestion bar jittering.
        if (shell && Math.abs(v.height - lastHeight) > 20) {
            shell.style.height = v.height + "px";
            lastHeight = v.height;
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
