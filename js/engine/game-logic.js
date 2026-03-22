export function getFeedback(guess, target) {
    const result = new Array(5).fill('absent');
    const targetArray = target.split('');
    const guessArray = guess.split('');

    // First pass for 'correct'
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === targetArray[i]) {
            result[i] = 'correct';
            targetArray[i] = null;
            guessArray[i] = null;
        }
    }

    // Second pass for 'present'
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] && targetArray.includes(guessArray[i])) {
            result[i] = 'present';
            targetArray[targetArray.indexOf(guessArray[i])] = null;
        }
    }
    
    return result;
}
