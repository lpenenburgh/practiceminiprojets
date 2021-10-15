// variables
const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timeStamp = document.getElementById("timestamp");






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
