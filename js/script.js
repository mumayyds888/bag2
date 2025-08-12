import { loadSliderData } from './fetch-data.js';
import { initAppSlider } from './init-slider.js';

// 加上未來可能需要的 JS 互動
document.querySelectorAll('.cta-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert("Added to inquiry!");
  });
});

// video

document.querySelectorAll('[data-player]').forEach(wrapper => {
  const video = wrapper.querySelector('video');
  const playBtn = wrapper.querySelector('.play-btn');
  const playToggle = wrapper.querySelector('.play-toggle');
  const progress = wrapper.querySelector('.progress');
  const time = wrapper.querySelector('.time');
  const mute = wrapper.querySelector('.mute');
  const volumeSlider = wrapper.querySelector('.volume');
  const fullscreen = wrapper.querySelector('.fullscreen');
  const rewind = wrapper.querySelector('.rewind');
  const forward = wrapper.querySelector('.forward');
  const poster = wrapper.querySelector('.video-poster');


  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  playBtn.addEventListener('click', () => {
    video.play();
    playBtn.style.display = 'none';
    poster.style.display = 'none';
    playToggle.innerHTML = '&#10073;&#10073;';
  });

  playToggle.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playToggle.innerHTML = '&#10073;&#10073;';
    } else {
      video.pause();
      playToggle.innerHTML = '&#9654;';
    }
  });

  video.addEventListener('timeupdate', () => {
    progress.value = video.currentTime;
    progress.max = video.duration;
    time.textContent = formatTime(video.currentTime);
  });

  progress.addEventListener('input', () => {
    video.currentTime = progress.value;
  });

  mute.addEventListener('click', () => {
    video.muted = !video.muted;
    mute.innerHTML = video.muted ? '&#128263;' : '&#128266;';
  });

  fullscreen.addEventListener('click', () => {
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
  });

  rewind.addEventListener('click', () => {
    if (video.currentTime > 2) {
      video.currentTime -= 2;
    } else {
      video.currentTime = 0;
    }
  });

  forward.addEventListener('click', () => {
    if (video.currentTime + 2 < video.duration) {
      video.currentTime += 2;
    } else {
      video.currentTime = video.duration;
    }
  });
  mute.addEventListener('click', () => {
    video.muted = !video.muted;
    mute.innerHTML = video.muted ? '&#128263;' : '&#128266;';
    volumeSlider.value = video.muted ? 0 : video.volume;
  });

  volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
    video.muted = volumeSlider.value == 0;
    mute.innerHTML = video.muted ? '&#128263;' : '&#128266;';
  });
});



// sliders

document.addEventListener('DOMContentLoaded', async () => {
  const dataList = [
    { src: "img/img91.png", label: "T-shirt bag" },
    { src: "img/img101.png", label: "Shopping bag" },
    { src: "img/img111.png", label: "Heavy duty bag" },
    { src: "img/img121.png", label: "Universal bag" },
    { src: "img/img131.png", label: "Draw tape bag" },
  ];

  await loadSliderData('.app-slider', dataList);

  const wrapper = document.querySelector('.slider-container');
  initAppSlider(wrapper);
});





// header漢堡選單
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.getElementById('menuClose');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('show');
  });

  menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('show');
  });
});