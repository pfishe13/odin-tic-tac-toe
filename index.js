
// Gameboard Module Object
const Gameboard = (() => {
    let gameArray = [];
    let playCount = 0;

    const setUpEvents = () => {
        console.log(`Game Has Started with ${ player1.getName() } and ${ player2.getName() }`);
        const gameSlots = document.querySelectorAll(".game-slot");
        gameSlots.forEach(slot => { 
            slot.addEventListener('click', addToArray);
        })
    }

    const addToArray = (e) => {
        console.log(`Index ${e.srcElement.id}`);
        const index = e.srcElement.id;
        if (playCount % 2 === 0)
            gameArray[index] = player1.getName();
        else {
            gameArray[index] = player2.getName();
        }
        playCount++;

        if (playCount >= 9) 
            endGame();
        
        console.log(`Play Count: ${playCount}`);
        console.log(gameArray);
    };

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

    return { setUpEvents, addToArray, outputArray };
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
                player1.changeName(playerTwoName);
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