import {getAdvertArray} from './data.js';
const advertArray = getAdvertArray();
const cardsFragment = document.createDocumentFragment();
const cardsTemplate = document.querySelector('#card').content;
const newCardTemplate = cardsTemplate.querySelector('.popup');

//создание карточки объявления
advertArray.forEach((advert) => {
  const newCard = newCardTemplate.cloneNode(true);
  const offer = advert.offer;
  const setTextValue = function (classSelector, textValue){
    if (textValue === undefined) {
      newCard.querySelector(classSelector).remove();
    } else {
      newCard.querySelector(classSelector).textContent = textValue;
    }
  };
  //заголовок
  setTextValue('.popup__title', offer.title);
  //координаты
  setTextValue('.popup__text--address', offer.address);
  //цена
  if (offer.price === undefined) {
    setTextValue('.popup__text--price', undefined);
  } else {
    setTextValue('.popup__text--price', `${offer.price} ₽/ночь`);
  }
  //количество комнат и гостей
  if (offer.rooms === undefined || offer.guests === undefined) {
    setTextValue('.popup__text--capacity', undefined);
  } else {
    setTextValue('.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`);
  }
  //время заезда и выезда
  if (offer.checkin === undefined || offer.checkout === undefined) {
    setTextValue('.popup__text--time', undefined);
  } else {
    setTextValue('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  }
  //описание
  setTextValue('.popup__description', offer.description);
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
      newCard.querySelector('.popup__type').remove();
      break;
  }
  //доступные удобства
  const newCardFeatureList = newCard.querySelector('.popup__features');
  const newCardFeatures = newCardFeatureList.querySelectorAll('.popup__feature');
  if (offer.features === undefined ) {
    newCardFeatureList.remove();
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
      newCardPhotoTemplate.remove();
    }
  } else {
    newCardPhotos.remove();
  }
  //добавление карточки в фрагмент
  cardsFragment.appendChild(newCard);
});
export {cardsFragment};