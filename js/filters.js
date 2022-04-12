const filters = document.querySelector('.map__filters');

const typeFilter = ((advert) => {
  const filterType = filters.querySelector('#housing-type').value;
  const advertType = advert.offer.type;
  if (filterType === 'any') {
    return true;
  }
  return filterType === advertType;
});

const priceFilter = ((advert) => {
  const filterPrice = filters.querySelector('#housing-price').value;
  const advertPrice = advert.offer.price;
  switch (filterPrice) {
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
  const filterRooms = filters.querySelector('#housing-rooms').value;
  const advertRooms = advert.offer.rooms;
  if (filterRooms === 'any'){
    return true;
  }
  return Number(filterRooms) === advertRooms;
});

const guestsFilter = ((advert) => {
  const filterGuests = filters.querySelector('#housing-guests').value;
  const advertGuests = advert.offer.guests;
  if (filterGuests === 'any'){
    return true;
  }
  return Number(filterGuests) === advertGuests;
});

const featuresFilter = ((advert) => {
  const filterFeatures = filters.querySelector('#housing-features');
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

const getFilteredArray = (originalArray) => {
  let filteredArray = originalArray.filter(typeFilter);
  filteredArray = filteredArray.filter(priceFilter);
  filteredArray = filteredArray.filter(roomsFilter);
  filteredArray = filteredArray.filter(guestsFilter);
  filteredArray = filteredArray.filter(featuresFilter);
  return filteredArray;
};

const resetFilters = () => {
  filters.reset();
};

export {getFilteredArray, resetFilters};
