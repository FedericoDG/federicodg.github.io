let items = Array.from(document.querySelectorAll('.slider__list-item')); //Esto es un Array
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const arrows = document.getElementById('slider-arrows');

if (items.length == 1) {
  arrows.style.display = 'none';
}

const countItem = items.length;
let itemActive = 0;

next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }

  showSlider();
};

prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }

  showSlider();
};

let autoplay = setInterval(() => {
  next.click();
}, 5000);

function showSlider() {
  const itemActiveOld = document.querySelector('.slider__list-item.active');
  itemActiveOld.classList.remove('active');

  items[itemActive].classList.add('active');
  clearInterval(autoplay);
  autoplay = setInterval(function () {
    next.click();
  }, 5000);
}

window.onload = function () {
  document.querySelector('.loader').style.display = 'none';
};
