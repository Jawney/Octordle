import { getFeedback } from '../js/engine/game-logic.js';
import { StateManager } from '../js/engine/state-manager.js';

function assert(condition, message) {
    if (!condition) {
        throw new Error(`ASSERTION FAILED: ${message}`);
    }
    console.log(`PASS: ${message}`);
}

// Test Feedback Logic
console.log("--- Testing Feedback Logic ---");
assert(JSON.stringify(getFeedback("ABCDE", "ABCDE")) === JSON.stringify(['correct', 'correct', 'correct', 'correct', 'correct']), "Exact match is all correct");
assert(JSON.stringify(getFeedback("EDCBA", "ABCDE")) === JSON.stringify(['present', 'present', 'correct', 'present', 'present']), "Reversed match is correct/present");
assert(JSON.stringify(getFeedback("XXXXX", "ABCDE")) === JSON.stringify(['absent', 'absent', 'absent', 'absent', 'absent']), "No match is all absent");
assert(JSON.stringify(getFeedback("AABBB", "AACCC")) === JSON.stringify(['correct', 'correct', 'absent', 'absent', 'absent']), "Partial match handles duplicates");

// Test State Manager
console.log("\n--- Testing State Manager ---");
const state = new StateManager();
state.reset(12345, true);
assert(state.isDaily === true, "Daily mode set correctly");
assert(state.dailySeed === 12345, "Seed set correctly");
assert(state.boardStates.length === 8, "8 boards initialized");
assert(state.globalGuessCount === 0, "Initial guess count is 0");

console.log("\nALL CORE ENGINE TESTS PASSED!");
