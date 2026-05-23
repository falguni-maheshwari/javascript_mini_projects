const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "songs/song1.mp3",
    cover: "images/cover1.jpg"
  },

  {
    title: "Song Two",
    artist: "Artist Two",
    src: "songs/song2.mp3",
    cover: "images/cover2.jpg"
  },

  {
    title: "Song Three",
    artist: "Artist Three",
    src: "songs/song3.mp3",
    cover: "images/cover3.jpg"
  }
];

const audio = new Audio();

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const album = document.querySelector(".album");

let songIndex = 0;
let isPlaying = false;

loadSong(songs[songIndex]);

function loadSong(song){
  title.innerText = song.title;
  artist.innerText = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong(){
  audio.play();
  isPlaying = true;

  playBtn.innerHTML =
  '<i class="fa-solid fa-pause"></i>';

  album.classList.add("playing");
}

function pauseSong(){
  audio.pause();
  isPlaying = false;

  playBtn.innerHTML =
  '<i class="fa-solid fa-play"></i>';

  album.classList.remove("playing");
}

playBtn.addEventListener("click", () => {
  if(isPlaying){
    pauseSong();
  }else{
    playSong();
  }
});

nextBtn.addEventListener("click", () => {
  songIndex++;

  if(songIndex > songs.length - 1){
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex--;

  if(songIndex < 0){
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
});

audio.addEventListener("timeupdate", () => {

  progress.max = audio.duration;
  progress.value = audio.currentTime;

  let currentMin =
  Math.floor(audio.currentTime / 60);

  let currentSec =
  Math.floor(audio.currentTime % 60);

  if(currentSec < 10){
    currentSec = "0" + currentSec;
  }

  document.getElementById("current").innerText =
  currentMin + ":" + currentSec;

  let durationMin =
  Math.floor(audio.duration / 60);

  let durationSec =
  Math.floor(audio.duration % 60);

  if(durationSec < 10){
    durationSec = "0" + durationSec;
  }

  document.getElementById("duration").innerText =
  durationMin + ":" + durationSec;

});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});