
const animateForm = () => {
  const arrows = document.querySelectorAll('.fa-arrow-down');
  arrows.forEach((arrow) => {
    arrow.addEventListener('click', () => {
      const input = arrow.previousElementSibling;
      const parent = arrow.parentElement;
      const nextField = parent.nextElementSibling;

      if (input.type === 'text' && validate(input)) {
        nextSlide(parent, nextField);
      } else if (input.type === 'email' && validate(input)) {
        nextSlide(parent, nextField);
      } else if (input.type === 'password' && validate(input)) {
        nextSlide(parent, nextField);
      } else {
        parent.style.animation = 'shake 0.5s ease';
      }

      // get rid of animation when it ends
      parent.addEventListener('animationend', () => {
        parent.style.animation = '';
      });
    });
  });
};

const validate = (email) => {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (validation.test(email.value)) {
    setColor('rgb(87, 189, 130)'); // success
    return true;
  }

  setColor('rgb(189, 87, 87)'); // failure
  flash(document.querySelector('#report'));
  return false;

};

const flash = (element) => {
  element.classList.remove('hide');
  element.classList.add('show');
  setTimeout(() => {
    element.classList.add('hide');
    element.classList.remove('show');
  }, 2000);
};

const nextSlide = (parent, nextField) => {
  parent.classList.add('inactive');
  parent.classList.remove('active');
  nextField.classList.add('active');
  nextField.classList.remove('inactive');
};

const setColor = (color) => {
  document.body.style.backgroundColor = color;
};

animateForm();
