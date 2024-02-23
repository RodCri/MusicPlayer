const songImg = document.querySelector('.card__img'),
songName = document.querySelector('.card__song'),
songAuthor = document.querySelector('.card__author'),
songTime = document.querySelector('.card__time'),
songDuration = document.querySelector('.card__durationSong'),
songPrev = document.querySelector('.card__prev'),
songPlay = document.querySelector('.card__play'),
songNext = document.querySelector('.card__next'),
songProgress = document.querySelector('.card__progress'),
progress = document.querySelector('.progress');

const music = new Audio();

const songs = [
  {
    songUrl: "../assets/lost-in-city-lights-145038.mp3",
    songName: "Lost in the City Lights",
    songImg: "../assets/cover-1.png",
    songAuthor: "Cosmo Sheldrake",
  },
  {
    songUrl: "../assets/forest-lullaby-110624.mp3",
    songName: "Forest Lullaby",
    songImg: "../assets/cover-2.png",
    songAuthor: "Lesfm",
  },
];

let songIndex = 0;
let isPlaying = false;

function togglePlay() {
  return isPlaying ? pauseMusic() : playMusic();
}

function playMusic() {
  isPlaying = true;
  songPlay.src = "../assets/stop.svg";
  songPlay.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  songPlay.src = "../assets/Play_fill.svg";
  songPlay.setAttribute("title", "Play");
  music.pause();
}

function loadMusic(song) {
  music.src = song.songUrl;
  songName.textContent = song.songName;
  songAuthor.textContent = song.songAuthor;
  songImg.src = song.songImg;
}

function changeMusic(direction) {
  songIndex = (songIndex + direction + songs.length) % songs.length;
  loadMusic(songs[songIndex]);
  playMusic();
}

function updateProgressBar() {
  const { duration, currentTime } = music;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const formatTime = (time) => String(Math.floor(time)).padStart(2, "0");
  songDuration.textContent = `${formatTime(duration / 60)}:${formatTime(
    duration % 60
  )}`;
  songTime.textContent = `${formatTime(currentTime / 60)}:${formatTime(
    currentTime % 60
  )}`;
}

function setProgressBar(e) {
  const width = songProgress.clientWidth;
  const clickX = e.offsetX;
  music.currentTime = (clickX / width) * music.duration;

  playMusic();
}

songPlay.addEventListener("click", togglePlay);
songPrev.addEventListener("click", () => changeMusic(-1));
songNext.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
songProgress.addEventListener("click", setProgressBar);

loadMusic(songs[songIndex]);