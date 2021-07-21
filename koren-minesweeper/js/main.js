'use strict'

// 1.build a board with mines/nums

// 2.show a timer starts in first click, stop when game over

// 3. CLICK:
//.left click on cell: 
// a. reveals to cell content 
// right click : flags/unflags a suspected cell (you cannot reveal a flagged cell)

// 4.a--LOSE: when clicking a mine, all mines should be revealed o 
//4.b--WIN: all the mines are flagged, and all the other cells are shown

//6.Support 3 levels of the game 
//o Beginner (4*4 with 2 MINES) 
//o Medium (8 * 8 with 12 MINES) 
//o Expert (12 * 12 with 30 MINES)


var gBoard;
const BOMB = "💣"
const elWatch = document.querySelector('#display');
var minutes = 0;
var hours = 0;
var seconds = 0;
var millisecound = 0;
var timer;
var gLevel;
var gTime;


console.log(gLevel);


function initGame(size = 4) {
  gTime = 0;
  gBoard = buildBoard(size)
  console.table(gBoard)
  printMat(gBoard, '.board-container');
}


function buildBoard(matSize = 4) {

  // Create the Matrix
  var board = createMat(matSize, matSize)

  //place the bombs in random place on the board 
  renderBombs(matSize, board);
  //place the number/tails on the board; 


  for (var i = 0; i < board[0].length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var numOfNeighbors = numberOfNeighbors(i, j, board);

      switch (numOfNeighbors) {
        case 0:
          board[i][j] = ''
          break;
        case 1:
          board[i][j] = 1
          break;
        case 2:
          board[i][j] = 2
          break;
        case 3:
          board[i][j] = 3
          break;
        case 4:
          board[i][j] = 4
          break;
        case 5:
          board[i][j] = 5
          break;
        case 6:
          board[i][j] = 6
          break;
        case 7:
          board[i][j] = 7
          break;
        case 8:
          board[i][j] = 8
          break;
      }
    }
  }


  return board
}


function renderBombs(size, board) {

  var numOfBombs;

  if (size === 4) numOfBombs = 2;
  if (size === 8) numOfBombs = 12
  if (size === 12) numOfBombs = 30;

  for (var i = 0; i < numOfBombs; i++) {
    var x = getRandomInt(0, size - 1)
    var y = getRandomInt(0, size - 1)
    while (board[x][y]) {
      x = getRandomInt(0, size - 1)
      y = getRandomInt(0, size - 1)
    }
    board[x][y] = BOMB;
  }
}

function numberOfNeighbors(cellI, cellJ, mat) {
  var neighborsCount = 0;

  if (mat[cellI][cellJ] === BOMB) return
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      if (mat[i][j] === BOMB) {
        neighborsCount++;
      }
    }
  }
  return neighborsCount;
}


function revealNeighbors(cellI, cellJ, mat) {
  var elNegibhorCell;

  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue;
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue;
      if (i === cellI && j === cellJ) continue;
      elNegibhorCell = document.querySelector(`.cell${i}-${j}`);

      elNegibhorCell.firstElementChild.removeAttribute("hidden")
      elNegibhorCell.classList.add("reveald")
      elNegibhorCell.classList.add("pressed")
    }
  }
}






function clickedCell(currCell, idxI, idxJ) {

  //check if this is the first cell whos clicked. 
  if (!gTime) {
    gTime = 1;
    timeStart();
  }

  if (currCell.classList.contains("reveald")) return;

  currCell.firstElementChild.removeAttribute("hidden");
  currCell.classList.remove("marked")
  currCell.classList.add("pressed")
  currCell.classList.add("reveald")

  if (currCell.firstElementChild.innerText === BOMB) {
    //revel all the bombs and game over 
    for (var i = 0; i < gBoard[0].length; i++) {
      for (var j = 0; j < gBoard[0].length; j++) {
        if (gBoard[i][j] === BOMB) {
          var elCell = document.querySelector(`.cell${i}-${j}`);
          elCell.firstElementChild.removeAttribute("hidden")
          elCell.classList.add("reveald")
          elCell.classList.add("bombed")

        }
      }
    }
    timePaused()

    // gameOver()
  }
  if (currCell.firstElementChild.innerText !== BOMB) {
    if (numberOfNeighbors(idxI, idxJ, gBoard) === 0) {
      revealNeighbors(idxI, idxJ, gBoard)
      //expand
      openNeighbors(idxI, idxJ, gBoard)
    }
    else if (numberOfNeighbors(idxI, idxJ, gBoard) > 0) return
  }


}



function reset() {
  elWatch.style.color = 'black';
  setInterval(timer);
  millisecound = 0;
  elWatch.innerHTML = '00:00:00';
}

function openModal() {

}

function handleKey(currCell, ev) {
  ev.preventDefault()
  // ev.preventDefult();
  if (currCell.classList.contains("reveald")) return;
  else {

    currCell.classList.add("marked")
  }
}


function timeStart() {
  elWatch.style.color = '#0f62fe';
  clearInterval(timer);
  timer = setInterval(() => {
    millisecound += 10;

    let dateTimer = new Date(millisecound);

    elWatch.innerHTML =
      ('0' + dateTimer.getUTCHours()).slice(-2) +
      ':' +
      ('0' + dateTimer.getUTCMinutes()).slice(-2) +
      ':' +
      ('0' + dateTimer.getUTCSeconds()).slice(-2) +
      ':' +
      ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);
  }, 10);
}

function timePaused() {
  elWatch.style.color = 'red';
  clearInterval(timer);
}



function openNeighbors(board, idxI, idxJ) {

  if (numberOfNeighbors(idxI, idxJ, board)) return
  for (var i = idxI - 1; i <= idxI + 1; i++) {
    for (var j = idxJ - 1; j <= idxJ + 1; j++) {
      if (!checkIfInBoard(board, idxI, idxJ)) continue;
      if (!board[i][j] !== BOMB && !isMarked(idxI, idxJ) && !isShown(idxI, idxJ)) {
        if (isShown(idxI, idxJ)) continue;
        var elCell = document.querySelector(`.cell${idxI}-${idxJ}`);
        elCell.classList.add("pressed")
        elCell.firstElementChild.removeAttribute("hidden")
        openNeighbors(board, idxI, idxJ)
      }

    }
  }
}

function isMarked(idxI, idxJ) {
  var elCell = document.querySelector(`.cell${idxI}-${idxJ}`);
  if (elCell.classList.contains("marked")) return true;
  return false;
}


function isShown(idxI, idxJ) {
  var elCell = document.querySelector(`.cell${idxI}-${idxJ}`);
  if (elCell.classList.contains("reveald")) return true;
  return false;
}

function checkIfInBoard(board, idxI, idxJ) {
  return (idxI >= 0 && pos.i < board.length &&
    idxJ >= 0 && pos.j < board[idxI].length);
}
