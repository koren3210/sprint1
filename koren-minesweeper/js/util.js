'use strict'

//!!---utils--- !!

function createMat(ROWS, COLS) {
  var mat = []
  for (var i = 0; i < ROWS; i++) {
    var row = []
    for (var j = 0; j < COLS; j++) {
      row.push('')
    }
    mat.push(row)
  }
  return mat
}

/**
* Returns a random number between min (inclusive) and max (exclusive)
*/
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
* Returns a random integer between min (inclusive) and max (inclusive).
* The value is no lower than min (or the next integer greater than min
* if min isn't an integer) and no greater than max (or the next integer
* lower than max if max isn't an integer).
* Using Math.round() will give you a non-uniform distribution!
*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function printMat(mat, selector) {

  var strHTML = '<table border="1" cellPadding="10"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + `"oncontextmenu="handleKey(this, event)" onclick="clickedCell(this, ${i},${j})"> <p hidden>` + cell + '</p> </td>'
      //<p hidden>' + cell + '</p>  //important!!! 
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}


function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}
