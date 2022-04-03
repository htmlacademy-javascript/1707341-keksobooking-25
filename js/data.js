import {getRandomNumberFloating, getRandomNumber, getShuffledSlicedArray, getNewRandomLengthArray, getRandomArrayElement} from './util.js';
//массивы для взятия данных для объявлений
const ADVERT_TITLES = [
  'Мега-предложение',
  'Супер-предложение',
  'Ультра-предложение',
  'Супер-мега-предложение',
  'Ультра-мега-предложение',
  'Супер-ультра-мега-предложение'
];

const ADVERT_TYPES = [
  'palace',
  'flat',
  'bungalow',
  'hotel',
  'house'
];

const ADVERT_CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

const ADVERT_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

const ADVERT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'elevator',
  'conditioner',
  'washer'
];

const ADVERT_DESC = [
  'Невероятно прекрасный вариант',
  'Умопомрачительно прелестный выбор',
  'Незабываемо великолепный опыт',
  'Замечательно восхитительное решение',
  'Беспрецедентно уникальный набор'
];

const ADVERT_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
//длина массива предложений
const ADVERT_ARRAY_LENGTH = 10;
//пустой массив предложений
let advertArray = [];
//создание массива предложений
const getAdvertArray = () => {
  for (let i = 1; i <= ADVERT_ARRAY_LENGTH; i++) {
    let avatarCount = 1;
    if (i < 10) {
      avatarCount = `${0}${(i)}`;
    } else {
      avatarCount = i;
    }
    // создание отдельного объекта - предложения
    const advert = {
      author : {
        avatar: `img/avatars/user${avatarCount}.png`
      },
      location: {
        lat: getRandomNumberFloating(35.65, 35.7, 5),
        lng: getRandomNumberFloating(139.7, 139.8, 5)
      },
      offer: {
        title: getRandomArrayElement(ADVERT_TITLES),
        price: getRandomNumber(0, 10000000),
        type: getRandomArrayElement(ADVERT_TYPES),
        rooms: getRandomNumber(0, 100),
        guests: getRandomNumber(0,100),
        checkin: getRandomArrayElement(ADVERT_CHECKIN),
        checkout: getRandomArrayElement(ADVERT_CHECKOUT),
        features: getShuffledSlicedArray(ADVERT_FEATURES),
        description: getRandomArrayElement(ADVERT_DESC),
        photos: getNewRandomLengthArray(ADVERT_PHOTOS, 6)
      }
    };
    advert.offer.address = `${advert.location.lat}, ${advert.location.lng}`;
    advertArray = advertArray.concat(advert);
  }
  return advertArray;
};

export {getAdvertArray};
