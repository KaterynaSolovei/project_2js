const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('#indicators-container')
const indicatorItems = document.querySelectorAll('.indicator');
const pauseBtn = document.querySelector('#pause-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');


let currentSlide = 0;
let timerID = null;
let isPlaying = true;

function gotoNth(n) {
  slides[currentSlide].classList.toggle('active');
  indicatorItems[currentSlide].classList.toggle('active')
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.toggle('active');
  indicatorItems[currentSlide].classList.toggle('active')
}

function gotoPrev() {
  gotoNth(currentSlide - 1)
}

function gotoNext() {
  gotoNth(currentSlide + 1)
}

function prevHandler() {
  pauseHandler();
  gotoPrev();
}

function nextHandler(params) {
  pauseHandler();
  gotoNext();
}

function pauseHandler() {
  if (isPlaying) {
    clearInterval(timerID);
    isPlaying = false;
    pauseBtn.innerHTML = 'Play';
  }
}

function playHandler() {
  timerID = setInterval(gotoNext, 2000);
  isPlaying = true;
  pauseBtn.innerHTML = 'Pause';
}

const pausePlayHandler = () => isPlaying ? pauseHandler() : playHandler();

function indicate(e) {
  const target = e.target;

  if (target.classList.contains('indicator')) {
  console.log(target.getAttribute('data-slide-to'))
    pauseHandler();
    gotoNth(+target.getAttribute('data-slide-to'));
  }
}

pauseBtn.addEventListener('click', pausePlayHandler);
prevBtn.addEventListener('click', prevHandler);
nextBtn.addEventListener('click', nextHandler);
indicatorsContainer.addEventListener('click', indicate);

timerID = setInterval(gotoNext, 2000);

/*
function pauseHandler() {
  if (isPlaying) {
    clearInterval(timerID);
    isPlaying = false;
    pauseBtn.innerHTML = FA_PLAY;
  } else {
    timerID = setInterval(gotoNext, 2000);
    isPlaying = true;
    pauseBtn.innerHTML = FA_PAUSE;
  };
}
*/
