const updateGame = function() {
    selections[1].setAttribute("disabled", "true");
    selections[0].setAttribute("disabled", "true");
    if (currentPlayer.choice === undefined) {
        return;
    }
    count++;
    this.setAttribute("disabled","true");
    this.setAttribute("value", `${currentPlayer.choice}`);
    currentPlayer = getCurrentPlayer();
    winner.innerText = getWinner();
    if (getWinner() !== "You Got this!" ) {
        spots.forEach(function(spot) {
            spot.setAttribute("disabled", "true");
        })
    }
}

function getCurrentPlayer() {
    if (currentPlayer === p1) {
        return p2;
    }
    return p1;
}

// Checks for three "X"s or "O's in a line, using array indices
function getWinner() {
    // Starts at top left (horizontal, vertical, diagonal) lines
    if ((spots[0].value !== "") &&
        ((spots[0].value === spots[1].value && spots[0].value === spots[2].value)
        || (spots[0].value === spots[3].value && spots[0].value === spots[6].value)
        || (spots[0].value === spots[4].value && spots[0].value === spots[8].value))) {
            return `${spots[0].value} wins!`;
    }

    // Starts at top right (vertical, diagonal) lines
    if ((spots[2].value !== "") &&
        ((spots[2].value === spots[5].value && spots[2].value === spots[8].value)
        || (spots[2].value === spots[4].value && spots[2].value === spots[6].value))) {
            return `${spots[2].value} wins!`;
    }

    // 2nd and 3rd horizontal line
    if (spots[3].value !== "" && spots[3].value === spots[4].value && spots[3].value === spots[5].value) {
        return `${spots[3].value} wins!`;
    }
    if (spots[6].value !== "" && spots[6].value === spots[7].value && spots[6].value === spots[8].value) {
        return `${spots[6].value} wins!`;
    }
    
    // 2nd vertical line
    if (spots[1].value !== "" && spots[1].value === spots[4].value && spots[1].value === spots[7].value) {
        return `${spots[1].value} wins!`;
    }

    if (count === 9) {
        return `tie!`;
    }
    return "You Got this!";
}

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

// DOM
const table = document.createElement('div');
table.setAttribute("class", "table");
const spots = [];
for (let i = 0; i < 9; i++) {
    let btn = document.createElement('input');
    btn.setAttribute("id", "btn");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "");
    btn.setAttribute("disabled", "true")
    spots.push(btn);
    table.appendChild(btn);
}
document.body.appendChild(table);
const winner = document.querySelector("h1");
const reset = document.createElement('input');
reset.setAttribute("id", "reset");
reset.setAttribute("type", "button");
reset.setAttribute("value", "Reset")
document.body.appendChild(reset);
reset.setAttribute("disabled", "true")

// Listen for clicks on the reset button
reset.addEventListener('click', function() {
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
})

