//Случайное число из положительного диапазона
const getNumber = function(number1, number2) {
  if (!isNaN(number1) && number1 >= 0 && !isNaN(number2) && number2 >= 0) {
    if (number2 >= number1 && Math.floor(number2) >= Math.ceil (number1)) {
      // взято из https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      number1 = Math.ceil(number1);
      number2 = Math.floor(number2);
      return Math.floor(Math.random() * (number2 - number1 + 1) + number1);
    }
    else if (number2 >= number1 && Math.floor(number2) < Math.ceil (number1)) {
      return 'Целых чисел в диапазоне нет';
    }
    else if (number1 > number2 && Math.floor(number1) >= Math.ceil (number2)) {
      number2 = Math.ceil(number2);
      number1 = Math.floor(number1);
      return Math.floor(Math.random() * (number1 - number2 + 1) + number2);
    }
    else if (number1 > number2 && Math.floor(number1) < Math.ceil (number2)) {
      return 'Целых чисел в диапазоне нет';
    }
  } return 'Принимаются только положительные числа';
};
//Случайное число с плавающей точкой из положительного диапазона
const getNumberFloating = function(number1, number2, floatingLength) {
  if (!isNaN(number1) && number1 >= 0 && !isNaN(number2) && number2 >= 0 && !isNaN(floatingLength) && floatingLength >= 0) {
    if (number2 >= number1) {
      return (Math.random() * (number2 - number1) + number1).toFixed(floatingLength);
    }
    return (Math.random() * (number1 - number2) + number2).toFixed(floatingLength);
  } return 'Принимаются только положительные числа';
};

console.log('Случайное целое число: ', getNumber(1, 2));
console.log('Случайное число с плавающей точкой: ', getNumberFloating(1.3, 2.5, 4));
