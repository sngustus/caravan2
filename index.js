import { Deck, Hand, Caravan, Card } from './objects.js';



//setup
let playerDeck = new Deck();
let playerHand = new Hand(playerDeck);
let draggedCard = null;

// Create Caravan objects for each slot
let playerCaravans = [
    new Caravan(0, 'player'),
    new Caravan(1, 'player'),
    new Caravan(2, 'player')
];

let opponentCaravans = [
    new Caravan(0, 'opponent'),
    new Caravan(1, 'opponent'),
    new Caravan(2, 'opponent')
];


//new game
document.addEventListener('DOMContentLoaded', () => {
    const newGameButton = document.getElementById('new-game');
    const menuDiv = document.getElementById('menu');
    const gameDiv = document.getElementById('playing-area');
    const playerHandDiv = document.getElementById('player-hand');

    newGameButton.addEventListener('click', () => {
        menuDiv.style.display = 'none';
        gameDiv.style.display = 'block';
        renderHand();
    });

    //event listeners for caravans
    const caravanSlots = document.querySelectorAll('#player-caravan .caravan-slot');
    caravanSlots.forEach((caravanElement, index) => {
        caravanElement.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        caravanElement.addEventListener('drop', () => {
            if (draggedCard) {
                const caravan = playerCaravans[index]; // Get the actual Caravan object
                caravan.cards.push(draggedCard); //add card to caravan
                playerHand.cards = playerHand.cards.filter(c => c !== draggedCard); //remove card from hand
                playerHand.drawCards(1); //draw a new card
                renderHand();
                console.log('Card played:', draggedCard); //for testing
                draggedCard = null;

                caravan.evaluateCaravan(0); //evaluate caravan after card is played
                console.log('Caravan status:', caravan); //for testing
            }});
    });

});



//render hand
function renderHand() {
    const playerHandDiv = document.getElementById('player-hand');
    playerHandDiv.innerHTML = ''; // Clear existing cards
        playerHand.cards.forEach((card, index) => {
            const cardImg = document.createElement('img');
            cardImg.src = card.imgSrc;
            cardImg.alt = `Card ${index + 1}`;
            cardImg.classList.add('card');
            cardImg.draggable = true;
            playerHandDiv.appendChild(cardImg);
        });

    //event listeners for player hand cards
    const handCards = playerHandDiv.querySelectorAll('.card');
    handCards.forEach((cardImg, index) => {
        cardImg.addEventListener('dragstart', (e) => {
            draggedCard = playerHand.cards[index];
        });
    });
    }