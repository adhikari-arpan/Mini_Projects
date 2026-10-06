# 🔢 Number Guessing Game

Guess a random number between 1 and 100 in 10 tries or fewer.

**Tech:** HTML · CSS · JavaScript (no libraries)

## Features
- The game picks a new random number each round
- "Too high" / "Too low" hint after every guess
- Shows your previous guesses and how many tries are left
- Rejects input that isn't a number from 1 to 100
- **New Game** button to restart without reloading the page

## Concepts Practised
- Keeping game state in variables (attempts, guess history, game over)
- Creating and removing DOM elements
- Splitting the logic into small functions (`validateGuess`, `checkGuess`, `endGame`, `newGame`)

## Run Locally
No build step. Open `index.html` in any browser.

## Files
```
Number_Guesser/
├── index.html
├── style.css
└── script.js
```
