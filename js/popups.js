const errorMessageTemplateContent = document.querySelector('#error').content;
const errorMessageTemplate = errorMessageTemplateContent.querySelector('.error');
const body = document.querySelector('body');
//функция для удаление сообщения и остановки обработчиков
const removePopup = (popup, controller) => {
  popup.remove();
  controller.abort();
};

//обработчики
const escPopupHandler = (evt, popup, controller) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    removePopup(popup, controller);
  }
};

const addWindowPopupHandler = (popup, controller) => {
  window.addEventListener('click', () => {
    removePopup(popup, controller);
  }, {signal: controller.signal});
};

const addEscPopupHandler = (popup, controller) => {
  window.addEventListener('keydown', (evt) => {
    escPopupHandler(evt, popup, controller);
  }, {signal: controller.signal});
};

const addButtonPopupHandler = (button, popup, controller) => {
  button.addEventListener('click', () => {
    removePopup(popup, controller);
  }, {signal: controller.signal});
};

//создание сообщений при отправке формы
const createSubmitPopup = (template) => {
  const popup = template.cloneNode(true);
  const controller = new AbortController();
  if (popup.querySelector('button')) {
    addButtonPopupHandler(popup.querySelector('button'), popup, controller);
  }
  addEscPopupHandler(popup, controller);
  body.appendChild(popup);
};

//создание сообщения при ошибке загрузки похожих объявлений
const createAdvertErrorPopup = () => {
  const popup = errorMessageTemplate.cloneNode(true);
  const text = popup.querySelector('.error__message');
  const button = popup.querySelector('.error__button');
  const controller = new AbortController();
  text.textContent = 'При запросе информации о похожих объявлениях произошла ошибка. Похожие объявления не будут отображены';
  button.textContent = 'ОК';
  addEscPopupHandler(popup, controller);
  addButtonPopupHandler(button, popup, controller);
  addWindowPopupHandler(popup, controller);
  body.appendChild(popup);
};
export {createAdvertErrorPopup, createSubmitPopup};
