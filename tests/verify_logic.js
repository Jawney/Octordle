import { seededShuffle } from '../js/utils/random.js';
import fs from 'fs';

const EPOCH_DATE = new Date('2022-01-24T00:00:00Z');

function calculateSeedForDate(date) {
    const dateUTC = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return Math.floor((dateUTC - EPOCH_DATE.getTime()) / (1000 * 60 * 60 * 24));
}

async function verify() {
    const classicText = fs.readFileSync('assets/classic.txt', 'utf8');
    const classicWords = classicText.split(/\s+/).map(w => w.trim().toUpperCase()).filter(w => w.length === 5);

    const today = new Date(); // Sunday March 22, 2026 (per system context)
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const seedToday = calculateSeedForDate(today);
    const seedYesterday = calculateSeedForDate(yesterday);

    console.log(`Seed Yesterday: ${seedYesterday}`);
    console.log(`Seed Today: ${seedToday}`);

    const wordsYesterday = seededShuffle(classicWords, seedYesterday).slice(0, 8);
    const wordsToday = seededShuffle(classicWords, seedToday).slice(0, 8);

    console.log("Words Yesterday:", wordsYesterday.join(', '));
    console.log("Words Today:    ", wordsToday.join(', '));

    const matches = wordsYesterday.filter(w => wordsToday.includes(w));
    if (matches.length > 0) {
        console.log(`\nISSUE FOUND: ${matches.length} words overlap!`);
    } else {
        console.log("\nSUCCESS: All 8 words are different.");
    }
}

verify();
