import {sendData} from './api.js';
import {setDigitsAfterPoint} from './util.js';
import {createSubmitPopup} from './popups.js';
import {resetMap} from './map.js';
import {removePictures} from './input-images.js';

const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 3000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;
const SET_DIGITS_SLIDER = 0;
const form = document.querySelector('.ad-form');
const formPrice = form.querySelector('#price');
const submitButton = form.querySelector('.ad-form__submit');
const errorMessageTemplateContent = document.querySelector('#error').content;
const errorMessageTemplate = errorMessageTemplateContent.querySelector('.error');
const successMessageTemplateContent = document.querySelector('#success').content;
const successMessageTemplate = successMessageTemplateContent.querySelector('.success');
const resetButton = form.querySelector('.ad-form__reset');
const formType = form.querySelector('#type');
const formTimein = form.querySelector('#timein');
const formTimeout = form.querySelector('#timeout');
const formCapacity = form.querySelector('#capacity');
const formRooms = form.querySelector('#room_number');

// проставление всем полям ввода с аттрибутами стандартных сообщений об ошибке
const setInputErrorMessages = (formWithInputs)  => {
  const inputs = formWithInputs.querySelectorAll('fieldset input');
  for (let i = 0; i < inputs.length; i++){
    if (inputs[i].hasAttribute('required')) {
      inputs[i].setAttribute('data-pristine-required-message','Обязательное поле');
    }
    if (inputs[i].hasAttribute('minlength')) {
      const inputMinlength = inputs[i].getAttribute('minlength');
      inputs[i].setAttribute('data-pristine-minlength-message',`Минимальная длина ${inputMinlength} символов`);
    }
    if (inputs[i].hasAttribute('maxlength')) {
      const inputMaxlength = inputs[i].getAttribute('maxlength');
      inputs[i].setAttribute('data-pristine-maxlength-message',`Максимальная длина ${inputMaxlength} символов`);
    }
    if (inputs[i].hasAttribute('max')) {
      const inputMax = inputs[i].getAttribute('max');
      inputs[i].setAttribute('data-pristine-max-message',`Максимальное значение ${inputMax}`);
    }
    if (inputs[i].getAttribute('type') === 'number') {
      inputs[i].setAttribute('data-pristine-number-message','Пожалуйста, введите число');
    }
  }
};
setInputErrorMessages(form);

//фикс стандартной ошибки минимального значения для цены
const formPriceTemporary = formPrice.min;
formPrice.min = Number.NEGATIVE_INFINITY;

// валидатор
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

//поля типа жилья и цены за ночь
formPrice.min = formPriceTemporary;

// слайдер цены
const priceSlider = form.querySelector('.ad-form__slider');
noUiSlider.create(priceSlider, {
  range: {
    min: Number(formPrice.min),
    max: Number(formPrice.max),
  },
  start: Number(formPrice.placeholder),
  step: 1,
});

//установление минимальной цены в зависимости от типа жилья
const setMinPrice = () => {
  const type = formType.value;
  let minPrice = 0;
  switch (type) {
    case 'bungalow':
      minPrice = BUNGALOW_MIN_PRICE;
      break;
    case 'flat':
      minPrice = FLAT_MIN_PRICE;
      break;
    case 'hotel':
      minPrice = HOTEL_MIN_PRICE;
      break;
    case 'house':
      minPrice = HOUSE_MIN_PRICE;
      break;
    case 'palace':
      minPrice = PALACE_MIN_PRICE;
      break;
  }
  formPrice.setAttribute('min', minPrice);
  formPrice.setAttribute('placeholder', minPrice);
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: Number(formPrice.max),
    },
    start: Number(formPrice.value),
  });
};

//кастомный валидатор для минимальной цены
pristine.addValidator(formPrice, (value) => {
  const valueNumber = Number(value);
  return valueNumber >= formPrice.min;
}, () => `Минимальное значение ${formPrice.min}`);

formType.addEventListener ('change', () => {
  setMinPrice();
  pristine.validate(formPrice);
});

formPrice.addEventListener('change', () => {
  priceSlider.noUiSlider.set(Number(formPrice.value));
});

priceSlider.noUiSlider.on('slide', () => {
  formPrice.value = setDigitsAfterPoint(priceSlider.noUiSlider.get(), SET_DIGITS_SLIDER);
  pristine.validate(formPrice);
});

//синхронизация времени заезда и выезда
formTimein.addEventListener ('change', () => {
  formTimeout.value = formTimein.value;
});

formTimeout.addEventListener ('change', () => {
  formTimein.value = formTimeout.value;
});

//кастомный валидатор для количества мест
pristine.addValidator(formCapacity, (value) => {
  const roomsNumber = formRooms.value;
  switch (roomsNumber){
    case '1':
      return (value === '1');
    case '2':
      return (value === '1' || value === '2');
    case '3':
      return (value === '1' || value === '2' || value === '3');
    case '100':
      return (value === '0');
  }
  return false;
}, 'Недопустимое значение');

formRooms.addEventListener ('change', () => {
  pristine.validate(formCapacity);
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

//отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    sendData(
      () => {
        form.reset();
        formType.value = 'flat';
        setMinPrice();
        resetMap();
        removePictures();
        createSubmitPopup(successMessageTemplate);
        unblockSubmitButton();
      },
      () => {
        createSubmitPopup(errorMessageTemplate);
        unblockSubmitButton();
      },
      new FormData(form),
    );
  }
});

//кнопка сбросить
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
  formType.value = 'flat';
  setMinPrice();
  resetMap();
  removePictures();
});
