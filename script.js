const audio = document.querySelector('#audio');
const playPauseButton = document.querySelector('.play-pause-button');
const volumeSlider = document.querySelector('.volume-slider');
const progressBar = document.querySelector('.progress-bar');
const progressBarHandle = document.querySelector('.progress-bar-handle');
const progressBarContainer = document.querySelector('.progress-bar-container');

let isPlaying = false;


// Adiciona um evento de clique ao progress bar container
progressBarContainer.addEventListener('click', function (event) {
  // Obtém a largura do elemento progress-bar-container
  const containerWidth = progressBarContainer.offsetWidth;
  // Obtém a posição horizontal do clique dentro do elemento progress-bar-container
  const clickPosition = event.offsetX;
  // Calcula a posição decimal do clique em relação à largura total
  const positionDecimal = clickPosition / containerWidth;
  // Define o tempo de reprodução com base na posição decimal
  audio.currentTime = audio.duration * positionDecimal;
});

// Atualiza a posição do progresso do progress bar a cada atualização do tempo de reprodução
audio.addEventListener('timeupdate', function () {
  // Obtém a posição decimal atual do tempo de reprodução
  const positionDecimal = audio.currentTime / audio.duration;
  // Atualiza a largura do progress bar para refletir a posição atual
  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = `${positionDecimal * 100}%`;
});


playPauseButton.addEventListener('click', togglePlayPause);

audio.addEventListener('timeupdate', updateProgressBar);

audio.addEventListener('ended', function() {
  isPlaying = false;
  playPauseButton.classList.remove('playing');
  playPauseButton.classList.add('paused');
});

volumeSlider.addEventListener('input', function() {
  audio.volume = volumeSlider.value;
});

progressBar.addEventListener('click', function(e) {
  const clickX = e.offsetX;
  const barWidth = progressBar.clientWidth;
  const progress = clickX / barWidth;
  audio.currentTime = audio.duration * progress;
});
progressBarHandle.addEventListener('mousedown', function() {
    audio.pause();
    isPlaying = false;
    document.addEventListener('mousemove', moveProgressBarHandle);
    document.addEventListener('mouseup', releaseProgressBarHandle);
  });
  function moveProgressBarHandle(e) {
  const barWidth = progressBar.clientWidth;
  let progress = (e.clientX - progressBar.getBoundingClientRect().left) / barWidth;
  if (progress < 0) {
    progress = 0;
  } else if (progress > 1) {
    progress = 1;
  }
  progressBarHandle.style.left = `${progress * 100}%`;
}

function releaseProgressBarHandle(e) {
  const barWidth = progressBar.clientWidth;
  const progress = (e.clientX - progressBar.getBoundingClientRect().left) / barWidth;
  audio.currentTime = audio.duration * progress;
  audio.play();
  isPlaying = true;
  document.removeEventListener('mousemove', moveProgressBarHandle);
  document.removeEventListener('mouseup', releaseProgressBarHandle);
}


function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playPauseButton.classList.remove('playing');
    playPauseButton.classList.add('paused');
  } else {
    audio.play();
    isPlaying = true;
    playPauseButton.classList.remove('paused');
    playPauseButton.classList.add('playing');
  }
}

function updateProgressBar() {
  const progress = audio.currentTime / audio.duration;
  progressBar.style.width = `${progress * 100}%`;
  progressBarHandle.style.left = `${progress * 100}%`;
}

  function updateProgressBar() {
    const progress = audio.currentTime / audio.duration;
    progressBar.style.width = `${progress * 100}%`;
  }
  
  setInterval(updateProgressBar, 500);
  
  function seek(event) {
    const container = event.target;
    const containerWidth = container.offsetWidth;
    const offsetX = event.offsetX;
    const duration = audio.duration;
    const currentTime = duration * (offsetX / containerWidth);
    audio.currentTime = currentTime;
  }
  