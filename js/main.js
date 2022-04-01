import {cardsFragment} from './cards.js';
//тестовая первая карточка
const testCard = cardsFragment.firstChild;
const canvas = document.querySelector('#map-canvas');
canvas.appendChild(testCard);
