export function updateViewport() {
    // Only prevent the OS from scrolling when the keyboard opens.
    // We no longer manually resize the shell or move it.
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
