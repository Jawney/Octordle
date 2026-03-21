# Requirements Document: Octordle Personal (iPhone 14/15 Pro Optimized)

## 1. Project Overview
A specialized Octordle clone tailored for the iPhone 14/15 Pro (430x873 resolution). The app maximizes legibility and screen usage, ensuring 13 rows and the keymap fit perfectly above the iOS keyboard accessory bar.

## 2. Core Game Logic
- **Objective:** Solve 8 different 5-letter words in 13 total guesses.
- **Dictionary (Critical):** 
  - Load solutions from `shuffled_real_wordles.txt`.
  - Load extra guesses from `official_allowed_guesses.txt`.
  - **MERGE** both lists into a master validation set to ensure all valid 5-letter words are accepted.
- **Game Modes:** 
  - **Daily Mode:** Date-seeded words with `localStorage` persistence.
  - **Practice Mode:** Randomized words for infinite play.
- **Global Keymap:** The tray reflects the global state (Green > Yellow > Grey) across all 8 boards.

## 3. Visual Layout (Maximum Legibility)
- **High Contrast:** 
  - Vibrant Green (`#538d4e`), Yellow (`#b59f3b`), and Dark Grey (`#3a3a3c`).
  - Large, bold black text on colored tiles for maximum readability.
- **Zero Space Waste:** 
  - The grid should expand to fill the gap between the header and the keymap.
  - **Row Height:** Increased to **26px-28px** to use all vertical space.
- **Safe Area Management:** 
  - Top margin of **47px** to clear the Dynamic Island.
  - Bottom dock height of **110px** to sit comfortably **above** the iOS Accessory Bar (arrows/checkmark).
- **Dual-Board View:** 2 boards per screen, clear separation.

## 4. iPhone Keyboard Optimization
- **Auto-Focus:** Native keyboard opens automatically on load.
- **Fixed Position:** The entire app height is locked to `visualViewport.height` to prevent panning or scrolling.

## 5. Success Criteria
- "CIGAR" and other common words are accepted correctly.
- All 13 rows are tall, clear, and visible.
- The keymap is fully visible above the keyboard's black accessory bar.
- Header is clearly below the iPhone status icons.
