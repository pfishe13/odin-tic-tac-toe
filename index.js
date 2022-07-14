
// Gameboard Module Object
const Gameboard = (() => {
    let gameArray = [];
    let playCount = 0;
    let winnerPlayer;

    const setUpEvents = () => {
        playCount = 0;
        gameArray = [];
        winnerPlayer = null;
        const gameScreen = document.querySelector('.game-screen');
        gameScreen.style.display = "flex";

        const gameboardDiv = document.querySelector('#game-board');
        for(let i = 0; i < 9; i++) {
            const gameSlot = document.createElement('div');
            gameSlot.classList.add("game-slot");
            gameSlot.id =`${i}`;
            gameboardDiv.appendChild(gameSlot);
            gameSlot.addEventListener('click', gameTurn);
        }

        const playerHeaders = document.querySelectorAll('h3');
        playerHeaders[1].textContent = `${player1.getName()}`;
        playerHeaders[2].textContent = `${player2.getName()}`;

        displayWhoseTurn();

        const introDiv = document.querySelector('.introduction');
        introDiv.style.display = "none";
        // console.log(`Game Has Started with ${ player1.getName() } and ${ player2.getName() }`);
    }

    const randomMessage = () => {
        const num = Math.floor(Math.random() * 4); // random number from 0 to 3
        if (num === 0) return "Waiting on you!";
        if (num === 1) return "It's your turn.";
        if (num === 2) return "Slow poke...";
        if (num === 3) return "You're up!";
    }

    const displayWhoseTurn = (player) => {
        const currentText = document.createElement('h2');
        currentText.textContent = randomMessage();

        if (playCount % 2 !== 0) {
            const notPlayerTurn = document.querySelector(".player1");
            const header = notPlayerTurn.querySelector("h2");
            header.remove();

            const playerTurn = document.querySelector(".player2");
            playerTurn.appendChild(currentText);
        } else {
            const notPlayerTurn = document.querySelector(".player2");
            const header = notPlayerTurn.querySelector("h2");
            if (header !== null) header.remove();

            const playerTurn = document.querySelector(".player1");
            playerTurn.appendChild(currentText);
        }

    }

    const addToArray = (gameboardSlot, index) => {
        if (playCount % 2 !== 0) {
            gameArray[index] = player1.getName();
            gameboardSlot.innerHTML = `<img class="mark" src = "/circle-outline-svgrepo-com.svg" alt="O"/>`
            displayWhoseTurn();
        } else {
            gameArray[index] = player2.getName();
            gameboardSlot.innerHTML = `<img class="mark" src = "/x-svgrepo-com.svg" alt="X"/>`;
            displayWhoseTurn();
        }
        gameboardSlot.classList.add('clicked');
    }

    const gameTurn = (e) => {
        const index = e.srcElement.id;
        const gameboardSlot = document.getElementById(index);
        if (gameboardSlot !== null) {
            playCount++;
            addToArray(gameboardSlot, index);
            if (playCount >= 9) 
                endGame();

            if (playCount >= 3) {
                checkForWinner();
            }
        }
    };

    const findWinner = (stringName) => {
        if (player1.getName() === stringName) return player1;
        if (player2.getName() === stringName) return player2;
    }

    const checkForWinner = () => {
        if (gameArray[0] !== undefined & (gameArray[0] === gameArray[1]) & (gameArray[1] === gameArray[2])) {
            winnerPlayer = findWinner(gameArray[0]);
        }
        if (gameArray[3] !== undefined & gameArray[3] === gameArray[4] & gameArray[4] === gameArray[5]) {
            winnerPlayer = findWinner(gameArray[3]);
        }
        if (gameArray[6] !== undefined & gameArray[6] === gameArray[7] & gameArray[7] === gameArray[8]) {
            winnerPlayer = findWinner(gameArray[6]);
        }
        if (gameArray[0] !== undefined & gameArray[0] === gameArray[3] & gameArray[3] === gameArray[6]) {
            winnerPlayer = findWinner(gameArray[0]);
        }
        if (gameArray[1] !== undefined & gameArray[1] === gameArray[4] & gameArray[4] === gameArray[7]) {
            winnerPlayer = findWinner(gameArray[1]);
        }
        if (gameArray[2] !== undefined & gameArray[2] === gameArray[5] & gameArray[5] === gameArray[8]) {
            winnerPlayer = findWinner(gameArray[2]);
        }
        if (gameArray[0] !== undefined & gameArray[0] === gameArray[4] & gameArray[4] === gameArray[8]) {
            winnerPlayer = findWinner(gameArray[0]);
        }
        if (gameArray[2] !== undefined & gameArray[2] === gameArray[4] & gameArray[4] === gameArray[6]) {
            winnerPlayer = findWinner(gameArray[2]);
        }

        if ((winnerPlayer) || (playCount > 8)) {
            endGame();
        }

    }

    const clearBoard = () => {
        const board = document.querySelector('.game-screen');
        board.style.display = "none";

        const notPlayerTurn = document.querySelectorAll("h2");
        for (let i = 0; i < notPlayerTurn.length; i++) {
            notPlayerTurn[i].remove();
        }

        const gameboard = board.querySelector('#game-board');
        while(gameboard.firstChild) {
            gameboard.removeChild(gameboard.firstChild);
        }
    }

    const showIntro = () => {
        const introDiv = document.querySelector('.introduction');
        const title = introDiv.querySelector('h1');
        if (winnerPlayer!== null)
            title.textContent = `${winnerPlayer.getName()} won!`
        else 
            title.textContent = `Cats Game!`
        const button = introDiv.querySelector('button');
        button.textContent = `Play Again`;
        introDiv.style.display = "flex";
    }

    const endGame = () => {

        showIntro();
        clearBoard();
    }

    return { setUpEvents };
})();

// Display Controller Module Object 
const GameController = (() => {
    const initialize = () => {
        let form = document.getElementById('get-player-info');
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            let playerOneName = document.getElementById('player1').value;
            let playerTwoName = document.getElementById('player2').value;

            if (playerOneName !== "") {
                player1.changeName(playerOneName);
            }
            if (playerTwoName !== "") {
                player2.changeName(playerTwoName);
            }

            Gameboard.setUpEvents();
        });
    }

    return { initialize };

})();

// Player Factory Function
const Player = (name) => {
    let playerName = name;
    const getName = () => playerName;
    const changeName = (newName) => {
        playerName = newName;
    }
    return { getName, changeName };
};

GameController.initialize();
const player1 = Player('Player 1');
const player2 = Player('Player 2');