// constants
const SLIDING_DURATION = 600;

// states
let isAbleSliding = true;

// DOM Nodes
const $carouselSlides = document.createElement('div');
const $carousel = document.querySelector('.carousel');

// functions
const carousel = ($container, images) => {
  $carouselSlides.classList.add('carousel-slides');
  $carouselSlides.innerHTML =
    `<img src="${images[images.length - 1]}" style = "min-width: 100%"/>` +
    images
      .map(image => `<img src="${image}" style = "min-width: 100%"/>`)
      .join('') +
    `<img src="${images[0]}" style = "min-width: 100%"/>`;
  $container.appendChild($carouselSlides);
  $carousel.style.width = '100%';
  $carouselSlides.style.width = '100%';
  $carousel.style.opacity = '1';
  $carouselSlides.style.setProperty('--currentSlide', 1);
};

carousel(document.querySelector('.carousel'), [
  'movies/movie-1.jpg',
  'movies/movie-2.jpg',
  'movies/movie-3.jpg',
  'movies/movie-4.jpg'
]);

['transitionstart', 'transitionend'].forEach(transitionEvent => {
  $carouselSlides.addEventListener(transitionEvent, () => {
    isAbleSliding = transitionEvent === 'transitionend';
  });
});

const jumpSlide = shiftedSlide =>
  setTimeout(() => {
    $carouselSlides.style.setProperty('--duration', 0);
    $carouselSlides.style.setProperty('--currentSlide', shiftedSlide);
    isAbleSliding = true;
  }, SLIDING_DURATION);

// event bindings
$carousel.onclick = e => {
  if (!(isAbleSliding && e.target.classList.contains('carousel-control')))
    return;
  $carouselSlides.style.setProperty('--duration', SLIDING_DURATION);

  const currentSlide = $carouselSlides.style.getPropertyValue('--currentSlide');

  const [nextSlide, shiftedSlide] = e.target.classList.contains('next')
    ? [+currentSlide + 1, 1]
    : [+currentSlide - 1, $carouselSlides.children.length - 2];

  $carouselSlides.style.setProperty('--currentSlide', nextSlide);
  if (nextSlide === 0 || nextSlide === $carouselSlides.children.length - 1)
    jumpSlide(shiftedSlide);
};
