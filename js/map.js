import {enablePage, disablePage, setDigitsAfterPoint} from './form-util.js';
import {createAdvertArray} from './cards.js';
import {getData} from './api.js';
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
let mainLatLng = {
  lat: 35.68948,
  lng: 139.69171,
};

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

const setDigitsLatLng = function (object) {
  object.lat = setDigitsAfterPoint(object.lat, 5);
  object.lng = setDigitsAfterPoint(object.lng, 5);
};

//обновление строки координат в форме
const address = document.querySelector('#address');

const updateAddress = function() {
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

const createCards = function (cardsFragment){
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

getData(
  ((data) => {
    const cardsFragment = createAdvertArray(data);
    createCards(cardsFragment);
  }),
  ((err) => {
    console.log(err);
  })
);
