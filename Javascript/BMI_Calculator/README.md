# ⚖️ BMI Calculator

Enter your height and weight to get your Body Mass Index and its health category.

**Tech:** HTML · CSS · JavaScript (no libraries)

## Features
- Takes height in **cm** and weight in **kg**
- Calculates BMI to two decimal places
- Shows the category: Underweight, Normal, Overweight or Obesity
- Shows an error message for empty or negative input
- Reference table of BMI ranges below the form

## Concepts Practised
- Handling form `submit` events and calling `preventDefault()`
- Parsing and validating numbers (`parseFloat`, `isNaN`)
- Conditional logic and template literals for output

## How It Works
```
BMI = weight(kg) / (height(m))²
```
The height is entered in centimetres, so the script divides it by 100 before squaring.

## Run Locally
No build step. Open `index.html` in any browser.

## Files
```
BMI_Calculator/
├── index.html
├── styles.css
└── script.js
```
