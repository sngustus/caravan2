import { Deck, Hand, Caravan, Card } from './objects.js';



//setup
let playerDeck = new Deck();
let playerHand = new Hand(playerDeck);
let draggedCard = null;

const playerHandDiv = document.getElementById('player-hand');
//deal hand
playerHand.cards.forEach((card, index) => {
    const cardImg = document.createElement('img');
    cardImg.src = card.imgSrc;
    cardImg.alt = `Card ${index + 1}`;
    cardImg.classList.add('card');
    playerHandDiv.appendChild(cardImg);
});


//new game
document.addEventListener('DOMContentLoaded', () => {
    const newGameButton = document.getElementById('new-game');
    const menuDiv = document.getElementById('menu');
    const gameDiv = document.getElementById('playing-area');

    newGameButton.addEventListener('click', () => {
        menuDiv.style.display = 'none';
        gameDiv.style.display = 'block';
    });

    //event listeners for player hand cards
    const handCards = playerHandDiv.querySelectorAll('.card');
    handCards.forEach((cardImg, index) => {
        cardImg.addEventListener('dragstart', (e) => {
            draggedCard = playerHand.cards[index];
        });
    });

    //event listeners for caravans
    const caravans = document.querySelectorAll('.caravan');
    caravans.forEach(caravan => {
        caravan.addEventListener('drop', () => {
            if (draggedCard) {
                caravan.cards.push(draggedCard); //add card to caravan
                playerHand.cards = playerHand.cards.filter(c => c !== draggedCard); //remove card from hand
                console.log('Card played:', draggedCard); //for testing
                draggedCard = null;

                caravan.evaluateCaravan(0); //evaluate caravan after card is played
            }});
    });

});

