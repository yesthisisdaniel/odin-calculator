let numberOne = "";
let numberTwo = "";
let operator = "";
let result = "";
let isFinalResult = false;
let lastNumberTwo = "";
let lastOperator = "";
const calculatorButtons = document.querySelectorAll(".calculatorButtons")
const digitButtons = document.querySelectorAll(".digitButtons")
const operatorButtons = document.querySelectorAll(".operatorButtons")
const display = document.querySelector("#display")
const clearButton = document.querySelector("#acButton")
const equalsButton = document.querySelector("#equalsButton")
const backspaceButton = document.querySelector("#backspaceButton")
const operations = {
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b),
    "X": (a, b) => Number(a) * Number(b),
    "÷": (a, b) => Number(a) / Number(b)
};

clearButton.addEventListener("click", clearAll)
function clearAll() {
    display.value = "";
    numberOne = "";
    numberTwo = "";
    operator = "";
    isFinalResult = false
    display.style.fontSize = "44px";
}

function renderDisplay() {
    if (operator === "") {
        display.value = numberOne;
    } else if (numberTwo === "") {
        display.value = `${numberOne} ${operator}`;
    } else {
        display.value = `${numberOne} ${operator} ${numberTwo}`;
    }
    scaleDisplay();
}

backspaceButton.addEventListener("click", backspace)
function backspace () {
    if (isFinalResult === true) {
        clearAll()
        return;
    }
    if (numberTwo) {
        numberTwo = numberTwo.slice(0, -1)
        renderDisplay();
    }
    else if (operator) {
        operator = operator.slice(0, -1);
        renderDisplay()
    }
    else {
        numberOne = numberOne.slice(0, -1);
        renderDisplay()
    }
}

function scaleDisplay() {
    let minFontSize = 20;
    let currentFontSize = parseInt(getComputedStyle(display).fontSize);
    while (currentFontSize > minFontSize && display.scrollWidth > display.clientWidth) {
        currentFontSize -= 2;
        display.style.fontSize = currentFontSize + "px";
        console.log(currentFontSize, display.scrollWidth, display.clientWidth);
    }              
}

// let multiply = function(numberOne, numberTwo) {
//     return Number(numberOne) * Number(numberTwo)
// }
// let divide = function(numberOne, numberTwo) {
//     return Number(numberOne) / Number(numberTwo)
// }
// let add = function(numberOne, numberTwo) {
//     return Number(numberOne) + Number(numberTwo)
// }
// let subtract = function(numberOne, numberTwo) {
//     return Number(numberOne) - Number(numberTwo)
// }

equalsButton.addEventListener("click", operate)

function operate() {
    if (numberOne === "" && numberTwo === "" && operator === "") {
        return;
    }
    if (numberTwo === "" && operator === "") {
        numberTwo = lastNumberTwo;
        operator = lastOperator;
    }
    result = operations[operator](numberOne, numberTwo);
    if (result === Infinity || result === undefined) {
        display.value = "Ah, ah, ah. Nice try ;)"
    }
    else {
       let stringResult = result.toString()

        if (stringResult.length > 11) {
         display.value = result.toPrecision(10);
        }
        else {
        display.value = parseFloat(result)
        }
    }
    numberOne = result;
    lastNumberTwo = numberTwo;
    numberTwo = "";
    lastOperator = operator;
    operator = "";
    isFinalResult = true;
    scaleDisplay()
}

digitButtons.forEach((button) => {
    button.addEventListener("click", updateNumbers)
})
operatorButtons.forEach((button) => {
    button.addEventListener("click", updateOperator)
})

function updateOperator(e) {
    if (numberOne === "") return;
    if (numberOne != "" && numberTwo != "") {
        operate();
    }
    operator = e.target.innerText;
    renderDisplay()
    isFinalResult = false;
}

function updateNumbers(e) {
    if (isFinalResult === true) {
        clearAll()
        isFinalResult = false;
    }
    if (operator == "") {
        numberOne += e.target.innerText;
        renderDisplay()
    }
    else{
        if (numberTwo === "") {
            numberTwo += e.target.innerText;
            renderDisplay()
        }
        else {
            numberTwo += e.target.innerText;
            renderDisplay()
        }
    }
}
