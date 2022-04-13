const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter = filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const featuresFilter = filters.querySelector('#housing-features');
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

//фильтры на каждую опцию фильтрации
const filterType = ((advert) => {
  const filterValue = typeFilter.value;
  const advertType = advert.offer.type;
  if (filterValue === 'any') {
    return true;
  }
  return filterValue === advertType;
});

const filterPrice = ((advert) => {
  const filterValue = priceFilter.value;
  const advertPrice = advert.offer.price;
  switch (filterValue) {
    case 'any':
      return true;
    case 'middle':
      return advertPrice <= HIGH_PRICE && advertPrice >= LOW_PRICE;
    case 'low':
      return advertPrice < LOW_PRICE;
    case 'high':
      return advertPrice > HIGH_PRICE;
  }
});

const filterRooms = ((advert) => {
  const filterValue = roomsFilter.value;
  const advertRooms = advert.offer.rooms;
  if (filterValue === 'any'){
    return true;
  }
  return Number(filterValue) === advertRooms;
});

const filterGuests = ((advert) => {
  const filterValue = guestsFilter.value;
  const advertGuests = advert.offer.guests;
  if (filterValue === 'any'){
    return true;
  }
  return Number(filterValue) === advertGuests;
});

const filterFeatures = ((advert) => {
  const checkedFeaturesFilter = featuresFilter.querySelectorAll('input:checked');
  const checkedFeatures = [];
  for (const feature of checkedFeaturesFilter) {
    checkedFeatures.push(feature.value);
  }
  if (!checkedFeatures.length) {
    return true;
  }
  if ('features' in advert.offer) {
    return checkedFeatures.every((feature) => {
      const advertString = `-${advert.offer.features.join('-')}`;
      return advertString.includes(`-${feature}`);
    });
  }
  return false;
});

//сумма всех фильтров с массивом в результате
const getFilteredArray = (originalArray) => originalArray.filter(filterType).filter(filterPrice).filter(filterRooms).filter(filterGuests).filter(filterFeatures);

const resetFilters = () => {
  filters.reset();
};

export {getFilteredArray, resetFilters};
