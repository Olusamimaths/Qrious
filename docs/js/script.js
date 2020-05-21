const events = ['click', 'keydown'];
const arrows = document.querySelectorAll('#arrow-next');
const animateForm = () => {
  events.forEach((eventType) => {
    // if eventType is click, add event listener to arrow
    if (eventType === 'click') {
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
    }
    // if eventType is keydown, add event lister to document window
    else if (eventType === 'keydown') {
      let error = false;
      document.addEventListener(eventType, (event) => {
        if (event.keyCode === 13 || event.which === 13) {
          arrows.forEach((arrow) => {
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
              error = true;
            }

            // get rid of animation when it ends
            parent.addEventListener('animationend', () => {
              parent.style.animation = '';
            });
          });

          // const signInArrow = document.querySelector('#submit-arrow');
          // signInArrow.setAttribute('visible', '')
        }
      });
    }
  });
};

const validate = (input) => {
  if (input.value) {
    setColor('rgb(87, 189, 130)'); // success
    return true;
  }

  setColor('rgb(189, 87, 87)'); // failure
  return false;
};

const flash = (element, message, color) => {
  element.style.color = color;
  element.classList.remove('hide');
  element.classList.add('show');
  element.innerText = message;
  setTimeout(() => {
    element.classList.add('hide');
    element.classList.remove('show');
  }, 5000);
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

function signOut() {
  localStorage.removeItem('accessToken');
  return (location.href = 'signin.html');
}

animateForm();


const apiPrefix = 'https://qrious-me.herokuapp.com/api/v1/';
