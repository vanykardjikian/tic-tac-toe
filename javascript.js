/**const Gameboard = (() => {
    const gameboard = ['x', 'o', 'x', 'o', 'o', 'x', 'x', 'o', 'x'];
    const add = function() {
        console.log("work")
    }
    return {add,}
})();**/

const updateGame = function() {
    if (currentPlayer.choice === undefined) {
        return;
    }
    count++;
    this.setAttribute("disabled","true");
    this.setAttribute("value", `${currentPlayer.choice}`);
    currentPlayer = getCurrentPlayer();
    console.log(getWinner());
    winner.innerText = getWinner();
    if (getWinner() !== "You Got this!" ) {
        spots.forEach(function(spot) {
            spot.setAttribute("disabled", "true")
        })
    }
}

function getCurrentPlayer() {
    if (currentPlayer === p1) {
        return p2
    }
    return p1;
}

function getWinner() {
    // Top left
    if (spots[0].value !== "") {
        if (spots[0].value === spots[1].value && spots[0].value === spots[2].value) {
            return `${spots[0].value} wins!`
        }
        if (spots[0].value === spots[3].value && spots[0].value === spots[6].value) {
            return `${spots[0].value} wins!`
        }
        if (spots[0].value === spots[4].value && spots[0].value === spots[8].value) {
            return `${spots[0].value} wins!`
        }
    }

    // Top right
    if (spots[2].value !== "") {
        if (spots[2].value === spots[5].value && spots[2].value === spots[8].value) {
            return `${spots[2].value} wins!`
        }
        if (spots[2].value === spots[4].value && spots[2].value === spots[6].value) {
            return `${spots[2].value} wins!`
        }
    }


    if (spots[3].value !== "" && spots[3].value === spots[4].value && spots[3].value === spots[5].value) {
        return `${spots[3].value} wins!`
    }
    if (spots[6].value !== "" && spots[6].value === spots[7].value && spots[6].value === spots[8].value) {
        return `${spots[6].value} wins!`
    }
    
    if (spots[1].value !== "" && spots[1].value === spots[4].value && spots[1].value === spots[7].value) {
        return `${spots[1].value} wins!`
    }

    if (count === 9) {
        return `tie!`
    }
    return "You Got this!"
}

const PlayerFactory = (playerName, choice) => {
    return {choice, playerName};
};


let count = 0;

const table = document.createElement('div');
table.setAttribute("class", "table");
const spots = [];
for (let i = 0; i < 9; i++) {
    let btn = document.createElement('input');
    btn.setAttribute("id", "btn");
    btn.setAttribute("type", "button");
    btn.setAttribute("value", "");
    spots.push(btn);
    table.appendChild(btn);
}

document.body.appendChild(table);
const winner = document.querySelector("h1");
let reset = document.createElement('input');
reset.setAttribute("id", "reset");
reset.setAttribute("type", "button");
reset.setAttribute("value", "Reset")
document.body.appendChild(reset);
reset.addEventListener('click', function() {
    spots.forEach(function(spot) {
    spot.removeAttribute("disabled");
    spot.setAttribute("value", "")
    });
    winner.innerText = "Good Luck!"
    count = 0;
});


const p1 = PlayerFactory("p1", "X");
const p2 = PlayerFactory("p2", "O");
let currentPlayer = p1;
const selections = Array.from(document.querySelectorAll('button', 'selection'));
selections.forEach(function(selection) {
    selection.addEventListener('click', function() {
        currentPlayer.choice = this.value;
        console.log(currentPlayer.choice);
        return currentPlayer.choice;
    });
});

spots.forEach(function(spot) {
    spot.addEventListener('click', updateGame);
})

