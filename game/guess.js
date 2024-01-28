const frontPage = document.querySelector('.frontPage');
const gamePage = document.querySelector('.gamePage');
const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('errorSound');
const retryBtn = document.getElementById('retryBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

document.getElementById('startGameBtn').onclick = function () {
  let userName = document.getElementById('userName').value;
  userName = userName.toUpperCase();

  if (userName.trim() === '') {
    alert('Please enter your name.');
  } else {
    // Hide frontPage and show gamePage with a fade-in animation
    frontPage.style.animation = 'fadeOut 0.5s forwards';
    setTimeout(() => {
      frontPage.style.display = 'none';
      gamePage.style.display = 'block';
      gamePage.style.animation = 'fadeIn 0.5s forwards';

      // Add a welcome message with the user's name
      document.getElementById('display').textContent = `Welcome to Number Guessing Game, ${userName}! Let's start the game.`;
    }, 500);
  }
};

const MinNum = 1;
const MaxNum = 100;
let Answer = generateRandomNumber();

let attempt = 0;

document.getElementById('guessBtn').onclick = function () {
  const guess = Number(document.getElementById('show').value);
  let userName = document.getElementById('userName').value;
  userName = userName.toUpperCase();

  if (isNaN(guess) || guess < MinNum || guess > MaxNum) {
    document.getElementById('display').textContent ='Please enter a valid number between 1 and 100.';
    errorSound.play();

  } else {
    attempt++;

    if (attempt === 10) {
      endGame(userName);
    } else {
      if (guess > Answer) {
        showFeedback(`Too high, ${userName}! Don't give up, try again.`);
        incorrectSound.play();
      } else if (guess < Answer) {
        showFeedback(`Too low, ${userName}! Don't give up, try again.`);
        incorrectSound.play();
      } else {
        showFeedback(`Correct! Well done, ${userName}! The answer is ${Answer}. You took ${attempt} attempts.`);
        correctSound.play();
        hideInputAndButton();
        showPlayAgainButton();
      }
    }
  }

  // Clear the input field after each guess
  document.getElementById('show').value = '';
};

function endGame(userName) {
  showFeedback(`Game Over, ${userName}! You have reached the maximum attempts. Try again.`);
  hideInputAndButton();
  showRetryButton();
}

function showFeedback(message) {
  document.getElementById('display').textContent = message;
}

function hideInputAndButton() {
  document.getElementById('show').style.display = 'none';
  document.getElementById('guessBtn').style.display = 'none';
}

function showRetryButton() {
  retryBtn.style.display = 'block';
}

function showPlayAgainButton() {
  playAgainBtn.style.display = 'block';
}

retryBtn.onclick = resetGame;
playAgainBtn.onclick = resetGame;

function resetGame() {
  // Reset game variables and UI elements
  attempt = 0;
  Answer = generateRandomNumber();

  document.getElementById('show').style.display = 'block';
  document.getElementById('guessBtn').style.display = 'block';
  retryBtn.style.display = 'none';
  playAgainBtn.style.display = 'none';

  // Reset display with a fade-in animation
  gamePage.style.animation = 'fadeOut 0.5s forwards';
  setTimeout(() => {
    gamePage.style.display = 'none';
    frontPage.style.display = 'block';
    frontPage.style.animation = 'fadeIn 0.5s forwards';

    // Clear input field on retry
    document.getElementById('show').value = '';
  }, 500);
}

function generateRandomNumber() {
  return Math.floor(Math.random() * (MaxNum - MinNum + 1)) + MinNum;
}
