# Octordle Selection Logic (Accurate Documentation)

This document describes how Octordle (Classic, Extreme, and Chill modes) determines its daily words, based on the `index.f6d64be9.js` source code.

## 1. Daily Reference (The Seed)
Octordle uses a fixed "epoch" date: **January 24, 2022**.
For any given day, the "seed" is the integer number of full days that have elapsed since this date.

- **Epoch:** `2022-01-24` (UTC)
- **Seed Calculation:** `floor((CurrentDateUTC - EpochDateUTC) / (1000 * 60 * 60 * 24))`

## 2. Deterministic Randomness (The PRNG)
The game uses a deterministic pseudo-random number generator based on the sine of a seed:

```javascript
function getSeededRandom(seed) {
    let t = Math.sin(seed) * 10000;
    return t - Math.floor(t);
}
```

## 3. Shuffling the Word List
To select the 8 daily words, the entire word list (`Xo`, `da`, or `ca`) is shuffled using a **shuffle seed**. 
The shuffle is a standard Fisher-Yates, but the seed is incremented by 1 during **every iteration** of the shuffle loop.

```javascript
function seededShuffle(array, initialSeed) {
    let currentSeed = initialSeed;
    let i = array.length;
    let temp, randomIndex;
    while (i > 0) {
        randomIndex = Math.floor(getSeededRandom(currentSeed) * i--);
        temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
        currentSeed++;
    }
    return array;
}
```

## 4. Daily Word Selection Mechanism
For modern games (seeds >= 178), the game does NOT simply pick the first 8 words. Instead, it follows this process:

### A. Determine the Shuffle Seed and Offset
For Classic Daily, the game uses:
- **`shuffleSeed`**: `floor((seed + 98741) / 137)`
- **`startIndex`**: `(137 * (seed + 98741)) % wordListLength`

### B. Shuffle and Pick
The entire word list is shuffled using `shuffleSeed`. Then, the game attempts to pick 8 **consecutive** words starting from `startIndex`.

### C. Validation and Filtering
The game uses a `do...while` loop to ensure that:
1. All 8 words are unique (size of the Set is 8).
2. None of the 8 words are present in the **filter lists**.

The game checks two filter lists:
- **`britannica-filter-fs.txt`**: General exclusion list (e.g., `CIGAR`, `TRUMP`, `DEATH`).
- **`britannica-filter-yr.txt`**: Stricter exclusion list (e.g., `KINKY`, `VOMIT`, `NOOSE`).

If a candidate word from the shuffled list matches **any** word in either filter file, it is discarded, and the game proceeds to the next index in the shuffled array.

```javascript
// Example of the selection logic for Classic Daily (Xo)
let wordList = [...Xo]; 
let shuffleSeed = Math.floor((seed + 98741) / 137);
let a = seededShuffle(wordList, shuffleSeed);
let i = [], l = (137 * (seed + 98741)) % a.length;

const fsFilter = loadFilter("britannica-filter-fs.txt");
const yrFilter = loadFilter("britannica-filter-yr.txt");

do {
    i = [
        a[l++ % a.length], a[l++ % a.length], a[l++ % a.length], a[l++ % a.length],
        a[l++ % a.length], a[l++ % a.length], a[l++ % a.length], a[l++ % a.length]
    ];
} while (new Set(i).size != 8 || i.filter(word => fsFilter.has(word) || yrFilter.has(word)).length != 0);
```

## 5. Mode-Specific Lists
- **Classic Daily:** Uses `britannica-daily-classic-answers.txt` (the standard Wordle answer list `Xo` of 2,315 words).
- **Extreme Daily:** Uses `britannica-daily-extreme-answers.txt` (the `da` list of 1,933 words).
- **Daily Chill:** Uses `britannica-daily-chill-answers.txt` (the `ca` list of 970 words).
- **Allowed Guesses:** Any word in `britannica-dictionary.txt` (the combination of `ha` and `Xo`).
