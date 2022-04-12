const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const filters = document.querySelector('.map__filters');
const filtersFieldsets = filters.querySelectorAll('fieldset');
const filtersSelect = filters.querySelectorAll('select');

// функции перевода страницы в активное/неактивное состояние
const disableNodeList = (nodeList) => {
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].setAttribute('disabled','');
  }
};

const enableNodeList = (nodeList) => {
  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].removeAttribute('disabled');
  }
};

const disablePage = () => {
  form.classList.add('ad-form--disabled');
  filters.classList.add('map__filters--disabled');
  disableNodeList(formFieldsets);
  disableNodeList(filtersFieldsets);
  disableNodeList(filtersSelect);
};
const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  enableNodeList(formFieldsets);
};

const enableFilter = () => {
  filters.classList.remove('map__filters--disabled');
  enableNodeList(filtersFieldsets);
  enableNodeList(filtersSelect);
};

//приведение к числу и установление знаков после запятой
const setDigitsAfterPoint = function (numberString, digits) {
  const newString = Number.parseFloat(numberString).toFixed(digits);
  return newString;
};

//устранение дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {enableFilter, enableForm, disablePage, setDigitsAfterPoint, debounce};
