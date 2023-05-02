const sketchContainer = document.querySelector('#sketch');
const container = document.querySelector('.container');
const colorPicker = document.querySelector('#colorPicker');
const gridSlider = document.querySelector('#gridSizeSlider');
const gridSizeText = document.querySelector('#currentGridSize');
const randomColorBtn = document.querySelector('#randomColorBtn'); 
const eraseBtn = document.querySelector('#eraseBtn');
const clearBtn = document.querySelector('#clearBtn');
// console.log(colorPicker.value);

let currentSelectedColor = colorPicker.value;
let hoverStyle = `.grid-box:hover { background-color: ${currentSelectedColor}}`;

//By default, we start at 16x16 grid size
gridSlider.value = 16;
let numberofGridInLine = 16;
let randomColor = false;
let erase = false;
let currentGridSize = gridSlider.value;

function displayGrid(newSize) {
    updateHoverStyle(currentSelectedColor);
    randomColor = false;
    erase = false;
    numberofGridInLine = newSize;
    currentGridSize = newSize;
    for (let i = 0; i < numberofGridInLine; i++) {
        //Creating a horizontal div which will contain 16 other smaller divs
        let divEleHoriz = document.createElement('div');
        divEleHoriz.classList.add('row-grid');
        for (let j = 0; j < numberofGridInLine; j++) {
            //Creating indiviual div which we will add to the horizontal div
            let divEleIndivi = document.createElement('div');
            // divEleIndivi.textContent = 1;
            divEleIndivi.classList.add('grid-box');
    
            //Adding a click event to a square div to change its color
            divEleIndivi.addEventListener('click', changeToCurrentColor);
    
            divEleHoriz.appendChild(divEleIndivi);
        }
        sketchContainer.appendChild(divEleHoriz);
    }
}

function removeAllGrid() {
    sketchContainer.innerHTML='';
}


function changeToCurrentColor(event) {
    if (randomColor) {
        currentSelectedColor = getRandomColor();
        randomColorBtn.classList.add('active');
        eraseBtn.classList.remove('active')
    } else if (erase) {
        currentSelectedColor = '#ffffff';
        eraseBtn.classList.add('active');
        randomColorBtn.classList.remove('active');
    } else {
        console.log(event.target);
        console.log(colorPicker.value);
        //Getting the value of selected color from the color picker
        currentSelectedColor = colorPicker.value;
    }
    //We can then set the background color to the color that we
    //have selected from color picker
    //Or the random value
    event.target.style.backgroundColor = currentSelectedColor;
    updateHoverStyle(currentSelectedColor);
}

function updateHoverStyle(currentColor) {
    hoverStyle = `.grid-box:hover { background-color: ${currentColor}}`;
    const styleElement = document.getElementById('hover-style');
    
    if (styleElement) {
        styleElement.innerHTML = hoverStyle;
    } else {
        const newStyleElement = document.createElement('style');
        newStyleElement.id = 'hover-style';
        newStyleElement.innerHTML = hoverStyle;
        document.head.appendChild(newStyleElement);
    }

    // hoverStyleElement.innerHTML = hoverStyle;
    // document.head.appendChild(hoverStyleElement);
}

function changeGridSizeText(newGridSize) {
    gridSizeText.textContent = `${newGridSize} x ${newGridSize}`;
}

function changeGridSize(event) {
    //When we change the grid size, first we need to remove all the grid
    //before we display another grid of new size
    removeAllGrid();
    displayGrid(event.target.value);
    changeGridSizeText(event.target.value);
}

function getRandomColor() {
    randomColor = true;
    const randomValueR = Math.floor(Math.random() * 256);
    const randomValueG = Math.floor(Math.random() * 256);
    const randomValueB = Math.floor(Math.random() * 256);

    //We can then set the background color to the color that we
    //got from the random values of R, G and B
    // event.target.style.backgroundColor = `rgb(${randomValueR}, ${randomValueG}, ${randomValueB})`;
    currentColor = `rgb(${randomValueR}, ${randomValueG}, ${randomValueB})`;
    console.log(currentColor);

    return `rgb(${randomValueR}, ${randomValueG}, ${randomValueB})`;
}


gridSlider.addEventListener('change', changeGridSize);
colorPicker.addEventListener('input', (event) => {
    randomColor = false;
    erase = false;
    changeToCurrentColor(event);
});
randomColorBtn.addEventListener('click', () => {
    randomColor = true;
    erase = false;
});
eraseBtn.addEventListener('click', () => {
    randomColor = false;
    erase = true;
});
clearBtn.addEventListener('click', () => {
    randomColor = false;
    erase = false;
    removeAllGrid();
    displayGrid(currentGridSize);
})
displayGrid(numberofGridInLine);