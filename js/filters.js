const filters = document.querySelector('.map__filters');
const filterType = filters.querySelector('#housing-type');
const filterPrice = filters.querySelector('#housing-price');
const filterRooms = filters.querySelector('#housing-rooms');
const filterGuests = filters.querySelector('#housing-guests');
const filterFeatures = filters.querySelector('#housing-features');

//фильтры на каждую опцию фильтрации
const typeFilter = ((advert) => {
  const filterValue = filterType.value;
  const advertType = advert.offer.type;
  if (filterValue === 'any') {
    return true;
  }
  return filterValue === advertType;
});

const priceFilter = ((advert) => {
  const filterValue = filterPrice.value;
  const advertPrice = advert.offer.price;
  switch (filterValue) {
    case 'any':
      return true;
    case 'middle':
      return advertPrice <= 50000 && advertPrice >= 10000;
    case 'low':
      return advertPrice < 10000;
    case 'high':
      return advertPrice > 50000;
  }
});

const roomsFilter = ((advert) => {
  const filterValue = filterRooms.value;
  const advertRooms = advert.offer.rooms;
  if (filterValue === 'any'){
    return true;
  }
  return Number(filterValue) === advertRooms;
});

const guestsFilter = ((advert) => {
  const filterValue = filterGuests.value;
  const advertGuests = advert.offer.guests;
  if (filterValue === 'any'){
    return true;
  }
  return Number(filterValue) === advertGuests;
});

const featuresFilter = ((advert) => {
  const filterFeaturesChecked = filterFeatures.querySelectorAll('input:checked');
  const checkedArray = [];
  for (const feature of filterFeaturesChecked) {
    checkedArray.push(feature.value);
  }
  if (!checkedArray.length) {
    return true;
  }
  if ('features' in advert.offer) {
    return checkedArray.every((feature) => {
      const advertString = `-${advert.offer.features.join('-')}`;
      return advertString.includes(`-${feature}`);
    });
  }
  return false;
});

//сумма всех фильтров с массивом в результате
const getFilteredArray = (originalArray) => originalArray.filter(typeFilter).filter(priceFilter).filter(roomsFilter).filter(guestsFilter).filter(featuresFilter);

const resetFilters = () => {
  filters.reset();
};

export {getFilteredArray, resetFilters};
