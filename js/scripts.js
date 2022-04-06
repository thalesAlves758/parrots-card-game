window.onload = handleLoad;

let cardsNumber;

function handleLoad() {
    cardsNumber = Number(prompt("Com quantas cartas você deseja jogar?"));
    let isInvalidNumber = isNaN(cardsNumber) || cardsNumber % 2 !== 0 || (cardsNumber < 4 || cardsNumber > 14);
    
    while(isInvalidNumber) {
        alert("Número de cartas inválido! Insira novamente na próxima caixa de diálogo.");

        cardsNumber = Number(prompt("Com quantas cartas você deseja jogar?"));
        isInvalidNumber = isNaN(cardsNumber) || cardsNumber % 2 !== 0 || (cardsNumber < 4 || cardsNumber > 14);
    }
}
