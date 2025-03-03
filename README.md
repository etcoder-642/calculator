# Calculator Project

A project for The Odin Project curriculum.

## Overview
This project is a simple calculator that evaluates expressions step by step as the user inputs values, rather than following traditional BODMAS rules. Instead of waiting for a complete mathematical expression, the calculator immediately updates the result after each operator is pressed.

## Core Functionality
The project relies on three main variables to store user inputs and five important flags to track user interactions and calculation states.

### Variables:
- `liveVar`: Holds the current active number or result of calculations.
- `secVar`: Temporarily stores the second number in an operation.
- `oprVar`: Stores the selected operator (+, -, *, /, etc.).

### Flags (Boolean values used to track program states):
- `isOprClicked`: Tracks whether an operator has been pressed. This is crucial because when `isOprClicked` is `true`, any new number input should be stored in `secVar` instead of `liveVar`. It also ensures calculations happen only when an operator is followed by a second number.
- `checkerForLive`: Ensures numbers are displayed correctly when entered. When `checkerForLive` is `true`, the next number input completely replaces the current value on the display instead of appending to it. This prevents unwanted number concatenation and ensures a clean UI experience. It is reset to `false` after the number is entered.
- `checkerForEqualsInPer`: Ensures that percentage operations apply correctly. Without this, percentages might be calculated incorrectly when used after the equals button.
- `checkerForFlag`: Prevents unintended duplicate calculations when switching operators after pressing `=`. Without it, switching operators could cause the last operation to repeat unintentionally.
- `checkerForDelete`: Determines whether a delete action should remove digits from `liveVar` or `secVar`, preventing unwanted changes to stored values.

## Calculation Scenarios
### Scenario 1: Basic Calculation (Ideal Flow)
Example: `2 + 4 =`
1. User inputs `2`, which is stored in `liveVar`.
2. User presses `+`. This:
   - Stores `+` in `oprVar`.
   - Sets `isOprClicked` to `true`, indicating that the next number should be stored in `secVar`.
   - Sets `checkerForLive` to `true`, ensuring that the next number input replaces the existing value on the display.
3. User inputs `4`, which is now stored in `secVar` (since `isOprClicked` is `true`).
4. User presses `=`. This triggers the calculation:
   - `2 + 4 = 6`
   - The result (`6`) is stored in `liveVar`.
   - `secVar` is cleared for future calculations.
   - `checkerForLive` is set to `true`, so if the user enters a new number, it replaces `6` instead of appending to it.
5. The calculator is now ready for the next input.

### Scenario 2: Continuous Calculation (Chained Operations)
Example: `12 * 4 - 81`
1. User inputs `12`, stored in `liveVar`.
2. User presses `*`, which:
   - Stores `*` in `oprVar`.
   - Sets `isOprClicked` to `true`.
   - Sets `checkerForLive` to `true` to ensure the next number replaces the current display.
3. User inputs `4`, stored in `secVar`.
4. User presses `-`, triggering the multiplication:
   - `12 * 4 = 48`
   - The result (`48`) is stored in `liveVar`.
   - `secVar` is cleared.
   - `oprVar` is updated to `-`, preparing for the next operation.
   - `checkerForLive` is set to `true`.
5. User inputs `81`, which is stored in `secVar`.
6. Further calculations follow the same pattern.

## Special Cases and Edge Handling
### Handling Operator Switching (`checkerForFlag`)
When a user presses `=`, then changes the operator, `checkerForFlag` prevents unnecessary recalculations.
Example: `2 + 5 = - 4`
- Without `checkerForFlag`, `4` might be subtracted twice, leading to incorrect results.

### Ensuring Correct Percentage Calculations (`checkerForEqualsInPer`)
If the user presses `%` after an operation, it ensures the percentage is calculated relative to the total.
Example: `5 + 5 %`
- Instead of treating `5%` as `0.05`, the program correctly calculates `10%` of `10`, resulting in `1.0`.

### Managing Deletion (`checkerForDelete`)
If the user deletes a number, the program needs to know whether to modify `liveVar` or `secVar`.
- If `isOprClicked` is `true`, deletion should affect `secVar`.
- If `isOprClicked` is `false`, deletion modifies `liveVar`.

## Conclusion
This project showcases an interactive approach to real-time calculations by prioritizing user input flow. The flag system ensures calculations behave predictably, providing a seamless experience for users. Through careful state management, the calculator allows for continuous operations, correct handling of percentages, and intuitive input correction.

---
Let me know if anything needs further clarification!

