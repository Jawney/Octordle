# Requirements Document: Octordle Personal (iPhone 14/15 Pro Optimized)

## 1. Project Overview
A highly specialized Octordle clone tailored specifically for a single user's iPhone (Resolution: 430x873). The app uses hard-coded pixel dimensions to ensure all 13 guess rows fit perfectly on the screen without scrolling, especially when the native keyboard is open.

## 2. Core Game Logic
- **Objective:** Solve 8 different 5-letter words in 13 total guesses.
- **Game Modes:** 
  - **Daily Mode:** Date-seeded words with `localStorage` persistence.
  - **Practice Mode:** Randomized words for infinite play.
- **Validation:** 
  - Invalid words highlight the current row in **RED** and block submission.
- **Global Keymap:** 
  - The alphabet tray status reflects the **global state** across all 8 boards simultaneously. 
  - Priority: Green (Correct) > Yellow (Present) > Grey (Absent).

## 3. Visual Layout (Hard-Coded for 430x546 Viewport)
- **Zero Scrolling:** Vertical scrolling is strictly disabled.
- **Header (50px):** Minimalist top bar.
- **Navigation (20px):** Indicator dots between boards and tray.
- **Status Tray (80px):** Alphabet map sitting flush against the native keyboard.
- **Board Area (396px):** 
  - Displays 2 boards per screen (4 screens total).
  - Each board fits 13 rows into the available height.
  - **Row Height:** Exactly **28px** (including gaps) to ensure 13 rows = 364px + padding.
  - **Rectangular Tiles:** Tiles are sized to fill the 28px row height. Square aspect ratio is NOT required.
- **Horizontal Navigation:** Smooth swipe to switch between the 4 pairs of boards.

## 4. iPhone Keyboard Optimization
- **Viewport Locking:** When the keyboard is open (`visualViewport.height` ≈ 546px), the app UI must not shift or obscure the grid.
- **Auto-Focus:** Native keyboard opens automatically on load/new game.

## 5. Success Criteria
- All 13 rows are fully visible and playable when the keyboard is open.
- The UI is stable and does not "bounce" or scroll.
- Alphabet tray correctly aggregates status from all 8 words.
