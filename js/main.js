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

getRandomNumber (1.5, 2.5);
getRandomNumberFloating (1.5, 2.5, 3);
