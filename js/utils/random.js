export function getSeededRandom(seed) {
    let t = Math.sin(seed) * 10000;
    return t - Math.floor(t);
}

export function seededShuffle(array, initialSeed) {
    let currentSeed = initialSeed;
    let i = array.length;
    let temp, randomIndex;

    const result = [...array]; // Work on a copy

    while (i > 0) {
        // Calculate a random index within the remaining range
        randomIndex = Math.floor(getSeededRandom(currentSeed) * i--);
        
        // Swap the current word with the word at the random index
        temp = result[i];
        result[i] = result[randomIndex];
        result[randomIndex] = temp;
        
        // Increment the seed for the next iteration
        currentSeed++;
    }
    return result;
}
