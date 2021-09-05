import { randomWord } from './words.js';

const settings = document.querySelector('.settings');
const settingsBtn = document.getElementById('settings-btn');
const difficultySelector = document.getElementById('difficulty');

const wordDisplay = document.querySelector('.word');
const inputText = document.getElementById('text');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');

let timeLeft = 10;
let score = 0;
let difficulty = 'easy';
let intervalID = null;
let intervalTime = 1000;

(function init() {
	timeLeft = 10;
	timeDisplay.textContent = timeLeft + 's';

	score = 0;

	updateDOM();

	intervalTime = 1000;
	intervalID = setInterval(timeController, intervalTime);
})();

function timeController() {
	timeLeft -= 1;
	timeDisplay.textContent = timeLeft + 's';

	if (timeLeft === 0) gameOver('Time ran out!!');
}

function gameOver(msg) {
	clearInterval(intervalID);

	const endgameDisplay = document.querySelector('.endgame');
	const endgameTitle = document.querySelector('.endgame h2');
	const endgameScoreDisplay = endgameDisplay.querySelector('.score');

	endgameTitle.textContent = msg;
	endgameScoreDisplay.textContent = score;
	endgameDisplay.classList.add('show');
}

function newWordDisplay() {
	const newWord = randomWord();
	if (newWord == null) return gameOver('Congrats, You beat the game!!');

	wordDisplay.textContent = newWord;
}

function getDifficulty() {
	const localStorage = window.localStorage;
	const difficulty = localStorage.getItem('difficulty');
	return difficulty === null ? 'easy' : difficulty;
}

function updateDOM() {
	scoreDisplay.textContent = score;

	difficulty = getDifficulty();
	difficultySelector.value = difficulty;

	inputText.value = '';
	inputText.focus();
	newWordDisplay();
}

function inputHandler() {
	if (inputText.value === wordDisplay.textContent) {
		score++;
		switch (difficulty) {
			case 'easy':
				timeLeft += 4;
				break;
			case 'normal':
				timeLeft += 2;
				break;
			case 'hard':
				timeLeft += 1;
				break;
		}
		updateDOM();
	}
}

function diffcultyChangeHandler() {
	difficulty = this.value;

	const localStorage = window.localStorage;
	localStorage.setItem('difficulty', difficulty);

	updateDOM();
}

inputText.addEventListener('input', inputHandler);
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
difficultySelector.addEventListener('change', diffcultyChangeHandler);
