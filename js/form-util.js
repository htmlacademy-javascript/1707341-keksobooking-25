const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const filters = document.querySelector('.map__filters');
const filtersFieldsets = filters.querySelectorAll('fieldset');
const filtersSelect = filters.querySelectorAll('select');
const errorMessageTemplateContent = document.querySelector('#error').content;
const errorMessageTemplate = errorMessageTemplateContent('.error');
//из модуля 7 задания 2 функции перевода страницы в активное/неактивное состояние

const disablePage = function () {
  form.classList.add('ad-form--disabled');
  filters.classList.add('map__filters--disabled');
  const disableNodeList = function (nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].setAttribute('disabled','');
    }
  };
  disableNodeList(formFieldsets);
  disableNodeList(filtersFieldsets);
  disableNodeList(filtersSelect);
};
const enablePage = function () {
  form.classList.remove('ad-form--disabled');
  filters.classList.remove('map__filters--disabled');
  const enableNodeList = function (nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].removeAttribute('disabled');
    }
  };
  enableNodeList(formFieldsets);
  enableNodeList(filtersFieldsets);
  enableNodeList(filtersSelect);
};

const setDigitsAfterPoint = function (numberString, digits) {
  const newString = Number.parseFloat(numberString).toFixed(digits);
  return newString;
};

const closePopup = (popup) => {

}
const onPopupEscKeydown = (evt, popup) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();

  }
}

const createAdvertErrorPopup = function () {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorText = errorMessage.querySelector('.error__message');
  const errorButton = errorMessage.querySelector('.error__button');
  errorText.textContent = 'При запросе информации о похожих объявлениях произошла ошибка.<br>Похожие объявление не будут отображены';
  errorButton.textContent = 'ОК';
  return errorMessage;
};

const addPopupHandler = (closeButton, popup) => {
  closeButton.addEventListener
};

export {enablePage, disablePage, setDigitsAfterPoint};
