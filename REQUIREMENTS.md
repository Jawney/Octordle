# Requirements Document: Octordle Personal (iPhone 14/15 Pro Optimized)

## 1. Project Overview
A specialized Octordle clone tailored for a specific iPhone resolution (430x873). The app uses a "Locked Viewport" strategy to ensure 13 rows are visible and playable even with the native keyboard open.

## 2. Core Game Logic
- **Objective:** Solve 8 different 5-letter words in 13 total guesses.
- **Game Modes:** 
  - **Daily Mode:** Date-seeded words with `localStorage` persistence. Progress (guesses) is saved and reloaded automatically.
  - **Practice Mode:** Randomized words for infinite play.
- **Validation:** 
  - Invalid words (not in dictionary) highlight the current row in **RED** and block submission.
- **Global Keymap:** 
  - The alphabet tray status reflects the **global state** across all 8 boards simultaneously. 
  - Priority: Green (Correct) > Yellow (Present) > Grey (Absent).

## 3. Visual Layout (Optimized for 546px Keyboard Viewport)
- **Strict Scroll-Lock:** Vertical scrolling is disabled via CSS (`overflow: hidden`) and JS (`window.scrollTo(0,0)` on viewport change). The header must never be cut off.
- **Header (45px):** Professional top bar with Title, Daily/New buttons, and ample padding for the notch.
- **Navigation (20px):** Indicator dots between boards and the input dock.
- **Status Tray (80px):** Alphabet map sitting flush against the native keyboard.
- **Board Area (Approx. 400px):** 
  - Displays 2 boards per screen (4 screens total).
  - **Rectangular Tiles:** Tiles are optimized for vertical height. Row height is fixed at **25px** to ensure all 13 rows fit comfortably within the viewport.
  - **Board Separation:** Distinct gap and border between the two side-by-side boards.
- **Horizontal Navigation:** Smooth swipe to switch between the 4 pairs of boards.

## 4. iPhone Keyboard Optimization
- **Auto-Focus:** Native keyboard opens automatically on load/new game (300ms delay).
- **Viewport Alignment:** When `visualViewport` shrinks (keyboard open), the app body is resized to match the new height to prevent Safari from "panning" the layout.

## 5. Technical Requirements
- **Persistence:** Use `localStorage` key `octordle_v3_save`.
- **Fetch API:** Load `shuffled_real_wordles.txt` and `official_allowed_guesses.txt`.
- **Single File:** Pure HTML/CSS/JS in `index.html`.
