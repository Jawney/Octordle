const fs = require('fs');

// 1. Setup today's date (March 29, 2026)
const epoch = Date.UTC(2022, 0, 24); // Jan 24, 2022
const today = Date.UTC(2026, 2, 29); // Mar 29, 2026
const seed = Math.floor((today - epoch) / (1000 * 60 * 60 * 24));

console.log(`Epoch: Jan 24, 2022`);
console.log(`Today: Mar 29, 2026`);
console.log(`Seed: ${seed}`);

// 2. Load word lists
const classicAnswers = fs.readFileSync('britannica-daily-classic-answers.txt', 'utf8').trim().split('\n').map(s => s.toUpperCase());
const filterFs = new Set(fs.readFileSync('britannica-filter-fs.txt', 'utf8').trim().split('\n').map(s => s.toUpperCase()));
const filterYr = new Set(fs.readFileSync('britannica-filter-yr.txt', 'utf8').trim().split('\n').map(s => s.toUpperCase()));

// 3. Selection Logic Functions
function getSeededRandom(seed) {
    let t = Math.sin(seed) * 10000;
    return t - Math.floor(t);
}

function seededShuffle(array, initialSeed) {
    let currentSeed = initialSeed;
    let i = array.length;
    let temp, randomIndex;
    const result = [...array];
    while (i > 0) {
        randomIndex = Math.floor(getSeededRandom(currentSeed) * i--);
        temp = result[i];
        result[i] = result[randomIndex];
        result[randomIndex] = temp;
        currentSeed++;
    }
    return result;
}

// 4. Execute Classic Daily Selection (startV2 logic)
const e = seed + 98741;
const t = 137;
const shuffleSeed = Math.floor(e / t);
const shuffledList = seededShuffle(classicAnswers, shuffleSeed);

let pickedWords = [];
let currentIndex = (t * e) % shuffledList.length;

// Skip filtered words or duplicates
while (pickedWords.length < 8) {
    const candidate = shuffledList[currentIndex % shuffledList.length];
    currentIndex++;
    
    const isFiltered = filterFs.has(candidate) || filterYr.has(candidate);
    const isDuplicate = pickedWords.includes(candidate);
    
    if (!isFiltered && !isDuplicate) {
        pickedWords.push(candidate);
    }
}

console.log("\n--- Words for Today's Classic Game ---");
pickedWords.forEach((word, i) => console.log(`${i + 1}: ${word}`));
