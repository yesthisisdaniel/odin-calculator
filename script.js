let numberOne = "";
let numberTwo = "";
let operator = "";
let result = "";
let isFinalResult = false;
let lastNumberTwo = "";
let lastOperator = "";

const display = document.querySelector("#display");
const calculatorContainer = document.querySelector("#calculatorContainer");

const operations = {
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b),
    "X": (a, b) => Number(a) * Number(b),
    "÷": (a, b) => Number(a) / Number(b)
};

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

function convertToPercent() {
    if (isFinalResult) {
        numberOne = Number((result) / 100).toString();
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

function squareRoot() {
    if (isFinalResult) {
        numberOne = Math.sqrt(Number(numberOne)).toString();
        isFinalResult = false;
    }
    else if (numberTwo) {
        numberTwo = Math.sqrt(Number(numberTwo)).toString();
    }
    else {
        numberOne = Math.sqrt(Number(numberOne)).toString();
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

calculatorContainer.addEventListener("click", handleGridClick);
function handleGridClick(e) {
    if (!e.target.matches("button")) return;
    const button = e.target;
    if (button.classList.contains("digitButtons")) {
        updateNumbers(e); 
    }
    else if (button.classList.contains("operatorButtons")) {
        updateOperator(e);
    }
    else if (button.id === "equalsButton") {
        operate();
    }
    else if (button.id === "acButton") {
        clearAll();
    }
    else if (button.id === "backspaceButton") {
        backspace();
    }
    else if (button.id === "percentButton") {
        convertToPercent();
    }
}