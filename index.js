import { Deck, Hand, Caravan, Card } from './objects.js';



//setup
let playerDeck = new Deck();
let playerHand = new Hand(playerDeck);

const playerHandDiv = document.getElementById('player-hand');
playerHand.cards.forEach((card, index) => {
    const cardImg = document.createElement('img');
    cardImg.src = card.imgSrc;
    cardImg.alt = `Card ${index + 1}`;
    playerHandDiv.appendChild(cardImg);
});


//new game
document.addEventListener('DOMContentLoaded', () => {
    const newGameButton = document.getElementById('new-game');
    const menuDiv = document.getElementById('menu');
    const gameDiv = document.getElementById('playing-area');

    newGameButton.addEventListener('click', () => {
        menuDiv.style.visibility = 'hidden';
        gameDiv.style.visibility = 'visible';
    });

});
