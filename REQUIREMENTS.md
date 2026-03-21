# Requirements Document: Octordle Personal (iPhone 14/15 Pro Optimized)

## 1. Project Overview
A specialized Octordle clone tailored for the iPhone 14/15 Pro (430x873 resolution). The app uses a "Full Visibility" strategy to ensure all UI elements (Header, 13-row Grid, Keymap) are visible even when the iOS "Form Accessory Bar" (Up/Down/Done) is present above the keyboard.

## 2. Core Game Logic
- **Objective:** Solve 8 different 5-letter words in 13 total guesses.
- **Game Modes:** 
  - **Daily Mode:** Date-seeded words with `localStorage` persistence.
  - **Practice Mode:** Randomized words for infinite play.
- **Global Keymap:** The alphabet tray status reflects the **global state** across all 8 boards simultaneously (Green > Yellow > Grey).

## 3. Visual Layout (Constraint-Based for 430x500 Viewport)
- **Safe Area Management:** 
  - The Header must have a 44px top margin to sit below the Dynamic Island and status icons.
  - The Dock must account for the iOS "Form Accessory Bar" (the black bar with arrows/checkmark) which consumes ~44px of the visual viewport above the keyboard.
- **Zero Scrolling:** Vertical scrolling is strictly disabled. The page is locked at `(0,0)`.
- **Component Heights (Hard-Coded):**
  - **Top Margin (Safety):** 44px.
  - **Header:** 40px.
  - **Board Area:** ~310px.
  - **Nav Dots:** 15px.
  - **Keymap Tray:** 75px.
  - **Accessory Bar Buffer:** 10px of extra padding at the bottom of the tray.
- **Board Grid:** 
  - Displays 2 boards per screen (4 screens total).
  - **Row Height:** Reduced to **22px** to ensure all 13 rows fit within the compressed ~310px board area.
  - **Rectangular Tiles:** Tiles fill the 22px row height. 1:1 aspect ratio is not required.

## 4. iPhone Keyboard Optimization
- **Auto-Focus:** Native keyboard opens automatically on load/new game.
- **Accessory Bar Handling:** The UI must be compact enough that the keymap sits *above* the accessory bar, not behind it.

## 5. Technical Requirements
- **Persistence:** Use `localStorage` key `octordle_v4_final`.
- **Fetch API:** Load `shuffled_real_wordles.txt` and `official_allowed_guesses.txt`.
- **Single File:** Pure HTML/CSS/JS in `index.html`.
