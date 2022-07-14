
// Gameboard Module Object
const Gameboard = (() => {
    let gameArray = [];
    let playCount = 0;
    let winnerPlayer;

    const setUpEvents = () => {
        console.log(`Game Has Started with ${ player1.getName() } and ${ player2.getName() }`);
        const gameSlots = document.querySelectorAll(".game-slot");
        gameSlots.forEach(slot => { 
            slot.addEventListener('click', gameTurn);
        })
    }

    const addToArray = (index) => {
        const gameboardSlot = document.getElementById(index);
        if (playCount % 2 === 0) {
            gameArray[index] = player1.getName();
            gameboardSlot.innerHTML = `<img class="mark" src = "/circle-outline-svgrepo-com.svg" alt="O"/>`
        } else {
            gameArray[index] = player2.getName();
            gameboardSlot.innerHTML = `<img class="mark" src = "/x-svgrepo-com.svg" alt="X"/>`
        }
    }

    const gameTurn = (e) => {
        //console.log(`Index ${e.srcElement.id}`);
        const index = e.srcElement.id;

        addToArray(index);

        playCount++;

        if (playCount >= 9) 
            endGame();

        if (playCount >= 3) {
            checkForWinner();
        }
    };

    const findWinner = (stringName) => {
        console.log(`Winner: ${stringName}`);
        if (player1.getName() === stringName) return player1;
        if (player2.getName() === stringName) return player2;
    }

    const checkForWinner = () => {
        if (gameArray[0] !== undefined & (gameArray[0] === gameArray[1]) & (gameArray[1] === gameArray[2])) {
            console.log(`Winner in first row`);
            winnerPlayer = findWinner(gameArray[0]);
        }
        if (gameArray[3] !== undefined & gameArray[3] === gameArray[4] & gameArray[4] === gameArray[5]) {
            console.log(`Winner in second row`);
            winnerPlayer = findWinner(gameArray[3]);
        }
        if (gameArray[6] !== undefined & gameArray[6] === gameArray[7] & gameArray[7] === gameArray[8]) {
            console.log(`Winner in third row`);
            winnerPlayer = findWinner(gameArray[6]);
        }
        if (gameArray[0] !== undefined & gameArray[0] === gameArray[3] & gameArray[3] === gameArray[6]) {
            console.log(`Winner in first column`);
            winnerPlayer = findWinner(gameArray[0]);
        }
        if (gameArray[1] !== undefined & gameArray[1] === gameArray[4] & gameArray[4] === gameArray[7]) {
            console.log(`Winner in second column`);
            winnerPlayer = findWinner(gameArray[1]);
        }
        if (gameArray[2] !== undefined & gameArray[2] === gameArray[5] & gameArray[5] === gameArray[8]) {
            console.log(`Winner in third column`);
            winnerPlayer = findWinner(gameArray[2]);
        }
        if (gameArray[0] !== undefined & gameArray[0] === gameArray[4] & gameArray[4] === gameArray[8]) {
            console.log(`Winner in diagonal`);
            winnerPlayer = findWinner(gameArray[0]);
        }
        if (gameArray[2] !== undefined & gameArray[2] === gameArray[4] & gameArray[4] === gameArray[6]) {
            console.log(`Winner in diagonal`);
            winnerPlayer = findWinner(gameArray[2]);
        }

        if (winnerPlayer) endGame();

    }

    const outputArray = () => {
        for(let i = 0; i < gameArray.length; i++) {
            console.log(`${gameArray[i]} at Index ${i}`);
        }
    }

    const endGame = () => {
        const board = document.getElementById('game-board');
        console.log(board);
        board.style.display = "none";
    }

    return { setUpEvents, outputArray };
})();

// Display Controller Module Object 
const GameController = (() => {
    const initialize = () => {
        let form = document.getElementById('getPlayerInfo');
        console.log(form);
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

    return { initialize }

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