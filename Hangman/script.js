import listOfWords from './listOfWords.js';

// ===================================
// GAME CONSTANTS
// ===================================
const manParts = document.querySelectorAll('.man');
const wrongLettersDisplay = document.querySelector('.wrong-letters');
const hiddenWordContainer = document.querySelector('.hidden-word');
const popupContainer = document.querySelector('.popup-container');
const restartBtn = document.querySelector('.restart');
const slideUp = document.querySelector('.slideup');
const difficultyBtn = document.querySelector('.difficulty');

let wrongLettersList;
let correctLettersList;
let hiddenWord;
let hiddenLettersDisplay = init();

// ===================================
// GAME LOGIC
// ===================================

// ===================================
// INITIALIZE GAME
// ===================================
function init() {
	// wrong letters
	wrongLettersList = [];
	wrongLettersDisplay.textContent = wrongLettersList.join(', ');

	// slideup
	slideUp.classList.remove('show');
	popupContainer.classList.remove('show');

	// hangman
	manParts.forEach(manPart => {
		manPart.classList.remove('show');
	});

	// correct letters
	correctLettersList = [];

	// random word generate
	let randomNumber = Math.floor(Math.random() * listOfWords.length);
	hiddenWord = listOfWords[randomNumber];

	return hiddenWordBlanks(hiddenWord.length);
}

// ===================================
// RANDOM WORD GENERATOR
// ===================================
function hiddenWordBlanks(number) {
	hiddenWordContainer.innerHTML = '';
	for (let i = 0; i < number; ++i) {
		let letter = document.createElement('li');
		letter.classList.add('hidden-letter');
		hiddenWordContainer.appendChild(letter);
	}

	return difficultyChecker();
}

// ===================================
// DISPLAY VOWELS IF DIFFICULTY IS EASY
// OTHERWISE LEAVE ALL BLANK
// ===================================
function difficultyChecker() {
	let lettersDisplay = document.querySelectorAll('.hidden-word .hidden-letter');

	if (difficultyBtn.classList.contains('easy')) {
		hiddenWord.forEach((letter, index) => {
			if (isVowel(letter)) {
				correctLettersList.push(letter);
				lettersDisplay[index].textContent = letter;
			}
		});
	}

	return lettersDisplay;
}

function isVowel(character) {
	switch (character) {
		case 'a':
		case 'e':
		case 'i':
		case 'o':
		case 'u':
			return true;
	}
	return false;
}

// ===================================
// TOGGLE DIFFICULTY BETWEEN EASY AND HARD
// ===================================
function toggleDifficulty() {
	difficultyBtn.classList.toggle('easy');
	difficultyBtn.classList.toggle('hard');

	hiddenLettersDisplay = difficultyChecker();
}

// ===================================
// DUPLICATE INPUT HANDLER
// ===================================
function duplicateInput(character) {
	if (slideUp.classList.contains('show')) return;

	let notification = '';
	if (difficultyBtn.classList.contains('easy') && isVowel(character)) {
		notification = 'All vowels have already been entered!';
	} else {
		notification = 'You have already entered this letter!';
	}

	slideUp.querySelector('.notification').textContent = notification;
	slideUp.classList.add('show');

	setTimeout(() => slideUp.classList.remove('show'), 1500);
}

// ===================================
// CORRECT INPUT HANDLER
// ===================================
function correctInput(character) {
	hiddenWord.forEach((letter, index) => {
		if (letter === character) {
			hiddenLettersDisplay[index].textContent = letter;
			correctLettersList.push(letter);
		}
	});
}

// ===================================
// WRONG INPUT HANDLER
// ===================================
function wrongInput(character) {
	manParts[wrongLettersList.length].classList.add('show');

	wrongLettersList.push(character);
	wrongLettersDisplay.textContent = wrongLettersList.join(', ');
}

// ===================================
// INPUT HANDLER
// ===================================
function userInputHandler(event) {
	let keyCode = event.keyCode;
	let character = String.fromCharCode(keyCode).toLowerCase();
	let indexOfChar = hiddenWord.indexOf(character);

	if (keyCode >= 65 && keyCode <= 90) {
		if (
			correctLettersList.includes(character) ||
			wrongLettersList.includes(character) ||
			isVowel(character)
		) {
			duplicateInput(character);
		} else if (indexOfChar !== -1) {
			correctInput(character);
		} else {
			wrongInput(character);
		}

		checkGameEnd();
	} else if (popupContainer.classList.contains('show') && keyCode === 13) {
		hiddenLettersDisplay = init();
	}
}

// ===================================
// CHECK GAME END
// ===================================
function checkGameEnd() {
	let msg = popupContainer.querySelector('.msg');

	if (wrongLettersList.length >= manParts.length) {
		msg.textContent = `Unfortunately, you've lost!! 😞 The word was ${hiddenWord}`;
		setTimeout(() => popupContainer.classList.add('show'), 500);
	} else if (correctLettersList.length >= hiddenWord.length) {
		msg.textContent = 'YaY!! You beat the game!! 😃';
		setTimeout(() => popupContainer.classList.add('show'), 500);
	}
}

// ===================================
// STRING FOREACH FUNCTION
// ===================================
String.prototype.forEach = function (callback) {
	for (let index = 0; index < this.length; ++index) {
		callback(this.charAt(index), index, this);
	}
};

// ===================================
// EVENT LISTENERES
// ===================================
window.addEventListener('keyup', userInputHandler);
restartBtn.addEventListener('click', () => {
	hiddenLettersDisplay = init();
});
difficultyBtn.addEventListener('click', toggleDifficulty);
