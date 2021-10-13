const SLIDING_DURATION = 300;

const $prevBtn = document.querySelector('.carousel-control.prev');
const $nextBtn = document.querySelector('.carousel-control.next');
const $carouselSlides = document.createElement('div');
const $carousel = document.querySelector('.carousel');

const throttle = (callback, delay) => {
  let timerId;
  return event => {
    if (timerId) return;
    timerId = setTimeout(
      () => {
        callback(event);
        timerId = null;
      },
      delay,
      event
    );
  };
};

$nextBtn.onclick = throttle(() => {
  $carouselSlides.style.setProperty('--duration', SLIDING_DURATION);
  const currentSlide = $carouselSlides.style.getPropertyValue('--currentSlide');
  $carouselSlides.style.setProperty('--currentSlide', +currentSlide + 1);
  if (+currentSlide + 1 === $carouselSlides.children.length - 1) {
    setTimeout(() => {
      $carouselSlides.style.setProperty('--duration', 0);
      $carouselSlides.style.setProperty('--currentSlide', 1);
    }, SLIDING_DURATION);
  }
}, SLIDING_DURATION);

$prevBtn.onclick = throttle(() => {
  $carouselSlides.style.setProperty('--duration', SLIDING_DURATION);
  const currentSlide = $carouselSlides.style.getPropertyValue('--currentSlide');
  $carouselSlides.style.setProperty('--currentSlide', +currentSlide - 1);
  if (+currentSlide - 1 === 0) {
    setTimeout(() => {
      $carouselSlides.style.setProperty('--duration', 0);
      $carouselSlides.style.setProperty(
        '--currentSlide',
        $carouselSlides.children.length - 2
      );
    }, SLIDING_DURATION);
  }
}, SLIDING_DURATION);

const carousel = ($container, images) => {
  $carouselSlides.classList.add('carousel-slides');
  $carouselSlides.innerHTML =
    `
    <img src="${images[images.length - 1]}" style = "min-width: 100%"/>
  ` +
    images
      .map(
        image => `
    <img src="${image}" style = "min-width: 100%"/>
    `
      )
      .join('') +
    `
    <img src="${images[0]}" style = "min-width: 100%"/>
  `;
  $container.appendChild($carouselSlides);
  $carousel.style.width = '100%';
  $carouselSlides.style.width = '100%';
  $carouselSlides.style.setProperty('--currentSlide', 1);
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);
