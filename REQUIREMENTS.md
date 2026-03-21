# Requirements Document: Octordle Personal (iOS/Dropbox Edition)

## 1. Project Overview
A self-contained, single-file HTML5 application that implements an "Octordle" (8-word Wordle) game. The app is optimized for iOS Safari and designed to be hosted on Dropbox and saved to the iPhone Home Screen.

## 2. Core Game Logic
- **Objective:** Simultaneously solve 8 different 5-letter words.
- **Game Modes:**
  - **Daily Mode (Default):** The 8 words are generated using a random seed based on the current date (YYYY-MM-DD). This ensures the same game for all players on a given day.
  - **Practice Mode (New Game):** A button that generates 8 completely random words using a true random number generator.
- **Guesses:** The player has a total of 13 guesses.
- **Feedback:** Standard Wordle color rules apply per board:
  - **Green:** Correct letter, correct position.
  - **Yellow:** Correct letter, wrong position.
  - **Grey:** Letter not in the word.
- **Win Condition:** All 8 words are solved within 13 guesses.
- **Loss Condition:** 13 guesses are used and at least one word remains unsolved.

## 3. iOS & Home Screen Optimization
- **Web App Manifest:** Include meta tags for `apple-mobile-web-app-capable` and `apple-mobile-web-app-status-bar-style`.
- **App Icon:** High-resolution SVG icon (a stylized "8") embedded in the HTML.
- **Full Screen:** Ensure the UI hides Safari chrome when launched from the Home Screen.
- **Native Keyboard Integration:** 
  - Use a "Hidden Input" strategy to trigger the native iOS keyboard.
  - Provide a "Tap to Type" overlay or auto-focus mechanism.
  - Disable native auto-correct, auto-capitalize, and spell-check to prevent interference with game logic.

## 4. User Interface (UI) & Experience (UX)
- **Layout:** 
  - A responsive 2-column grid showing all 8 boards (4 rows of 2).
  - Dark Mode by default (to match the system aesthetic).
- **Auto-Scrolling:** The app should automatically scroll to the first unsolved board after each guess.
- **Status Tray:** A persistent footer area that sits above the native keyboard, showing the alphabet and color-coded status (Green/Yellow/Grey) for the currently active board.
- **Animations:** Subtle transitions for tile flipping and board state changes.

## 5. Technical Requirements
- **Single File:** Everything (HTML, CSS, JS, Assets) must reside in a single `index.html` file for easy Dropbox syncing.
- **Deterministic Seeding:** Use a simple PRNG (Pseudo-Random Number Generator) seeded by the date for Daily Mode.
- **Word List:** Include the standard "Wordle" dictionary of ~2,300 common 5-letter words.
- **Offline Support:** Once loaded, the game should be playable without an internet connection.

## 6. Success Criteria
- The app renders correctly in iOS Safari.
- The "Add to Home Screen" icon and name appear correctly.
- The native keyboard functions reliably without "dropped" key presses.
- The game accurately tracks 8 independent word states simultaneously.
