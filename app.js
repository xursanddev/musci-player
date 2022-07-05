// Selectors
const musicContainer = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#music");
const progress = document.querySelector("#progress");
const progressContainer = document.querySelector("#progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Qo'shiq titles
const songs = ["Лиякун", "Кайфовать", "Сияи", "Dancin"];

let songIndex = 0;

// Load song details
loadSong(songs[songIndex]);

// update song details
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Event Listener
// Play
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
    if (isPlaying){
        pauseSong();
    } else{
        playSong();
    }
});

// Play song
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
}

// pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause();
}

// change song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// prev song function
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// next song function
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Time song update

audio.addEventListener("timeupdate", upadateProgress);

function upadateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration ) * 100;
    progress.style.width = `${progressPercent}%`;
}

// click on progress bar
progressContainer.addEventListener("click", setProgress);
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}