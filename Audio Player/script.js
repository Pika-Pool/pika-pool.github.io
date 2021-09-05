const container = document.querySelector('.container');

const record = document.querySelector('.record-container');
const audioTitleDisplay = document.querySelector('.audio-title');
const audioElement = document.getElementById('audio-element');

const playBtn = document.getElementById('play-btn');
const nextSongBtn = document.getElementById('next-btn');
const prevSongBtn = document.getElementById('prev-btn');

const volumeBtn = document.getElementById('volume-btn');
const volumeRange = document.getElementById('volume-range');

const progressBar = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

let isMute = false;

const listOfSongs = [
	{
		name: 'Cool - Jonas Brothers',
		source: './audios/Jonas Brothers Cool.m4a',
		display: './images/cool-jonas-brothers.png',
	},
	{
		name: 'Withuot Me - Halsey',
		source: './audios/Halsey  Without Me (Lyrics).mp3',
		display: './images/without-me-halsey.jpg',
	},
	{
		name: 'Despacito - Luis Fonsi',
		source: './audios/Luis Fonsi  Despacito ft. Daddy Yankee.mp3',
		display: './images/despacito-luis-fonsi.png',
	},
];
let currentSong = {
	name: listOfSongs[0].name,
	source: listOfSongs[0].source,
	display: listOfSongs[0].display,

	get songIndex() {
		return listOfSongs.indexOf(
			listOfSongs.find(item => item.name === this.name)
		);
	},

	set songIndex(index) {
		this.name = listOfSongs[index].name;
		this.source = listOfSongs[index].source;
		this.display = listOfSongs[index].display;

		audioTitleDisplay.textContent = this.name;
		audioElement.src = this.source;
		record.style.backgroundImage = `url(${this.display})`;
	},
};
currentSong.songIndex = 0;

// Web Audio API
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const track = audioContext.createMediaElementSource(audioElement);
const gainNode = audioContext.createGain();
track.connect(gainNode).connect(audioContext.destination);

// play song
function playSong() {
	if (audioContext.state === 'suspended') {
		audioContext.resume();
	}

	console.log(currentSong.name);

	const icon = playBtn.querySelector('i');
	icon.classList.remove('fa-play');
	icon.classList.add('fa-pause');
	container.classList.add('play');

	audioElement.play();
}

// pause song
function pauseSong() {
	if (audioContext.state === 'suspended') {
		audioContext.resume();
	}

	const icon = playBtn.querySelector('i');
	icon.classList.add('fa-play');
	icon.classList.remove('fa-pause');
	container.classList.remove('play');

	audioElement.pause();
}

// toggle play or pause song
function togglePLayState() {
	audioElement.paused ? playSong() : pauseSong();
}

// control volume using volume button or range input
function volumeControl() {
	if (this === volumeBtn) {
		isMute = !isMute;
	} else if (this == volumeRange) {
		+volumeRange.value === 0 ? (isMute = true) : (isMute = false);
	}

	if (isMute === true) {
		gainNode.gain.value = 0;
		volumeRange.classList.add('mute');
		volumeBtn.classList.add('mute');
	} else {
		gainNode.gain.value = volumeRange.value;
		volumeRange.classList.remove('mute');
		volumeBtn.classList.remove('mute');
	}
}

// go to next song
function nextSong() {
	pauseSong();

	currentSong.songIndex === listOfSongs.length - 1
		? (currentSong.songIndex = 0)
		: currentSong.songIndex++;

	playSong();
}

// go to previous song
function prevSong() {
	pauseSong();

	currentSong.songIndex === 0
		? (currentSong.songIndex = listOfSongs.length - 1)
		: currentSong.songIndex--;

	playSong();
}

// update Progress Bar
function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}

// set progress bar
function setProgress(e) {
	const clickX = e.offsetX;
	const width = this.clientWidth;
	const duration = audioElement.duration;

	audioElement.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', togglePLayState);

volumeBtn.addEventListener('click', volumeControl);
volumeRange.addEventListener('change', volumeControl);
volumeRange.addEventListener('input', volumeControl);

nextSongBtn.addEventListener('click', nextSong);
audioElement.addEventListener('ended', nextSong);

prevSongBtn.addEventListener('click', prevSong);

progressBar.addEventListener('click', setProgress);
audioElement.addEventListener('timeupdate', updateProgress);
