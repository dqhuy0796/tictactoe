// Khởi tạo các đối tượng cần thiết

let baseBoard;
let human;
let bot;
const playerX = '<div class = "x"></div>';
const playerO = '<div class = "o"></div>';
const cells = document.querySelectorAll(".game__cell");

// Mảng lưu các tập hợp nước đi để chiến thắng

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Vui vẻ không quạo

const winTrashtalk = [
    "Thắng rồi! Khét đấy!",
    "Thắng rồi! Cũng ra gì đấy!",
    "Bạn thắng! Cũng có tý tuổi!"
];

const loseTrashtalk = [
    "Thua rồi! Hãy còn non lắm!",
    "Thua rồi! Gàààààà...",
    "Bạn thua vì bạn quá gà!",
    "Thua à, Tưởng thế nào?!",
    "Ôi bạn ơi, bạn tuổi tôm à?!",
    "Thắng được cho 10 tỷ :<"    
];

// Khi trang web được khởi tạo lần đầu, tạo trò chơi mới

window.onload = () => {
        NewGame();
}

// Chơi lại từ đầu

function Restart(){
    NewGame();
    setTimeout(() => {
        playerScore.innerHTML = "0";
        botScore.innerHTML = "0";
        player1.innerHTML = "Player 1";
        player2.innerHTML = "Player 2";
        optionOverlay.classList.remove('inactive');
    }, 300);
}

// Game mới

function NewGame() {
    // Ẩn cửa số GAMEOVER 
    gameoverOverlay.classList.add("inactive");
    // tạo mảng từ 0-8 để kiểm tra xem trò chơi đã rơi vào trường hợp GAMEOVER chưa
    baseBoard = Array.from(Array(9).keys());
    for(let i = 0; i < cells.length; i++){
        cells[i].innerHTML = "";
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", TurnClick, false);
    }
}

// Tạo các nước đi

function TurnClick(cell){
    // Nếu ô được click có id kiểu Number
    if(typeof baseBoard[cell.target.id] == "number"){
        // Người chơi đánh vào ô click
        Turn(cell.target.id, human);
        // Nếu cờ chưa hoà thì bot đánh nước tốt nhất
        if(!TieCheck()) {
            Turn(BestSpot(), bot);
        }
    }
}

// Tạo nước đi

function Turn(cellId, player){
    // Xác định ô ở vị trí nào được người chơi clicked
    baseBoard[cellId] = player;
    // Khi click thì hiện quân của người chơi đó
    document.getElementById(cellId).innerHTML = player; 
    // Kiểm tra xem nếu đủ điều kiện thắng thì GAMEOVER, nếu không thì tiếp tục
    let gameHasWinner = WinCheck(baseBoard, player);
    if(gameHasWinner){
        GameOver(gameHasWinner);
    }
}

// Kiểm tra người thắng cuộc

function WinCheck(currentBoard, player){
    // Tạo mảng tập hợp các nước đã đi của người chơi
    let plays = currentBoard.reduce( 
        (list, who, position) => (who === player) ? list.concat(position) : list,
        []);
    // Khai báo biến để lưu người chơi giành chiến thắng
    let gameHasWinner = null;
    // Lặp qua các bộ key và value của mảng winCombo bằng Array.entries()
    for (let [index, winCombo] of winCombos.entries()){
        // Kiểm tra tất cả các phần tử trong tổ hợp winCombo xem có thoả mãn nằm trong bộ nước đi của người chơi hay không
        if(winCombo.every(winValue => plays.indexOf(winValue) > -1)){
            // Nếu như tổ hợp winCombo là hợp lệ, dừng vòng lặp, xác định người thắng.
            gameHasWinner = {index: index, player: player};
            break;
        }
    }
    return gameHasWinner;
}

// Xác lập các trạng thái khi nào thì kết thúc trò chơi

function GameOver(gameHasWinner){
    // Highlight winCombo nếu có người thắng
    for(let index of winCombos[gameHasWinner.index]){
        document.getElementById(index).style.backgroundColor = (gameHasWinner.player == playerX) ? "#f9bec7" : "#d7e3fc";
    }
    // Vô hiệu hoá click sau khi gameover
    for(let i = 0; i < cells.length; i++){
        cells[i].removeEventListener("click", TurnClick, false);
    }
    // thông báo người thắng
    WhoIsWinner(gameHasWinner.player == human ? "player" : "bot");
}


// Trả về mảng đánh số thứ tự với những ô chưa được click

function EmptyCells() {
    return baseBoard.filter(baseCell => typeof baseCell == "number");
}


// Hoà thì trả về true, ngược lại trả về false

function TieCheck() {
    // Nếu tất cả các ô đã được đi hết
    if(EmptyCells().length == 0) {
        for(var i = 0; i < cells.length; i++){
            cells[i].style.backgroundColor = "#fdffb6";
            cells[i].removeEventListener("click", TurnClick, false)
        }
        // Nhận diện người thắng và đưa ra thông báo
        WhoIsWinner("Cờ hoà!");
        return true;
    }
    return false;
}

// Đưa thông báo ra màn hình ai là người thắng cuộc

function WhoIsWinner(who) {
    setTimeout(() => {
        let updateScore;
        gameoverOverlay.classList.toggle("inactive");
        switch (who) {
            case "player":
                document.querySelector(".message__text").innerHTML = winTrashtalk[Math.floor(Math.random() * winTrashtalk.length)];
                updateScore = Number(playerScore.textContent) + 1;
                playerScore.innerHTML = `${updateScore}`;
                break;
            case "bot":
                document.querySelector(".message__text").innerHTML = loseTrashtalk[Math.floor(Math.random() * loseTrashtalk.length)];
                updateScore = Number(botScore.textContent) + 1;
                botScore.innerHTML =  `${updateScore}`;
                break;
            default:
                document.querySelector(".message__text").innerHTML = who;
                break;
        }
    }, 2000);
}

// Trả về ô có id là phần tử đứng ở đầu tiên trong mảng những ô chưa được click

function BestSpot() {
    return Minimax(baseBoard, bot).index;
}

// Minimax Algorithms
function Minimax(newBoard, player) {
	var availableSpots = EmptyCells();

	if (WinCheck(newBoard, human)) {
		return {score: -10};
	} else if (WinCheck(newBoard, bot)) {
		return {score: 10};
	} else if (availableSpots.length === 0) {
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availableSpots.length; i++) {
		var move = {};
		move.index = newBoard[availableSpots[i]];
		newBoard[availableSpots[i]] = player;
		if (player == bot) {
			var result = Minimax(newBoard, human);
			move.score = result.score;
		} else {
			var result = Minimax(newBoard, bot);
			move.score = result.score;
		}
		newBoard[availableSpots[i]] = move.index;
		moves.push(move);
	}
	var bestMove;
	if(player === bot) {
		var bestScore = -99999;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 99999;
		for(var i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}