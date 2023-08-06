// Video player controls and event handlers for play, pause, mute, volume control, timeline, fullscreen, etc.
const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;

// Implement play function
const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

// Implement mute function
const handleMuteClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volumeValue;
};

// Implement volumne adjustment function
const handleVolumeChange = (event) => {
  const {
  target: { value },
  } = event;
  if (video.muted) {
  video.muted = false;
  muteBtnIcon.classList = "fas fa-volume-up";
  }
  if (value == 0) {
  muteBtnIcon.classList = "fas fa-volume-mute";
  }
  if (volumeRange.value != 0) {
  muteBtnIcon.classList = "fas fa-volume-up";
  }
  volumeValue = value;
  video.volume = value;
  };

// Set format of time of video function
const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

// Implement time of video function
const handleLoadedMetadata = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

// Implement time of video update function
const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

// Implement timeline change function
const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

// Implement full screen function
const handleFullscreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

// Implement hideControls function
const hideControls = () => videoControls.classList.remove("showing");

// Implement mousemove function
const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

// Implement mouseleave function
const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

// Implement change of video time function
const changeVideoTime = (seconds) => {
  video.currentTime += seconds;
};

// Implement shortcut using keyboard
const handleKeydown = (event) => {
  console.log(event);
  if (event.code === "Space") {
    handlePlayClick();
    event.preventDefault();
  }
  if (event.code === "Enter") {
    handleFullscreen();
    event.preventDefault();
  }
  if (event.code === "ArrowRight") {
    changeVideoTime(5);
    event.preventDefault();
  }
  if (event.code === "ArrowLeft") {
    changeVideoTime(-5);
    event.preventDefault();
  }
  };

const handleVideoClickPlay = () => {
  handlePlayClick();
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteClick);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("keydown", handleKeydown);
video.addEventListener("click", handleVideoClickPlay);