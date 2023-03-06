const slides = document.querySelectorAll('.slide');;
console.log(slides);

let currentSlide = 0;
let timerId = null;

function nextSlide() {
  slides[currentSlide].className = 'slide';
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].className = "slide active";
}

setInterval(nextSlide, 2000);

pauseButton.addEventListener(() => {
clearInterval(timerID);
});
/*
if (currentSlide === 4) {
    currentSlide = 0;
  } else {
        currentSlide++;
  }*/