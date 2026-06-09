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
    display.value = `${numberOne} ${operator}`;
    isFinalResult = false;
}

function updateNumbers(e) {
    if (isFinalResult === true) {
        clearAll()
        isFinalResult = false;
    }
    if (operator == "") {
        numberOne += e.target.innerText;
        display.value += e.target.innerText;
    }
    else{
        if (numberTwo === "") {
            numberTwo += e.target.innerText;
            display.value = `${numberOne} ${operator} ${e.target.innerText}`
        }
        else {
            numberTwo += e.target.innerText;
            display.value += e.target.innerText
        }
    }
    scaleDisplay();
}
