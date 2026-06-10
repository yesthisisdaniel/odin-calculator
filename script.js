let numberOne = "";
let numberTwo = "";
let operator = "";
let result = "";
let isFinalResult = false;
let isNumberOneSqrt = false;
let isNumberTwoSqrt = false;
let isNumberOnePi = false;
let isNumberTwoPi = false;
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
    isNumberOneSqrt = false;
    isNumberTwoSqrt = false;
    isNumberOnePi = false; 
    isNumberTwoPi = false; 
    result = "";
}

function renderDisplay() {
    if (result === Infinity || result === undefined) {
        display.value = "Ah, ah, ah. Nice try ;)";
        scaleDisplay();
        return;
    }
    let formattedNumberOne = numberOne;
    if (numberOne.length > 11 && numberOne.includes(".")) {
        formattedNumberOne = Number(numberOne).toPrecision(10);
    }
    
    // Check Pi flag first, then wrap with Sqrt if needed -> yields √(π)
    if (isNumberOnePi) {
        formattedNumberOne = "π";
    }
    if (isNumberOneSqrt) {
        formattedNumberOne = `√(${formattedNumberOne})`;
    }
    
    let formattedNumberTwo = numberTwo;
    if (isNumberTwoPi) {
        formattedNumberTwo = "π";
    }
    if (isNumberTwoSqrt) {
        formattedNumberTwo = `√(${formattedNumberTwo})`;
    }
    
    if (operator === "") {
        display.value = formattedNumberOne;
    } else if (numberTwo === "" && !isNumberTwoSqrt && !isNumberTwoPi) { 
        display.value = `${formattedNumberOne} ${operator}`;
    } else {
        display.value = `${formattedNumberOne} ${operator} ${formattedNumberTwo}`;
    }
    scaleDisplay();
}

function backspace () {
    if (isFinalResult === true) {
        clearAll()
        return;
    }
    if (isNumberTwoPi) {
        isNumberTwoPi = false;
        numberTwo = "";
        renderDisplay();
    }
    else if (numberTwo !== "" || isNumberTwoSqrt) {
        if (numberTwo !== "") {
            numberTwo = numberTwo.slice(0, -1);
        } else {
            isNumberTwoSqrt = false;
        }
        renderDisplay();
    }
    else if (operator) {
        operator = operator.slice(0, -1);
        renderDisplay();
    }
    else if (isNumberOnePi) {
        isNumberOnePi = false;
        numberOne = "";
        renderDisplay();
    }
    else if (numberOne !== "" || isNumberOneSqrt) {
        if (numberOne !== "") {
            numberOne = numberOne.slice(0, -1);
        } else {
            isNumberOneSqrt = false;
        }
        renderDisplay();
    }
    else {
        clearAll();
    }
}

function convertToPercent() {
    if (numberOne === "" && numberTwo === "" && operator === "") {
        return;
    }
    
    // If they change PI to a percent, turn off the PI flags 
    // so the screen displays the actual decimal result instead of the symbol
    if (isNumberOnePi) isNumberOnePi = false;
    if (isNumberTwoPi) isNumberTwoPi = false;

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
        numberOne = result.toString(); 
        isNumberOneSqrt = true;
        isFinalResult = false;
    }
    else if (numberTwo || operator) {
        isNumberTwoSqrt = true; 
    }
    else {
        isNumberOneSqrt = true;
    }
    renderDisplay();
}

function pi() {
    if (isFinalResult) {
        clearAll();
        isFinalResult = false;
    }
    // FIX: We assign the actual value to the variable immediately 
    // so it passes your empty string "" check safeguards across the app!
    if (operator !== "") {
        numberTwo = "3.14159265359";
        isNumberTwoPi = true;
    }
    else {
        numberOne = "3.14159265359";
        isNumberOnePi = true;
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
    
    // Clear the Pi flags because the raw numbers are already loaded into the variables!
    isNumberOnePi = false;
    isNumberTwoPi = false;

    if (numberTwo === "" && operator === "") {
        if (lastOperator !== "") {
            numberTwo = lastNumberTwo;
            operator = lastOperator;
        }
        else if (isNumberOneSqrt) {
            numberOne = Math.sqrt(Number(numberOne)).toString();
            isNumberOneSqrt = false;
            isFinalResult = true;
            scaleDisplay();
            renderDisplay();
            return;
        } 
        else {
            isFinalResult = true;
            scaleDisplay();
            renderDisplay();
            return;
        }
    }
    if (isNumberOneSqrt) {
        numberOne = Math.sqrt(Number(numberOne)).toString();
        isNumberOneSqrt = false;
    }
    if (isNumberTwoSqrt) {
        numberTwo = Math.sqrt(Number(numberTwo)).toString();
        isNumberTwoSqrt = false;
    }
    result = operations[operator](numberOne, numberTwo);
    numberOne = result.toString();
    lastNumberTwo = numberTwo;
    numberTwo = "";
    lastOperator = operator;
    operator = "";
    isFinalResult = true;
    scaleDisplay();
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
        clearAll();
        isFinalResult = false;
    }
    
    if (operator == "") {
        if (isNumberOnePi) {
            isNumberOnePi = false;
            numberOne = "";
        }
        if (isNumberOneSqrt && numberOne === result.toString()) {
            clearAll();
        }
        numberOne += e.target.innerText;
        renderDisplay();
    }
    else {
        if (isNumberTwoPi) {
            isNumberTwoPi = false;
            numberTwo = "";
        }
        numberTwo += e.target.innerText;
        renderDisplay();
    }
}

calculatorContainer.addEventListener("click", handleGridClick);
function handleGridClick(e) {
    if (!e.target.matches("button")) return;
    const button = e.target;

    if (button.id === "squareRoot") {
        squareRoot();
    }
    else if (button.id === "piButton") {
        pi();
    }
    else if (button.id === "percentButton") {
        convertToPercent();
    }
    else if (button.classList.contains("digitButtons")) {
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
}