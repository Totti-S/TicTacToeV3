import "./styles.css";
// jQuary things are nice
var $ = function (id) {
  return document.getElementById(id);
};

// First we make the gameboard, timebar and misc setup
var board = document.createElement("div");
board.classList.add("container");
document.body.prepend(board);
var table = document.createElement("table");
var size = 5; // How large is our board (X*X)
var activePlayer = "X";
var bar = document.createElement("div");
bar.classList.add("progress");
bar.style.heigth = "20px";
document.body.append(bar);

// Timer for game stalling reasons. Every 10s, if move isn't made, other player gets turn
var time = 0;
var timer = setInterval(() => {
  bar.style.width = String(time + "%");
  if (time === 100) {
    if (activePlayer === "X") {
      activePlayer = "O";
    } else {
      activePlayer = "X";
    }
    time = 0;
  }
  time += 10;
}, 1000);

table.id = "TicTacToe";
board.appendChild(table);

// After making the game board, we make 5x5 cells
for (let i = 0; i < size; i++) {
  var tr = document.createElement("tr");
  tr.id = i;
  table.appendChild(tr);
  // One row should have 5 data cells in it
  for (let j = 0; j < size; j++) {
    var td = document.createElement("td");
    var cellID = tr.id + String(j);
    td.id = cellID;
    // We add onClick Listener to every cell
    td.addEventListener("click", function () {
      move(this);
    });
    tr.appendChild(td);
  }
}

function move(cell) {
  cell.innerHTML = activePlayer;
  if (activePlayer === "X") {
    activePlayer = "O";
    cell.classList.add("x");
  } else {
    activePlayer = "X";
    cell.classList.add("o");
  }
  time = 0;
  doWeHaveWinner();
}

function doWeHaveWinner() {
  // Horizontal wincheck
  for (let i = 0; i < size; i++) {
    let checker = 0;
    for (let j = 0; j < size; j++) {
      let cell = $(String(i) + String(j));

      if (checker === 0) {
        if (cell.innerHTML === "") {
          break;
        } else if (cell.innerHTML === "X") {
          checker = 1;
          continue;
        } else {
          checker = 2;
          continue;
        }
      } else if (checker === 1) {
        if (cell.innerHTML === "O" || cell.innerHTML === "") {
          break;
        }
      } else {
        if (cell.innerHTML === "X" || cell.innerHTML === "") {
          break;
        }
      }
      if (j === 4) {
        alert("Player " + String(checker) + " won!");
        clearTimeout(timer);
        break;
      }
    }
  }
  // Vertical check, only cell indcies are changed
  for (let i = 0; i < size; i++) {
    let checker = 0;
    for (let j = 0; j < size; j++) {
      let cell = $(String(j) + String(i));

      if (checker === 0) {
        if (cell.innerHTML === "") {
          break;
        } else if (cell.innerHTML === "X") {
          checker = 1;
          continue;
        } else {
          checker = 2;
          continue;
        }
      } else if (checker === 1) {
        if (cell.innerHTML === "O" || cell.innerHTML === "") {
          break;
        }
      } else {
        if (cell.innerHTML === "X" || cell.innerHTML === "") {
          break;
        }
      }
      if (j === 4) {
        alert("Player " + String(checker) + " won!");
        clearTimeout(timer);
        break;
      }
    }
  }
  // UpLeft to DownRight Diagonial check
  let checker = 0;
  for (let i = 0; i < size; i++) {
    let cell = $(String(i) + String(i));
    if (checker === 0) {
      if (cell.innerHTML === "") {
        break;
      } else if (cell.innerHTML === "X") {
        checker = 1;
        continue;
      } else {
        checker = 2;
        continue;
      }
    } else if (checker === 1) {
      if (cell.innerHTML === "O" || cell.innerHTML === "") {
        break;
      }
    } else {
      if (cell.innerHTML === "X" || cell.innerHTML === "") {
        break;
      }
    }
    if (i === 4) {
      alert("Player " + String(checker) + " won!");
      clearTimeout(timer);
      break;
    }
  }
  // DownLeft to UpRight Diagonial check
  checker = 0;
  for (let i = 0; i < size; i++) {
    let cell = $(String(i) + String(4 - i));
    if (checker === 0) {
      if (cell.innerHTML === "") {
        break;
      } else if (cell.innerHTML === "X") {
        checker = 1;
        continue;
      } else {
        checker = 2;
        continue;
      }
    } else if (checker === 1) {
      if (cell.innerHTML === "O" || cell.innerHTML === "") {
        break;
      }
    } else {
      if (cell.innerHTML === "X" || cell.innerHTML === "") {
        break;
      }
    }
    if (i === 4) {
      alert("Player " + String(checker) + " won!");
      clearTimeout(timer);
      break;
    }
  }
}
