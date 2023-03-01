function updateGame() {
    if (currentPlayer.choice === undefined) {
        return;
    }

    // Update tableState
    tableState[spots.indexOf(this)] = currentPlayer.choice;

    // Disable "X" and "O" buttons
    selections[1].setAttribute("disabled", "true");
    selections[0].setAttribute("disabled", "true");
    count++;

    // Disable current spot
    this.setAttribute("disabled","true");
    this.setAttribute("value", `${currentPlayer.choice}`);
    currentPlayer = getCurrentPlayer();
    winner.innerText = getWinner();

    // Disable all spots if the game is over
    if (getWinner() !== "You Got this!" ) {
        spots.forEach(function(spot) {
            spot.setAttribute("disabled", "true");
        })
    }
}

// Switch players
function getCurrentPlayer() {
    if (currentPlayer === p1) {
        return p2;
    }
    return p1;
}


/**
 * Visual representaion of the spots array
 * [0] [1] [2]
 * [3] [4] [5]
 * [6] [7] [8]
 * 
*/

// Check for winner
function getWinner() {
    const winningConditions = [
        // Horizontal lines
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertical lines
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal lines
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < 8; i++) {
        let winningCondition = winningConditions[i];
        let spot1 = tableState[winningCondition[0]];
        let spot2 = tableState[winningCondition[1]];
        let spot3 = tableState[winningCondition[2]];
        if (spot1 === "" || spot2 === "" || spot3 === "") {
            continue;
        }
        if (spot1 === spot2 && spot2 === spot3) {
            return `${spot1} wins!`
        }
    }
    if (count === 9) {
        return `tie!`;
    }
    return "You Got this!";
}

// Create player objects
const PlayerFactory = (playerName, choice) => {
    function getChoice() {
        if (playerName === "p1") {
            return choice;
        }
        if (playerName !== currentPlayer && choice === currentPlayer.choice) {
            if (choice !== 'X') {
                return 'X';
            }
            return 'O';
        }
        if (choice === undefined) {
            return;
        }
        return choice;
    }
    return {playerName, choice: getChoice()};
}

// Counts number of taken spots on the table
let count = 0;
let tableState = ["", "", "", "", "", "", "", "", ""];

// DOM
const table = document.createElement('div');
table.setAttribute("class", "table");
const spots = [];
for (let i = 0; i < 9; i++) {
    let btn = document.createElement('input');
    btn.setAttribute("id", "btn");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "");
    btn.setAttribute("disabled", "true");
    spots.push(btn);
    table.appendChild(btn);
}
document.body.appendChild(table);
const winner = document.querySelector("h1");

// Reset button
const reset = document.createElement('input');
reset.setAttribute("id", "reset");
reset.setAttribute("type", "button");
reset.setAttribute("value", "Reset")
document.body.appendChild(reset);
reset.setAttribute("disabled", "true")

// Listen for clicks on the reset button
reset.addEventListener('click', function() {
    tableState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = p1;
    spots.forEach(function(spot) {
        spot.removeAttribute("disabled");
        spot.setAttribute("value", "");
    });
    selections[1].removeAttribute("disabled");
    selections[0].removeAttribute("disabled");
    winner.innerText = "Good Luck!";
    count = 0;
});

let p1 = {};
let p2 = {};
let currentPlayer = {};
let selections = document.querySelectorAll('#xo');

// Listen for clicks on the "X" or "O" buttons
Array.from(selections).forEach(function(selection) {
    selection.addEventListener('click', function() {
        p1 = PlayerFactory("p1", this.value);
        currentPlayer = p1;
        p2 = PlayerFactory("p2", "O"); 
        selections[1].setAttribute("disabled", "true");
        selections[0].setAttribute("disabled", "true");
        reset.removeAttribute("disabled");
        reset.click();
    });
    
});

// Listen for clicks on the table
spots.forEach(function(spot) {
    spot.addEventListener('click', updateGame);
});

