//Случайное число из положительного диапазона
const getRandomNumber = function(number1, number2) {
  if (!isNaN(number1) && number1 >= 0 && !isNaN(number2) && number2 >= 0) {
    const numberBig = Math.floor(Math.max(number1, number2));
    const numberSmall = Math.ceil(Math.min(number1, number2));
    if (numberBig < numberSmall) {
      return null;
    }
    // взято из https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    return Math.floor(Math.random() * (numberBig - numberSmall + 1) + numberSmall);
  }
  return null;
};
//Случайное число с плавающей точкой из положительного диапазона
const getRandomNumberFloating = function(number1, number2, floatingLength) {
  if (!isNaN(number1) && number1 >= 0 && !isNaN(number2) && number2 >= 0 && !isNaN(floatingLength) && floatingLength >= 0) {
    const numberBig = Math.max(number1, number2);
    const numberSmall = Math.min(number1, number2);
    return Number((Math.random() * (numberBig - numberSmall) + numberSmall).toFixed(floatingLength));
  } return null;
};
//случайный элемент массива
const getRandomArrayElement = function(elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
};
//перемешивание массива, взято из https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = function(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
//создание перемешанного массива случайной длины (без повторений) из существующего массива
const getShuffledSlicedArray = function(array) {
  shuffleArray(array);
  return JSON.parse(JSON.stringify(array.slice(getRandomNumber(0, array.length - 1))));
};
//создание массива случайной длины (с повторениями) из существующего
const getNewRandomLengthArray = function(array, maxLength) {
  let newArray = [];
  for (let i = 0; i < getRandomNumber(1, maxLength); i++) {
    newArray = newArray.concat(getRandomArrayElement(array));
  }
  return newArray;
};
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
  'conditioner'
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
  for (let i = 0; i < ADVERT_ARRAY_LENGTH; i++) {
    let avatarCount = 0;
    if (i < 9) {
      avatarCount = `${0}${(i+1)}`;
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
        photos: getNewRandomLengthArray(ADVERT_PHOTOS, 20)
      }
    };
    advert.offer.address = `${advert.location.lat}, ${advert.location.lng}`;
    advertArray = advertArray.concat(advert);
  }
  return advertArray;
};

getAdvertArray();
