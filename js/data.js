import {getData} from './api.js';

const arrayLength = 10;

let advertArray = [];

const getDataArray = function(data) {
  advertArray = data;
}

const sliceDataArray = function (dataArray, length) {
  const array = dataArray.slice(0, length - 1);
  return array;
};

getData(
  ((data) => {
    console.log(data);
    getDataArray(data);
    sliceDataArray(advertArray);
  }),
  ((err) => {
    console.log(err);
  })
);

console.log (advertArray);
export {advertArray};
