const video = document.getElementById('video');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timeStamp = document.getElementById('timeStamp');

// play/pause video
function toggleVideoStatus() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// toggle play icon play/pause
function togglePlayIcon() {
    if(video.paused) {
        play.innerHTML = "<i class='fas fa-play fa-2x'></i>"
    } else {
        play.innerHTML = "<i class='fas fa-pause fa-2x'></i>"
    }
}

// Update Progress bar and timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    let min = Math.floor(video.currentTime / 60);
    if(min < 10) {
        min = '0' + min;
    }

    let sec = Math.floor(video.currentTime % 60);
    if(sec < 10) {
        sec = '0' + sec;
    }

    timeStamp.innerText = `${min}:${sec}`;
}

// update video time according to user
function updatVideoTime() {
    video.currentTime = (+progress.value / 100) * video.duration;
}

// stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// EVENT LISTENERS
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', togglePlayIcon);
video.addEventListener('play', togglePlayIcon);
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', updatVideoTime)