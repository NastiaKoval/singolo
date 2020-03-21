const MENU = document.getElementById('menu');
const VERT_BTN = document.getElementById('vert-button');
const VERT_SCR = document.getElementById('vert-screen');
const HOR_BTN = document.getElementById('hor-button');
const HOR_SCR = document.getElementById('hor-screen');
const SLIDER = document.querySelector('.slider-container');
const LEFT_ARROW = document.getElementById('arrow-left');
const RIGHT_ARROW = document.getElementById('arrow-right');
const PORTFOLIO_BUTTONS = document.getElementById('buttons');
const IMAGES_BLOCK = document.getElementById('images-block');
const IMAGES = IMAGES_BLOCK.querySelectorAll('.portfolio-image');
const BUTTON = document.getElementById('btn');
const CLOSE_BUTTON = document.getElementById('close-btn');

MENU.addEventListener('click', (event) => {
  MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
  event.target.classList.add('active');
});

document.addEventListener('scroll', function (event) {
  const currentPos = window.scrollY;
  const sections = document.querySelectorAll('main>section');

  sections.forEach((el) => {
    if (el.offsetTop <= currentPos && (el.offsetTop + el.offsetHeight) > currentPos) {
      MENU.querySelectorAll('a').forEach((a) => {
        a.classList.remove('active');
        if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('active');
        }
      });
    } 
  });

});

VERT_BTN.addEventListener('click', (event) => {
  VERT_SCR.classList.toggle('invisible');
});

HOR_BTN.addEventListener('click', (event) => {
  HOR_SCR.classList.toggle('invisible');
});

let currentSlideNumber = 0;
let slides = SLIDER.querySelectorAll('.slide');


// function leftOut() {
//   slides[currentSlideNumber].classList.add('left-out');
//   slides[currentSlideNumber].addEventListener('animationend', function() {
//     this.classList.remove('left-out');
//     this.classList.remove('current');
//   });
// }

// function rightIn() {
//   slides[currentSlideNumber].classList.add('right-in');
//   // slides[currentSlideNumber].classList.add('current');
//   slides[currentSlideNumber].addEventListener('animationend', function() {
//     this.classList.add('current');
//     this.classList.remove('right-in');
//   });
// }

// LEFT_ARROW.addEventListener('click', (event) => {
//     leftOut();
//     if (currentSlideNumber == 0) {
//       currentSlideNumber = slides.length - 1;
//     } else if (currentSlideNumber > 0) {
//       currentSlideNumber -= 1;
//     }
//     slides[currentSlideNumber].classList.add('current');
//     // rightIn();
//   });
 
//   // slides[currentSlideNumber].classList.add('right-in');
//   // slides[currentSlideNumber].addEventListener('animationstart', function() {
//   //   this.classList.add('current');
//   // });
//   // slides[currentSlideNumber].addEventListener('animationend', function() {
//   //   this.classList.remove('right-in');
//   // });

  LEFT_ARROW.addEventListener('click', (event) => {
    slides[currentSlideNumber].classList.remove('current');
    if (currentSlideNumber == 0) {
      currentSlideNumber = slides.length - 1;
    } else if (currentSlideNumber > 0) {
      currentSlideNumber -= 1;
    }
    slides[currentSlideNumber].classList.add('current');
  });
RIGHT_ARROW.addEventListener('click', (event) => {
  slides[currentSlideNumber].classList.remove('current');
  if (currentSlideNumber == slides.length - 1) {
    currentSlideNumber = 0;
  } else if (currentSlideNumber < slides.length) {
    currentSlideNumber = currentSlideNumber + 1;
  }
  slides[currentSlideNumber].classList.add('current');
});

PORTFOLIO_BUTTONS.addEventListener('click', (event) => {
  if (event.target !== PORTFOLIO_BUTTONS) {
    PORTFOLIO_BUTTONS.querySelectorAll('button').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
  
    mixImages(IMAGES);
  } 
});

function mixImages(array) {
	let currentIndex = array.length;
  let randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		array[currentIndex].before(array[randomIndex]); 
	}
}

IMAGES_BLOCK.addEventListener('click', (event) => {
  IMAGES.forEach(el => el.classList.remove('selected'));
  if (event.target !== IMAGES_BLOCK){
    event.target.classList.add('selected');
  }
});

BUTTON.addEventListener('click', (event) => {
  let inputs = document.querySelector('form').querySelectorAll('input');
  let empty = false;
  for (let el of inputs) {
    if (el.hasAttribute('required')) {
      if (el.value.toString() == '') {
        empty = true;
      }
    }
  }
  if (empty == false) {
    BUTTON.removeAttribute('type');
    BUTTON.setAttribute('type', 'button');
    document.getElementById('message-block').classList.remove('invisible');
    if (document.getElementById('subject').value.toString() == '') {
      document.querySelectorAll('.subject').forEach(el => el.classList.toggle('invisible'));
    } else {
      const subject = document.getElementById('subject').value.toString();
      document.getElementById('subject-result').innerText = subject;
    }
    if (document.getElementById('description').value.toString() == '') {
      document.querySelectorAll('.description').forEach(el => el.classList.toggle('invisible'));
    } else {
      const description = document.getElementById('description').value.toString();
      document.getElementById('description-result').innerText = description;
    }
  }
})

CLOSE_BUTTON.addEventListener('click', (event) => {
  document.getElementById('message-block').classList.add('invisible');
  if (document.getElementById('subject').value.toString() == '') {
    document.querySelectorAll('.subject').forEach(el => el.classList.toggle('invisible'));
  } else {
    document.getElementById('subject-result').innerText = '';
  }
  if (document.getElementById('description').value.toString() == '') {
    document.querySelectorAll('.description').forEach(el => el.classList.toggle('invisible'));
  } else {
    document.getElementById('description-result').innerText = '';
  }
  document.querySelector('form').reset();
})


