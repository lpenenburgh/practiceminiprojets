// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

// variables
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timeStamp = document.getElementById("timestamp");



//Play and pause video (when clicking either video itself or play icon)
//play() and pause() are methods
function toggleVideoStatus() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

//update the play/pause icon (without this it stays as play icon when paused)
function updatePlayIcon() {
    if(video.paused){
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

//update progress bar & timestamp
function updateProgress() {
    //setting progress bar value to the video current time divided by the video duration, times 100 to get a percentage value
    progress.value = (video.currentTime / video.duration) *
    100;

    // Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }

    //get seconds
    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    timeStamp.innerHTML = `${mins}:${secs}`;
}

//set video time to progress (if you clicked along the progress bar, the video should change to that point in time)
// + insures its a number
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) /
    100;
}

//stop video
//currentTime is a property. By setting it to zero we are resetting the video to the beginning. And then it pauses (which basically is stopping it)
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

//event listeners
//toggle= play video if its stopped & vis versa
video.addEventListener("click", toggleVideoStatus);
// pause or play will switch the icon
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
//to update timestamp as video goes
video.addEventListener("timeupdate", updateProgress);


play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

//wherever user clicks on the slide, it will go to that point in the video
progress.addEventListener("change", setVideoProgress);
