const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#subt');
const guessSlot = document.querySelector('.guesses');
const guessrem = document.querySelector('.lastResult');
const msg = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

let randomNum = parseInt(Math.random() * 100 + 1);
let numOfGuess = 1;
let prevguess = [];
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    })
}

function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a valid number');
    }
    else {
        prevguess.push(guess);
        if (numOfGuess == 1) {
            startOver.style.display = 'block'; 
        }
        if (numOfGuess >= 10) {
            displayGuess(guess);
            displayMessage(`Game Over! The number was ${randomNum}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess == randomNum) {
        displayMessage(`Congratulations! You have won. The number was actually ${randomNum}.`);
        endGame();
    } else if (guess > randomNum) {
        displayMessage('Your guess is too high');
    } else {
        displayMessage('Your guess is too low');
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerText += ` ${guess}, `;
    numOfGuess++;
    guessrem.innerHTML = `${11 - numOfGuess}`;
}

function displayMessage(message) {
    msg.innerHTML = `<h3>${message}</h3>`;
}

const p = document.createElement('p');

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h3 id = "newGame">New Game</h3>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function initialize() {
    randomNum = parseInt(Math.random() * 100 + 1);
    numOfGuess = 1;
    prevguess = [];
    playGame = true;
    guessSlot.innerHTML = '';
    guessrem.innerHTML = `${11 - numOfGuess}`;
    msg.innerHTML = '';
}

function newGame() {
    const newGmeBtn = document.querySelector('#newGame');
    newGmeBtn.addEventListener('click', function (e) {
        initialize();
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        startOver.style.display = 'none';
    })
}