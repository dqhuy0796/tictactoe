// NEW GAME

const optionOverlay = document.querySelector(".option");
const optionForm = document.getElementById("option-form");
const playerName = optionForm["player-name"];
const selectTurn = optionForm["radio-player"];
const difficulty = optionForm["radio-difficulty-level"];

const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

optionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    player1.querySelector(".player__name").innerText = isNullOrWhitespace(playerName.value) ? "Một chú gà" : playerName.value;
    player1.querySelector(".player__img .avatar").innerHTML = `<img src="${humanPlayers[difficulty.value].avatarUrl}" alt="${isNullOrWhitespace(playerName.value) ? "Một chú gà" : playerName.value}">`;
    
    player2.querySelector(".player__name").innerText = botPlayers[difficulty.value].name;
    player2.querySelector(".player__img .avatar").innerHTML = `<img src="${botPlayers[difficulty.value].avatarUrl}" alt="${botPlayers[difficulty.value].name}">`;
    player2.querySelector(".player__level").innerHTML = botPlayers[difficulty.value].level;
    
    playerMark(selectTurn.value);

    level = difficulty.value;
    
    optionOverlay.classList.toggle("inactive");
});

const botPlayers = [
    {
        avatarUrl: "./source/image/pawn.jpg",
        level: `<i class="pawn fas fa-chess-pawn"></i>`,
        name: "Vô danh tiểu tốt",
    },
    {
        avatarUrl: "./source/image/rook.jpg",
        level: `<i class="rook fas fa-chess-rook"></i>`,
        name: "Thạch chiến xa",
    },
    {
        avatarUrl: "./source/image/crab-queen.jpg",
        level: `<i class="queen fas fa-chess-queen"></i>`,
        name: "Hoài chíp chíp",
    }
]

const humanPlayers = [
    {
        avatarUrl: "./source/image/lv-1.jpg",
    },
    {
        avatarUrl: "./source/image/lv-2.jpg",
    },
    {
        avatarUrl: "./source/image/lv-3.jpg",
    }
]

function isNullOrWhitespace(input) {
    return !input || !input.trim();
}

function playerMark(mark) {
    if(mark == "x"){
        human = playerX;
        bot = playerO;
        player1.classList.remove("player-o");
        player1.classList.add("player-x");

        player2.classList.remove("player-x");
        player2.classList.add("player-o");
    } else {
        human = playerO;
        bot = playerX;
        player2.classList.remove("player-o");
        player2.classList.add("player-x");

        player1.classList.remove("player-x");
        player1.classList.add("player-o");
    }
}

// GAME OVER
const gameoverOverlay = document.querySelector(".gameover");
const btnContinue   = document.querySelector(".message__btn.continue");
const btnRestart    = document.querySelector(".message__btn.restart");
const playerScore   = document.querySelector("#player1 .player__score span");
const botScore      = document.querySelector("#player2 .player__score span");

