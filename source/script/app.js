let chatbox = document.querySelector(".chatbox")
function ToggleChatbox(){
    chatbox.style.display = (chatbox.style.display === "none") ? "block" : "none";
}

// NEW GAME

const optionOverlay = document.querySelector(".option");
const optionForm = document.getElementById("option-form");
const playerName = optionForm["player-name"];
const selectTurn = optionForm["radio-player"];
const difficulty = optionForm["radio-difficulty-level"];

const player1 = document.querySelector(".player1 .name");
const player2 = document.querySelector(".player2 .name");

optionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    player1.innerHTML = isNullOrWhitespace(playerName.value) ? "Một chú gà" : playerName.value;
    player2.innerHTML = selectDifficulty(Number(difficulty.value));
    playerMark(selectTurn.value);
    optionOverlay.classList.toggle("inactive");
});

function selectDifficulty(level) {
    switch (level) {
        case 1:
            return "Mai Nam \"Bomman\" Hải";
        case 2:
            return "Nguyễn Hữu \"70\" Đa";
        case 3:
            return "Nguyễn Thị \"Chíp\" Hoài";
        default:
            return "bot";
    }
}

function isNullOrWhitespace(input) {
    return !input || !input.trim();
}

function playerMark(mark) {
    if(mark == "x"){
        human = playerX;
        bot = playerO;
    } else {
        human = playerO;
        bot = playerX;
    }
}

// GAME OVER
const gameoverOverlay = document.querySelector(".gameover");
const btnContinue   = document.querySelector(".message__btn.continue");
const btnRestart    = document.querySelector(".message__btn.restart");
const playerScore   = document.querySelector(".score__item.player-score");
const botScore      = document.querySelector(".score__item.bot-score");

