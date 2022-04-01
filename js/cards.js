import {getAdvertArray} from './data.js';
const advertArray = getAdvertArray();
const cardsFragment = document.createDocumentFragment();
const cardsTemplate = document.querySelector('#card').content;
const newCardTemplate = cardsTemplate.querySelector('.popup');

//создание карточки объявления
advertArray.forEach((advert) => {
  const newCard = newCardTemplate.cloneNode(true);
  const offer = advert.offer;
  //заголовок
  newCard.querySelector('.popup__title').textContent = offer.title;
  //координаты
  newCard.querySelector('.popup__text--address').textContent = offer.address;
  //цена
  if (offer.price === undefined) {
    newCard.querySelector('.popup__text--price').textContent = '';
  } else {
    newCard.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  }
  //количество комнат и гостей
  if (offer.rooms === undefined || offer.guests === undefined){
    newCard.querySelector('.popup__text--capacity').textContent = '';
  } else {
    newCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  }
  //время заезда и выезда
  if (offer.checkin === undefined || offer.checkout === undefined){
    newCard.querySelector('.popup__text--time').textContent = '';
  } else {
    newCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  }
  //описание
  newCard.querySelector('.popup__description').textContent = offer.description;
  //тип здания
  switch (offer.type) {
    case 'flat':
      newCard.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      newCard.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      newCard.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      newCard.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'hotel':
      newCard.querySelector('.popup__type').textContent = 'Отель';
      break;
    case undefined:
      newCard.querySelector('.popup__type').textContent = '';
      break;
  }
  //доступные удобства
  const newCardFeatures = newCard.querySelectorAll('.popup__features .popup__feature');
  if (offer.features === undefined ) {
    newCardFeatures.forEach((newCardFeature) => {
      newCardFeature.remove();
    });
  } else {
    newCardFeatures.forEach((newCardFeature) => {
      const isContained = offer.features.some((arrayFeature) =>
        newCardFeature.classList.contains(`popup__feature--${arrayFeature}`)
      );
      if (!isContained) {
        newCardFeature.remove();
      }
    });
  }
  //аватарка
  const avatar = newCard.querySelector('.popup__avatar');
  avatar.src = advert.author.avatar;
  avatar.onerror = function () {
    avatar.src = 'img/avatars/default.png';
  };
  //фотографии
  const newCardPhotos = newCard.querySelector('.popup__photos');
  const newCardPhotoTemplate = newCardPhotos.querySelector('.popup__photo');
  if (offer.photos !== undefined) {
    for (let i = 0; i < offer.photos.length; i++) {
      const newCardPhoto = newCardPhotoTemplate.cloneNode(true);
      newCardPhoto.src = offer.photos[i];
      newCardPhotos.appendChild(newCardPhoto);
    }
  }
  newCardPhotoTemplate.remove();
  //подчистить пустые элементы
  for (let child = newCard.firstElementChild; child !== null;) {
    if (child.textContent.trim() === '' & 'src' in child === false & child.children === 0) {
      const childPlaceholder = child;
      child = child.nextElementSibling;
      childPlaceholder.remove();
      continue;
    }
    child = child.nextElementSibling;
  }
  //добавление карточки в фрагмент
  cardsFragment.appendChild(newCard);
});
export {cardsFragment};
