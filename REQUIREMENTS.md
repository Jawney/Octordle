# Requirements Document: Octordle Personal (iPhone Optimized)

## 1. Project Overview
A highly specialized Octordle clone tailored specifically for a single user's iPhone. The app prioritizes screen real-estate efficiency to display 13 guess rows across 8 boards without scrolling.

## 2. Core Game Logic
- **Objective:** Solve 8 different 5-letter words in 13 total guesses.
- **Game Modes:** 
  - **Daily Mode:** Date-seeded words with `localStorage` persistence.
  - **Practice Mode:** Randomized words for infinite play.
- **Validation:** 
  - Invalid words highlight the current row in **RED** and block submission.
- **Global Keymap:** 
  - The alphabet tray status must reflect the **global state** across all 8 boards simultaneously. 
  - Priority: Green (Correct) > Yellow (Present) > Grey (Absent). If a letter is Green on *any* board, it shows as Green in the tray.

## 3. Visual Layout (Resolution Specific)
- **Zero Scrolling:** Vertical scrolling is strictly disabled.
- **Resolution Debugging:** The app will include a temporary overlay showing `window.visualViewport` dimensions to assist in final hard-coding.
- **Rectangular Tiles:** Tiles are **not** required to be square. They should stretch/squash to fill the available vertical and horizontal space to ensure all 13 rows are visible.
- **Dual-Board View:** 2 boards per screen (4 screens total).
- **Header & Navigation:** 
  - Minimalist header with "DAILY" and "NEW" buttons.
  - Indicators for the 4 screens.
  - Horizontal swipe to navigate.

## 4. iPhone Keyboard Optimization
- **Persistent Focus:** Native keyboard remains open.
- **Tight Fit:** Status Tray sits flush against the top of the native keyboard to maximize the "Game Area" height.

## 5. Success Criteria
- Resolution dimensions are clearly visible for debugging.
- All 13 rows fit on the screen without scrolling.
- Alphabet tray correctly aggregates status from all 8 words.
