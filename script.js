let numberOne = "";
let numberTwo = "";
let operator = ""
const calculatorButtons = document.querySelectorAll(".calculatorButtons")
const digitButtons = document.querySelectorAll(".digitButtons")
const operatorButtons = document.querySelectorAll(".operatorButtons")
const display = document.querySelector("#display")
const clearButton = document.querySelector("#acButton")
const equalsButton = document.querySelector("#equalsButton")

clearButton.addEventListener("click", clearAll)
function clearAll() {
    display.value = "";
    numberOne = "";
    numberTwo = "";
    operator = "";
}

let multiply = function(numberOne, numberTwo) {
    numberOne * numberTwo
}
let divide = function(numberOne, numberTwo) {
    Number(numberOne) / Number(numberTwo)
}
let add = function(numberOne, numberTwo) {
    numberOne + numberTwo
}
let subtract = function(numberOne, numberTwo) {
    numberOne - numberTwo
}

function operate (numberOne, numberTwo, operator) {
    switch (operator) {
        case "X":
            display.value = multiply(numberOne, numberTwo)
            break;
        case "/":
            display.value = divide(numberOne, numberTwo)
            break;
        case "+":
            display.value = add(numberOne, numberTwo)
            break;
        case "-":
            display.value = subtract(numberOne, numberTwo)
    }
}
equalsButton.addEventListener("click", operate)

digitButtons.forEach((button) => {
    button.addEventListener("click", updateNumbers)
})
operatorButtons.forEach((button) => {
    button.addEventListener("click", updateOperator)
})
function updateOperator(e) {
    operator = e.target.innerText
    display.value = e.target.innerText;
}

function updateNumbers(e) {
    if (numberOne == "") {
        numberOne = e.target.innerText;
        display.value += e.target.innerText;
        console.log(e.target.innerText)
    }
    else if (operator == "") {
        updateOperator();
    }
    else if(numberTwo == "") {
        numberTwo = e.target.innerText;
        display.value = e.target.innerText;
    }
}
