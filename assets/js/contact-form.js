const TYPE = {
  error: 'error',
  success: 'success',
};

const checkEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // Formato de email válido

const form = document.getElementById('contact-form');
const formName = document.getElementById('form-name');
const formEmail = document.getElementById('form-email');
const formMessage = document.getElementById('form-message');
const notification = document.getElementById('notification');
const message = document.getElementById('message');
const iconWrapper = document.getElementById('icon__wrapper');
const notificationProgress = document.getElementById('notification__progress');

form.addEventListener('submit', onFormSubmit);

formName.addEventListener('keypress', function () {
  formName.classList.remove('error2');
});

formEmail.addEventListener('focus', function () {
  this.select();
});

formEmail.addEventListener('keypress', function () {
  formEmail.classList.remove('error2');
});

formMessage.addEventListener('keypress', function () {
  formMessage.classList.remove('error2');
});

function onFormSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const object = Object.fromEntries(data.entries());
  if (object.name === '') {
    formName.focus();
    formName.classList.add('error2');
    showNotification('Escribe tu nombre', TYPE.error);
    return;
  }

  if (object.email === '') {
    formEmail.focus();
    formEmail.classList.add('error2');
    showNotification('Escribe tu correo', TYPE.error);
    return;
  }

  // TODO: Validar formato del nombre. Crear una Regex para eso llamada checkName.

  if (!checkEmail.test(object.email)) {
    formEmail.focus();
    formEmail.classList.add('error2');
    showNotification('Correo inválido', TYPE.error);
    return;
  }

  if (object.message === '') {
    formMessage.focus();
    formMessage.classList.add('error2');
    showNotification('Escibre un mensaje', TYPE.error);
    return;
  }

  showNotification('¡Mensaje enviado!', TYPE.success);
  formName.classList.remove('error2');
  formEmail.classList.remove('error2');
  formMessage.classList.remove('error2');
  form.reset();
  console.log({ object });
}

const showNotification = (text, type) => {
  message.textContent = text;
  const i = document.createElement('i');

  if (type === TYPE.error) {
    deleteNode(iconWrapper);
    i.setAttribute('class', 'fa-solid fa-xmark');
    iconWrapper.appendChild(i);
    iconWrapper.classList.remove('success');
    notificationProgress.classList.remove('success-progress');
    iconWrapper.classList.add('error');
    notificationProgress.classList.add('error-progress');
  } else {
    deleteNode(iconWrapper);
    i.setAttribute('class', 'fa-solid fa-check');
    iconWrapper.appendChild(i);
    iconWrapper.classList.remove('error');
    notificationProgress.classList.remove('error-progress');
    iconWrapper.classList.add('success');
    notificationProgress.classList.add('success-progress');
  }

  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 5000);
};

const deleteNode = (node) => {
  while (node.lastChild) {
    node.lastChild.remove();
  }
};

window.onload = function () {
  document.querySelector('.loader').style.display = 'none';
};
