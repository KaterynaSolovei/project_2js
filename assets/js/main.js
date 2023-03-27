const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('#indicators-container');
const indicatorItems = document.querySelectorAll('.indicator');
const pauseBtn = document.querySelector('#pause-btn');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

const SLIDES_LENGTH = slides.length;
const CODE_ARROW_LEFT ='ArrowLeft';
const CODE_ARROW_RIGHT ='ArrowRight';

const CODE_SPACE ='Space';
const FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
const FA_PLAY = '<i class="fas fa-play-circle"></i>';




let currentSlide = 0;
let timerID = null;
let isPlaying = true;

function gotoNth(n) {
  slides[currentSlide].classList.toggle('active');
  indicatorItems[currentSlide].classList.toggle('active')
  currentSlide = (n + SLIDES_LENGTH) % SLIDES_LENGTH;
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
    pauseBtn.innerHTML = FA_PLAY;
  }
}

function playHandler() {
  timerID = setInterval(gotoNext, 2000);
  isPlaying = true;
  pauseBtn.innerHTML = FA_PAUSE;
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

function pressKey(e) {
  if(e.code === CODE_SPACE) pausePlayHandler();
  if(e.code === CODE_ARROW_LEFT) prevHandler();
  if(e.code === CODE_ARROW_RIGHT) nextHandler();

}

pauseBtn.addEventListener('click', pausePlayHandler);
prevBtn.addEventListener('click', prevHandler);
nextBtn.addEventListener('click', nextHandler);
indicatorsContainer.addEventListener('click', indicate);
document.addEventListener('keydown', pressKey)

timerID = setInterval(gotoNext, 2000);
