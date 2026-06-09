let numberOne = "";
let numberTwo = "";
let operator = "";
let result = "";
let isFinalResult = false;
let lastNumberTwo = "";
let lastOperator = "";
const calculatorButtons = document.querySelectorAll(".calculatorButtons");
const digitButtons = document.querySelectorAll(".digitButtons");
const operatorButtons = document.querySelectorAll(".operatorButtons");
const display = document.querySelector("#display");
const clearButton = document.querySelector("#acButton");
const equalsButton = document.querySelector("#equalsButton");
const backspaceButton = document.querySelector("#backspaceButton");
const percentButton = document.querySelector("#percentButton");
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
    if (result === Infinity || result === undefined) {
        display.value = "Ah, ah, ah. Nice try ;)";
        return;
    }
    let formattedNumberOne = numberOne;

    if (numberOne.length > 11 && numberOne.includes(".")) {
        formattedNumberOne = Number(numberOne).toPrecision(10);
    }
    if (operator === "") {
        display.value = formattedNumberOne;
    } else if (numberTwo === "") {
        display.value = `${formattedNumberOne} ${operator}`;
    } else {
        display.value = `${formattedNumberOne} ${operator} ${numberTwo}`;
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

percentButton.addEventListener("click", convertToPercent)
function convertToPercent() {
    if (isFinalResult) {
        result = Number((numberOne) / 100).toString();
        isFinalResult = false;
    }
    else if (numberTwo) {
        numberTwo = Number((numberTwo) / 100).toString();
    }
    else {
        numberOne = Number((numberOne) / 100).toString();
    }
    renderDisplay();
}

function scaleDisplay() {
    let minFontSize = 20;
    let currentFontSize = parseInt(getComputedStyle(display).fontSize);
    while (currentFontSize > minFontSize && display.scrollWidth > display.clientWidth) {
        currentFontSize -= 2;
        display.style.fontSize = currentFontSize + "px";
    }              
}

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

    numberOne = result;
    lastNumberTwo = numberTwo;
    numberTwo = "";
    lastOperator = operator;
    operator = "";
    isFinalResult = true;
    scaleDisplay()
    renderDisplay();
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
