# Requirements Document: Octordle Personal (iOS/GitHub Pages)

## 1. Project Overview
A refined, single-file HTML5 application that implements an "Octordle" (8-word Wordle) game. Specifically engineered for the iPhone's vertical aspect ratio and native keyboard behavior.

## 2. Core Game Logic
- **Objective:** Simultaneously solve 8 different 5-letter words in 13 total guesses.
- **Game Modes:**
  - **Daily Mode:** The 8 words are deterministic based on the current date. Progress (guesses made) is saved to `localStorage`.
  - **Practice Mode:** A "NEW" button generates 8 completely random words.
- **Validation:** 
  - If an entered word is not in the dictionary, the row should briefly flash or be highlighted in **RED** to indicate an invalid entry.

## 3. Visual Layout & Scaling (Critical)
- **Zero Scrolling:** The application must fit perfectly within the visible viewport at all times. Vertical scrolling is strictly disabled.
- **Aspect Ratio Locking:** All board tiles MUST maintain a perfect 1:1 square aspect ratio.
- **Active Board Scaling:**
  - When the native iOS keyboard is visible, the entire game grid (all 13 rows) must automatically scale down in size so that the top of the board is below the header and the bottom of the board is above the Status Tray.
  - The board container (grey shaded area) must encompass the tiles perfectly without overflow.
- **Board Separation:** Distinct 15px-20px gap and subtle border/outline between the two active boards on a single screen.

## 4. iOS & Keyboard Optimization
- **Auto-Focus:** The native keyboard should attempt to open automatically upon page load or when starting a new game.
- **Status Tray (Letter Map):**
  - A compact alphabet map sitting directly above the native keyboard.
  - No "dead space" between the tray and the native keyboard.
- **Navigation:** Horizontal swipe gestures to switch between the 4 pairs of boards.

## 5. Technical Implementation
- **Visual Viewport API:** Use `window.visualViewport` to dynamically calculate `availableHeight` and set tile sizes in pixels to ensure a perfect fit.
- **localStorage:** Persist daily game state.
- **Fetch API:** Load external word lists.

## 6. Success Criteria
- All 13 rows of the dual-board view are fully visible simultaneously on an iPhone, both with and without the keyboard open.
- Tiles never overflow their containers or overlap other boards.
- Invalid words are clearly indicated with a red highlight.
