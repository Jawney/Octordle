# Requirements Document: Octordle Personal (iOS/GitHub Pages)

## 1. Project Overview
A refined, single-file HTML5 application that implements an "Octordle" (8-word Wordle) game. Specifically engineered for the iPhone's vertical aspect ratio and native keyboard behavior.

## 2. Core Game Logic
- **Objective:** Simultaneously solve 8 different 5-letter words in 13 total guesses.
- **Game Modes:**
  - **Daily Mode:** The 8 words are deterministic based on the current date. Progress (guesses made) is saved to `localStorage` so the game can be resumed throughout the day.
  - **Practice Mode:** A "NEW" button generates 8 completely random words for infinite play. Practice progress is not persisted.
- **Dictionary:**
  - **Solutions:** 2,315 common 5-letter words (from `shuffled_real_wordles.txt`).
  - **Allowed Guesses:** ~12,000 valid 5-letter words (from `official_allowed_guesses.txt`).

## 3. Visual Layout & Responsive Design
- **Zero Scrolling:** The application must fit perfectly within the visible viewport at all times. Vertical scrolling is disabled.
- **Header:** A dedicated top section with ample padding for the "DAILY OCTORDLE" title, game mode indicators (e.g., "1-2/8"), and action buttons ("NEW" and "DAILY").
- **Dual-Board View:** Two boards are displayed side-by-side on each screen.
  - **Board Separation:** Distinct visual gap and subtle border/outline between the two active boards.
  - **Square Tiles:** Tiles must maintain a 1:1 aspect ratio regardless of scaling.
- **Adaptive Scaling:** The entire game grid (13 rows) must dynamically resize its height to remain fully visible when the iOS keyboard is toggled. No part of the grid should be obscured by the keyboard or UI chrome.

## 4. iOS & Keyboard Optimization
- **Persistent Native Keyboard:** A hidden input field remains focused to keep the native keyboard open during play.
- **Status Tray (Letter Map):**
  - A compact alphabet map sitting directly above the native keyboard.
  - **Tight Alignment:** The tray must be positioned to eliminate "dead space" between the alphabet and the top of the native keyboard.
  - **Dynamic Context:** Shows color-coded letter status for the currently visible pair of boards.
- **Navigation:** Horizontal swipe gestures to switch between the 4 pairs of boards (8 words total).

## 5. Technical Implementation
- **Data Persistence:** Use `localStorage` to store the daily seed and current guess history.
- **Visual Viewport API:** Leverage `window.visualViewport` to accurately calculate the available screen height in real-time.
- **Multi-File Fetch:** Use the `fetch` API for external word lists.
- **Single index.html:** All logic, styling, and framework in one file.

## 6. Success Criteria
- All 13 guess rows are visible on an iPhone screen simultaneously.
- Swiping is smooth and correctly updates the letter map status.
- Daily progress remains intact after closing and reopening the browser.
- The UI feels "airy" and professional, avoiding the cramped or stretched appearance of earlier versions.
