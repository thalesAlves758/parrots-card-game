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

let cardsNumber;

function init() {
    cardsNumber = Number(prompt("Com quantas cartas você deseja jogar?"));
    let isInvalidNumber = isNaN(cardsNumber) || cardsNumber % 2 !== 0 || (cardsNumber < 4 || cardsNumber > 14);
    
    while(isInvalidNumber) {
        alert("Número de cartas inválido! Insira novamente na próxima caixa de diálogo.");

        cardsNumber = Number(prompt("Com quantas cartas você deseja jogar?"));
        isInvalidNumber = isNaN(cardsNumber) || cardsNumber % 2 !== 0 || (cardsNumber < 4 || cardsNumber > 14);
    }

    distributeCards();
}

function distributeCards() {
    const shuffledCards = getShuffledCards();
    let cardsElements = '';
    
    for(let i = 0; i < shuffledCards.length; i++) {
        cardsElements += getCardElementWithImage(shuffledCards[i]);
    }

    document.querySelector('.game').innerHTML = cardsElements;
}

function getCardElementWithImage(imageName) {
    return `<div class="card">
        <div class="back face">
            <img src="images/front.png" alt="Frente da carta">
        </div>
        <div class="front face">
            <img src="images/${imageName}" alt="Figura">
        </div>
    </div>`;
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
