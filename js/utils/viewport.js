export function updateViewport() {
    // Lock the screen to the top to prevent native iOS "scroll-to-input" jitters.
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
