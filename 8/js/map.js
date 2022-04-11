import {enablePage, disablePage, setDigitsAfterPoint} from './util.js';
import {createAdvertArray} from './cards.js';
import {getData} from './api.js';
import {createAdvertErrorPopup} from './popups.js';

disablePage();
//инициализация карты
const map = L.map('map-canvas')
  .on('load', () => {
    enablePage();
  })
  .setView ([35.68948, 139.69171], 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//главная метка
const defaultLatLng = {
  lat: 35.68948,
  lng: 139.69171,
};

let mainLatLng = defaultLatLng;

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
const address = document.querySelector('#address');

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

const createCards = (cardsFragment) => {
  const cardsCollection = cardsFragment.children;
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
      .addTo(map)
      .bindPopup(card);
  }
};
//создание объявлений на основе полученных данных
getData(
  ((data) => {
    const cardsFragment = createAdvertArray(data);
    createCards(cardsFragment);
  }),
  (() => {
    createAdvertErrorPopup();
  })
);
//сброс карты к стандартному виду
const resetMap = () => {
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