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
  - **Solutions:** 2,315 common 5-letter words (loaded from `shuffled_real_wordles.txt`).
  - **Allowed Guesses:** ~12,000 valid 5-letter words (loaded from `official_allowed_guesses.txt`).

## 3. iOS & Home Screen Optimization
- **Web App Manifest:** Meta tags for `apple-mobile-web-app-capable` and `apple-mobile-web-app-status-bar-style`.
- **Full Screen:** Hide Safari chrome when launched from the Home Screen.
- **Visual Viewport Scaling:** 
  - Dynamically resize the entire game area when the native iOS keyboard is visible.
  - Use `window.visualViewport` API to calculate available height and scale tiles to fit without scrolling.

## 4. User Interface (UI) & Navigation
- **Dual-Board View:** Show two boards side-by-side (2x1 grid) on each screen.
- **Horizontal Navigation (Swipe):** 
  - Users swipe left/right to move between the 4 pairs of boards (8 boards total).
  - Indicator dots at the top to show which pair is active (1-2, 3-4, 5-6, 7-8).
- **Status Tray (Letter Map):**
  - A persistent footer area sitting directly above the native keyboard.
  - Shows the A-Z alphabet with color-coded status (Green/Yellow/Grey) for the **currently visible pair of boards**. If a letter has different statuses on the two boards, prioritize Green > Yellow > Grey.
- **Persistent Keyboard:** Keep the native keyboard open by focusing a hidden input field.

## 5. Technical Requirements
- **Multi-File Architecture:** Reference `shuffled_real_wordles.txt` and `official_allowed_guesses.txt` using the `fetch` API.
- **Touch Handling:** Implement robust touch events for smooth horizontal swiping between pairs.
- **Deterministic Seeding:** PRNG seeded by date for Daily Mode.
- **Offline Support:** Use a Service Worker (optional) or simply ensure the page is cached by Safari.

## 6. Success Criteria
- Native keyboard remains stable and responsive.
- Tiles scale down dynamically to ensure all 13 guesses are visible above the keyboard.
- Swipe gesture switches between board pairs naturally.
- Dictionary validation works correctly for all 12,000+ words.
