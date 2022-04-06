window.onload = init;

const imagesNames = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"
];
const MILLISECONDS = 1000;

let gameDivEl;
let currentTurnedCards;
let cardsNumber;
let movesAmount;

function init() {
    cardsNumber = Number(prompt("Com quantas cartas você deseja jogar?"));
    let isInvalidNumber = isNaN(cardsNumber) || cardsNumber % 2 !== 0 || (cardsNumber < 4 || cardsNumber > 14);
    
    while(isInvalidNumber) {
        alert("Número de cartas inválido! Insira novamente na próxima caixa de diálogo.");

        cardsNumber = Number(prompt("Com quantas cartas você deseja jogar?"));
        isInvalidNumber = isNaN(cardsNumber) || cardsNumber % 2 !== 0 || (cardsNumber < 4 || cardsNumber > 14);
    }

    gameDivEl = document.querySelector('.game');
    currentTurnedCards = [];
    movesAmount = 0;

    distributeCards();
}

function distributeCards() {
    const shuffledCards = getShuffledCards();
    let cardsElements = '';
    
    for(let i = 0; i < shuffledCards.length; i++) {
        cardsElements += getCardElementWithImage(shuffledCards[i]);
    }

    gameDivEl.innerHTML = cardsElements;
}

function getCardElementWithImage(imageName) {
    return `<div class="card" onclick="turnCard(this)">
        <div class="back face">
            <img src="images/front.png" alt="Frente da carta">
        </div>
        <div class="front face">
            <img src="images/${imageName}" alt="Figura">
        </div>
    </div>`;
}

function turnCard(cardEl) {
    cardEl.classList.add("turned");
    currentTurnedCards.push(cardEl);
    movesAmount++;

    checkCardPair();
}

function checkCardPair() {
    if(currentTurnedCards.length === 2) {
        const areEqual = checkIfAreEqual(currentTurnedCards);

        if(areEqual) checkIfWon();
        else unturnCards(currentTurnedCards);

        currentTurnedCards = [];
    }
}

function checkIfWon() {
    const turnedCardsAmount = gameDivEl.querySelectorAll(".turned").length;
    console.log(turnedCardsAmount);

    if(turnedCardsAmount === cardsNumber) {
        setTimeout(() => {
            alert(`Você ganhou em ${movesAmount} jogadas!`); 
        }, MILLISECONDS);
    }
}

function checkIfAreEqual(cards) {
    const cardsImages = [];

    for(let i = 0; i < cards.length; i++) {
        cardsImages.push(cards[i].querySelector('.front img').getAttribute("src"));
    }

    return cardsImages[0] === cardsImages[1];
}

function unturnCards(cards) {
    setTimeout(() => {
        for(let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("turned");
        }
    }, MILLISECONDS);
}

function getShuffledCards() {
    const duplicatedImagesArray = duplicateArrayItems(getRandomImagesList(cardsNumber/2));

    return shuffleArray(duplicatedImagesArray);
}

function getRandomImagesList(imagesNumber) {
    const shuffledArray = shuffleArray(imagesNames);

    return shuffledArray.slice(0, imagesNumber);
}

function shuffleArray(array) {
    return [...array].sort(comparator);
}

function comparator() {
    return Math.random() - 0.5;
}

function duplicateArrayItems(array) {
    const arrayOrigin = [...array];
    const target = [];

    for (let i = 0; i < arrayOrigin.length; i++) {
        target.push(arrayOrigin[i]);
        target.push(arrayOrigin[i]);
    }

    return target;
}
