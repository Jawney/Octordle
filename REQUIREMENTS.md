# Requirements Document: Octordle Personal (iOS/GitHub Pages)

## 1. Project Overview
A self-contained, single-file HTML5 application that implements an "Octordle" (8-word Wordle) game. Optimized for iOS Safari, GitHub Pages hosting, and "Add to Home Screen" usage.

## 2. Core Game Logic
- **Objective:** Simultaneously solve 8 different 5-letter words.
- **Game Modes:**
  - **Daily Mode (Default):** The 8 words are generated using a random seed based on the current date (YYYY-MM-DD).
  - **Practice Mode:** A button that generates 8 completely random words.
- **Guesses:** 13 total guesses (shared across all 8 boards).
- **Dictionary:**
  - **Solutions:** 2,315 common 5-letter words (standard Wordle set).
  - **Allowed Guesses:** ~12,000 valid 5-letter words to prevent "Not in word list" errors.

## 3. iOS & Home Screen Optimization
- **Web App Manifest:** Meta tags for `apple-mobile-web-app-capable` and `apple-mobile-web-app-status-bar-style`.
- **Full Screen:** Hide Safari chrome when launched from the Home Screen.
- **Persistent Keyboard:**
  - Use a hidden input field that stays focused to keep the native iOS keyboard open.
  - "Tap to Type" overlay to re-trigger focus if lost.
  - Disable native auto-correct, auto-capitalize, and spell-check.

## 4. User Interface (UI) & Navigation
- **Single-Board View:** To maximize vertical space, only one board (5x13 grid) is visible at a time.
- **Horizontal Navigation (Swipe):** 
  - Users swipe left/right to move between the 8 boards.
  - Indicator dots or a "Board X of 8" label to show current position.
- **Status Tray (Letter Map):**
  - A persistent footer area sitting directly above the native keyboard.
  - Shows the A-Z alphabet with color-coded status (Green/Yellow/Grey) for the **currently visible board**.
- **Vertical Stack:** 
  1. Header (Mode, Progress).
  2. Active Board (centered).
  3. Navigation Indicators.
  4. Status Tray (Letter Map).
  5. Native Keyboard (Space reserved).

## 5. Technical Requirements
- **Single File:** HTML, CSS, and JS in one `index.html`.
- **Touch Handling:** Implement robust touch events for smooth horizontal swiping between boards.
- **Deterministic Seeding:** PRNG seeded by date for Daily Mode.
- **Offline Support:** Full functionality without an internet connection once loaded.

## 6. Success Criteria
- Native keyboard remains stable and responsive.
- Swipe gesture feels natural and switches boards correctly.
- Status tray accurately reflects the state of the visible board.
- The app fits perfectly on a single iPhone screen without scrolling (besides swiping).
