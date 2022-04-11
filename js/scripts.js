const ONE_SECOND = 1000;

const imagesNames = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"
];

let cards, 
    currentTurnedCardsIndexes,
    cardsNumber,
    movesAmount,
    seconds,
    timerFunction,
    timerEl;

const init = function() {
    cardsNumber = Number(prompt("Com quantas cartas você deseja jogar?"));
    let isInvalidNumber = isNaN(cardsNumber) || cardsNumber % 2 !== 0 || (cardsNumber < 4 || cardsNumber > 14);
    
    while(isInvalidNumber) {
        alert("Número de cartas inválido! Insira novamente na próxima caixa de diálogo.");

        cardsNumber = Number(prompt("Com quantas cartas você deseja jogar?"));
        isInvalidNumber = isNaN(cardsNumber) || cardsNumber % 2 !== 0 || (cardsNumber < 4 || cardsNumber > 14);
    }

    currentTurnedCardsIndexes = [];
    movesAmount = 0;
    seconds = 0;
    timerEl = document.querySelector(".timer");
    timerEl.innerHTML = seconds;

    createCards();
    renderCards();
    initTimerSeconds();
}

const createCards = function() {
    cards = [];

    const shuffledCardsImages = getShuffledImages();

    shuffledCardsImages.forEach(function(imgName) {
        cards.push({
            imgName,
            turned: false
        });
    });
}

const renderCards = function() {
    document.querySelector(".game").innerHTML = cards.map(function(card, index) {
        return `<div class="card ${card.turned ? 'turned' : ''}" data-index=${index} ${!card.turned ? 'onclick="turnCard(this)' : ''}">
            <div class="back face">
                <img src="images/front.png" alt="Frente da carta">
            </div>
            <div class="front face">
                <img src="images/${card.imgName}" alt="Figura">
            </div>
        </div>`;
    }).join('\n');
}

const initTimerSeconds = function() {
    timerFunction = setInterval(function() {
        timerEl.innerHTML = ++seconds;
    }, ONE_SECOND);
}

const stopTimer = function() {
    clearInterval(timerFunction);
}

const turnCard = function(cardEl) {
    const cardIndex = Number(cardEl.dataset.index);
    cards[cardIndex].turned = true;

    cardEl.classList.add("turned");
    cardEl.removeAttribute("onclick");

    currentTurnedCardsIndexes.push(cardIndex);

    movesAmount++;

    checkCardPair();
}

const checkCardPair = function() {
    if(currentTurnedCardsIndexes.length === 2) {
        const [firstIndex, secondIndex] = currentTurnedCardsIndexes;
        const areEqual = cards[firstIndex].imgName === cards[secondIndex].imgName;

        if(areEqual) checkIfWon();
        else unturnCards(currentTurnedCardsIndexes);

        currentTurnedCardsIndexes = [];
    }
}

const checkIfWon = function() {
    const everyCardIsTurned = cards.every(function(card) {
        return card.turned;
    });

    if(everyCardIsTurned) {
        stopTimer();

        setTimeout(function() {
            alert(`Você ganhou em ${movesAmount} jogadas e em ${seconds} segundos!`); 

            askIfWantContinue();
        }, ONE_SECOND);
    }
}

const askIfWantContinue = function() {
    let userResponse;
    let responseIsInvalid;

    do {
        userResponse = prompt("Gostaria de reiniciar a partida? (sim | não)");

        if(userResponse) userResponse = userResponse.toLowerCase();

        responseIsInvalid = userResponse !== "não" && userResponse !== "sim";

        if(responseIsInvalid)
            alert("Resposta inválida! Por favor, digite 'sim' ou 'não'.");
    } while(responseIsInvalid || !userResponse);

    if(userResponse === 'sim') init();
    else alert("Obrigado por jogar Parrot Card Game! xD");
}

const unturnCards = function(cardsIndexes) {
    setTimeout(function() {
        cardsIndexes.forEach(function(cardIndex) {
            const cardEl = document.querySelector(`.card[data-index='${cardIndex}']`);
        
            cardEl.classList.remove('turned');
            cardEl.setAttribute('onclick', 'turnCard(this)');
        
            cards[cardIndex].turned = false;
        });
    }, ONE_SECOND);
}

const getShuffledImages = function() {
    const duplicatedImagesArray = duplicateArrayItems(getRandomImagesList(cardsNumber/2));

    return shuffleArray(duplicatedImagesArray);
}

const getRandomImagesList = function(imagesNumber) {
    const shuffledArray = shuffleArray(imagesNames);

    return shuffledArray.slice(0, imagesNumber);
}

const shuffleArray = function(array) {
    return array.sort(comparator);
}

const comparator = function() {
    return Math.random() - 0.5;
}

const duplicateArrayItems = function(array) {
    const target = [];

    array.forEach(function(arrayItem) {
        target.push(arrayItem);
        target.push(arrayItem);
    })

    return target;
}

init();
