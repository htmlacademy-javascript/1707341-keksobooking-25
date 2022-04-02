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
  const newArray = [];
  const randomLength = getRandomNumber(1, maxLength);
  for (let i = 0; i < randomLength; i++) {
    newArray.push(getRandomArrayElement(array));
  }
  return newArray;
};

export {getRandomNumberFloating, getRandomNumber, getShuffledSlicedArray, getNewRandomLengthArray, getRandomArrayElement};
