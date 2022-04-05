const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const filters = document.querySelector('.map__filters');
const filtersFieldsets = filters.querySelectorAll('fieldset');
const filtersSelect = filters.querySelectorAll('select');

//из модуля 7 задания 2 функции перевода страницы в активное/неактивное состояние
const disablePage = function () {
  form.classList.add('ad-form--disabled');
  filters.classList.add('map__filters--disabled');
  const disableArray = function (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled','');
    }
  };
  disableArray(formFieldsets);
  disableArray(filtersFieldsets);
  disableArray(filtersSelect);
};
const enablePage = function () {
  form.classList.remove('ad-form--disabled');
  filters.classList.remove('map__filters--disabled');
  const enableArray = function (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].removeAttribute('disabled');
    }
  };
  enableArray(formFieldsets);
  enableArray(filtersFieldsets);
  enableArray(filtersSelect);
};

// проставление всем полям ввода с аттрибутами стандартных сообщений об ошибке
const setInputErrorMessages = function(formWithInputs) {
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
    if (inputs[i].hasAttribute('min')) {
      const inputMin = inputs[i].getAttribute('min');
      inputs[i].setAttribute('data-pristine-min-message',`Минимальное значение ${inputMin}`);
    }
  }
};
setInputErrorMessages(form);

// валидатор
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__error'
});

//поля типа жилья и цены за ночь
const formType = form.querySelector('#type');
const formPrice = form.querySelector('#price');
//установление минимальной цены в зависимости от типа жилья
const setMinPrice = function() {
  const type = formType.value;
  let minPrice = 0;
  switch (type) {
    case 'bungalow':
      break;
    case 'flat':
      minPrice = 1000;
      break;
    case 'hotel':
      minPrice = 3000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
      break;
  }
  formPrice.setAttribute('min', minPrice);
  formPrice.setAttribute('data-pristine-min-message', `Минимальное значение ${minPrice}`);
  formPrice.setAttribute('placeholder', minPrice);
  pristine.validate(formPrice);
};
formType.addEventListener ('change', setMinPrice);

//синхронизация времени заезда и выезда
const timeinSelect = form.querySelector('#timein');
const timeoutSelect = form.querySelector('#timeout');

timeinSelect.addEventListener ('change', () => {
  const selectValue = timeinSelect.value;
  timeoutSelect.value = selectValue;
});

timeoutSelect.addEventListener ('change', () => {
  const selectValue = timeoutSelect.value;
  timeinSelect.value = selectValue;
});

//поля количества комнат и количества мест
const formCapacity = form.querySelector('#capacity');
const formRooms = form.querySelector('#room_number');
//кастомный валидатор
pristine.addValidator(formCapacity, (value) => {
  const roomsNumber = formRooms.value;
  switch (roomsNumber){
    case '1':
      if (value === '1') {
        return true;
      }
      break;
    case '2':
      if (value === '1' || value === '2') {
        return true;
      }
      break;
    case '3':
      if (value === '1' || value === '2' || value === '3') {
        return true;
      }
      break;
    case '100':
      if (value === '0') {
        return true;
      }
      break;
  }
  return false;
}, 'Недопустимое значение');
formRooms.addEventListener ('change', () =>{
  pristine.validate(formCapacity);
});

//отправка формы
form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});

disablePage();
enablePage();
