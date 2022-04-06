const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const filters = document.querySelector('.map__filters');
const filtersFieldsets = filters.querySelectorAll('fieldset');
const filtersSelect = filters.querySelectorAll('select');

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

export {enablePage, disablePage, setDigitsAfterPoint};
