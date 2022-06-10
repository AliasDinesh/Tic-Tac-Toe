import Player from "./Player.js";

const players = [];
let circleTurn;
let draw = 1;
const playerNameInputField = document.querySelector(".input-field");
const addPLayerBtn = document.querySelector(".add-player-btn");
const fields = document.querySelectorAll(".board > .field");
const resetButton = document.querySelector(".reset-btn");
const showPLayerOne = document.querySelector(".player-one");
const showPLayerTwo = document.querySelector(".player-two");
const winningCombinations = [
    [fields[0], fields[1], fields[2]],
    [fields[3], fields[4], fields[5]],
    [fields[6], fields[7], fields[8]],
    [fields[0], fields[3], fields[6]],
    [fields[1], fields[4], fields[7]],
    [fields[2], fields[5], fields[8]],
    [fields[0], fields[4], fields[8]],
    [fields[2], fields[4], fields[6]]
]

//Add players function
function addPlayer() {
    if (players.length == 2) {
        alert("There are 2 players already. Press the reset button to start a new game.")
        return;
    }

    const playerName = playerNameInputField.value;
    if (playerName == "") {
        alert("Enter a name!");
        return;
    }
    let symbol = "X";
    if (players.length == 1) {
        symbol = "O";
    }
    //Create new player
    const newPlayer = new Player(playerName, symbol);
    //Add the new player to the players array
    players.push(newPlayer);

    showPLayers();
}

//This addEventListener is for the add player button
addPLayerBtn.addEventListener("click", addPlayer);

//This for-loop loops trough all the fields and adds an addEventListener to each one of them
for (let i = 0; i < fields.length; i++) {
    const fieldEl = fields[i];
    fieldEl.addEventListener("click", addSymbolToField);
}

//This addEventListener is for the reset button
resetButton.addEventListener("click", resetGame);

//Add symbol to field function
function addSymbolToField(field) {
    if (players.length == 0) {
        alert("You need to add two players to play.");
        return;
    } else if (players.length < 2) {
        alert("You need to add one more player to play.");
        return;
    }

    const fieldContent = field.target;
    if (fieldContent.textContent === 'X' || fieldContent.textContent === 'O') {
        alert('This field can not be used');
        return;
    } else {
        const currentField = circleTurn ? players[1].symbol : players[0].symbol;
        placeSymbol(fieldContent, currentField);
        swapTurns();
        checkWinner();
    }
}

//Place symbol function
function placeSymbol(field, currentField) {
   const placeSymbol =  field.textContent = currentField;
   return placeSymbol;
}

//Swap turns function
function swapTurns() {
    circleTurn = !circleTurn;
}

//Show players function
function showPLayers() {
    playerNameInputField.value = "";
    let playerText = "";

    for (let i = 0; i < players.length; i++) {
        const player = players[i];

        playerText = "Name: " + player.name + ", " + "Symbol: " + player.symbol
            + ", " + "Score: " + player.points + ", " + "Level: " + player.level;

        if (i == 0) {
            showPLayerOne.innerHTML = playerText;
        } else if (i == 1) {
            showPLayerTwo.innerHTML = playerText;
        }
    }
}

//Check winner function
function checkWinner() {
    // Winning combinations for player 1
    for (let i = 0; i < winningCombinations.length; i++) {
        if ((winningCombinations[i][0].textContent == players[0].symbol) && (winningCombinations[i][1].textContent == players[0].symbol) && 
        (winningCombinations[i][2].textContent == players[0].symbol)) {
            setTimeout(() => { alert("Player 1 has won!!"); resetBoard(); }, 1000);
            players[0].addPoints();
            draw = 0;
            showPLayers();
            return;
        }
    }
    //Winning combinations for player 2
    for (let i = 0; i < winningCombinations.length; i++) {
        if ((winningCombinations[i][0].textContent == players[1].symbol) && (winningCombinations[i][1].textContent == players[1].symbol) && 
        (winningCombinations[i][2].textContent == players[1].symbol)) {
            setTimeout(() => { alert("Player 2 has won!!"); resetBoard(); }, 1000);
            players[1].addPoints();
            draw = 0;
            showPLayers();
            return;
        }
    }
    //Check for draw
    if (draw == fields.length) {
        alert("Draw");
        resetBoard();
        draw = 1;
    } else {
        draw++;
    }
}

//Reset board function
function resetBoard() {
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        field.textContent = "";
    }
}

//Reset game function
function resetGame() {
    resetBoard();

    for (let i = 0; i <= players.length; i++) {
        players.pop();
    }

    showPLayerOne.textContent = "";
    showPLayerTwo.textContent = "";

    draw = 1;
}

console.log('File loaded');