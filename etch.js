const SQUARE_SIZE = 16;

function drawSquare(squareSize) {
    let square = document.querySelector('#square');

    // Remove all old sub-divs.
    while (square.firstChild) {
        let divrow = square.firstChild;
        while (divrow.firstChild) {
            divrow.firstChild.remove();
        }
        square.firstChild.remove();
    }

    // Draw new square
    for (let i = 0; i < squareSize; ++i) {
        const divrow = document.createElement('div');
        divrow.id = 'row_' + i;
        divrow.classList.add('divrow')
        for (let j = 0; j < squareSize; ++j) {
            const div = document.createElement('div');
            div.id = 'div_' + i + "_" + j;
            div.classList.add('div');
            divrow.appendChild(div);
        }
        square.appendChild(divrow);
    }
}

function changeColor(e) {
    let backgroundColor = e.target.style.backgroundColor;
    if (!backgroundColor) {
        e.target.style.backgroundColor = "rgb(0, 0, 255, 0.1)";
    } else {
        let rgbSplit = backgroundColor.split(',');
        if (rgbSplit.length > 3) {
            let alpha = rgbSplit[3].split(')')[0];
            e.target.style.backgroundColor = backgroundColor.replace(alpha, (Number(alpha) + 0.1).toString());
        }
    }
}

function setSquareProperties(e, squareSize) {
    let dimension = Math.floor(window.innerWidth / squareSize);
    e.style.width = dimension + 'px';
    e.style.height = dimension + 'px';
    e.style.color = "white";
}

function getNewDimensions() {
    let squareSize = +prompt("Enter square size (up to 100)");
    squareSize = Math.min(squareSize, 100);
    if (Number.isInteger(squareSize)) {
        initializeSquare(squareSize);
    }
}

function initializeSquare(squareSize) {
    drawSquare(squareSize);
    let divs = document.querySelectorAll('.div');
    divs.forEach(element => setSquareProperties(element, squareSize));
    divs.forEach(element => element.addEventListener('mouseover', changeColor));
}

let button = document.querySelector('#button');
button.addEventListener('click', getNewDimensions);


initializeSquare(SQUARE_SIZE);