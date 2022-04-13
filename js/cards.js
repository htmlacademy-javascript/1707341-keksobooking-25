const cardsTemplate = document.querySelector('#card').content;
const newCardTemplate = cardsTemplate.querySelector('.popup');

//создание карточки объявления
const createAdvertArray = (dataArray, length) => {
  const cardsFragment = document.createDocumentFragment();
  if (dataArray.length > length){
    dataArray = dataArray.slice(0, length);
  }
  dataArray.forEach((advert) => {
    const newCard = newCardTemplate.cloneNode(true);
    const offer = advert.offer;
    const newCardFeatureList = newCard.querySelector('.popup__features');
    const newCardFeatures = newCardFeatureList.querySelectorAll('.popup__feature');
    const avatar = newCard.querySelector('.popup__avatar');
    const newCardPhotos = newCard.querySelector('.popup__photos');
    const newCardPhotoTemplate = newCardPhotos.querySelector('.popup__photo');
    const setTextValue = (classSelector, textValue) => {
      if (!textValue) {
        newCard.querySelector(classSelector).remove();
      } else {
        newCard.querySelector(classSelector).textContent = textValue;
      }
    };
    //заголовок
    setTextValue('.popup__title', offer.title);
    //координаты
    setTextValue('.popup__text--address', offer.address);
    setTextValue('.popup__lng', advert.location.lng);
    setTextValue('.popup__lat', advert.location.lat);
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
      let roomsText = '';
      let guestsText = '';
      switch(offer.rooms) {
        case 1:
          roomsText = `${offer.rooms} комната `;
          break;
        case 100:
          roomsText = `${offer.rooms} комнат `;
          break;
        default:
          roomsText = `${offer.rooms} комнаты `;
      }
      switch(offer.guests) {
        case 0:
          guestsText = 'не для гостей';
          break;
        case 1:
          guestsText = `для ${offer.guests} гостя`;
          break;
        default:
          guestsText = `для ${offer.guests} гостей`;
      }
      setTextValue('.popup__text--capacity', `${roomsText}${guestsText}`);
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
    const getType = (source) => {
      switch (source) {
        case 'flat':
          return 'Квартира';
        case 'bungalow':
          return 'Бунгало';
        case 'house':
          return 'Дом';
        case 'palace':
          return 'Дворец';
        case 'hotel':
          return 'Отель';
        default:
          return '';
      }
    };
    setTextValue('.popup__type', getType(offer.type));
    //доступные удобства
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
    avatar.src = advert.author.avatar;
    avatar.onerror = () => {
      avatar.src = 'img/avatars/default.png';
    };
    //фотографии
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
  return cardsFragment;
};

export {createAdvertArray};
