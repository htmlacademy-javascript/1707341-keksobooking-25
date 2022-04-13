import {enableFilter, enableForm, disablePage, setDigitsAfterPoint, debounce} from './util.js';
import {createAdvertArray} from './cards.js';
import {getData} from './api.js';
import {createAdvertErrorPopup} from './popups.js';
import {getFilteredArray, resetFilters} from './filters.js';

const MAX_CARDS = 10;
const DEBOUNCE_DELAY = 500;
const filterForm = document.querySelector('.map__filters');
const address = document.querySelector('#address');
const defaultLatLng = {
  lat: 35.68948,
  lng: 139.69171,
};
let advertServerData = [];
let documentFragment = null;
let mainLatLng = defaultLatLng;

disablePage();

//инициализация карты
const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
  })
  .setView ([35.68948, 139.69171], 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//главная метка
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: mainLatLng.lat,
    lng: mainLatLng.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.addTo(map);

const setDigitsLatLng = (object) => {
  object.lat = setDigitsAfterPoint(object.lat, 5);
  object.lng = setDigitsAfterPoint(object.lng, 5);
};

//обновление строки координат в форме
const updateAddress = () => {
  address.value = `${mainLatLng.lat}, ${mainLatLng.lng}`;
};
updateAddress();

mainPinMarker.on('moveend',(evt) => {
  mainLatLng = evt.target.getLatLng();
  setDigitsLatLng(mainLatLng);
  updateAddress();
});

//похожие объявления
const auxPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const advertMarkerGroup = L.layerGroup().addTo(map);

const createCards = (cardsFragment) => {
  const cardsCollection = cardsFragment.children;
  advertMarkerGroup.clearLayers();
  for (const card of cardsCollection){
    const lat = card.querySelector('.popup__lat').textContent;
    const lng = card.querySelector('.popup__lng').textContent;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        auxPinIcon,
      },
    );
    marker
      .addTo(advertMarkerGroup)
      .bindPopup(card);
  }
};

//создание объявлений на основе полученных данных
//обновление фрагмента с данными
const modifyDocumentFragment = (array) => {
  documentFragment = createAdvertArray(array, MAX_CARDS);
};

//получение данных с сервера и первая настройка карты
getData(
  ((data) => {
    advertServerData = data;
    enableFilter();
    const filteredData = advertServerData;
    modifyDocumentFragment(filteredData);
    createCards(documentFragment);
  }),
  (() => {
    createAdvertErrorPopup();
  })
);

//обновление меток на карте в соответствии с фильтрами
const changeCards = (dataArray) => {
  const filteredArray = getFilteredArray(dataArray);
  modifyDocumentFragment(filteredArray);
  createCards(documentFragment);
};

//добавление фильтру обработчика и устранение дребезга
const setMapFilters = (cb) => {
  filterForm.addEventListener('change', () => {
    map.closePopup();
    cb();
  });
};

setMapFilters(debounce(
  () => {
    changeCards(advertServerData);
  },
  DEBOUNCE_DELAY,
));

//сброс карты к стандартному виду
const resetMap = () => {
  resetFilters();
  changeCards(advertServerData);
  mainLatLng = defaultLatLng;
  mainPinMarker.setLatLng({
    lat: defaultLatLng.lat,
    lng: defaultLatLng.lng,
  });
  updateAddress();
  map.closePopup();
  map.setView([defaultLatLng.lat, defaultLatLng.lng], 10);
};

export {resetMap};
