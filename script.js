let numberOne = "";
let numberTwo = "";
let operator = "";
let result = "";
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
    return Number(numberOne) * Number(numberTwo)
}
let divide = function(numberOne, numberTwo) {
    return Number(numberOne) / Number(numberTwo)
}
let add = function(numberOne, numberTwo) {
    return Number(numberOne) + Number(numberTwo)
}
let subtract = function(numberOne, numberTwo) {
    return Number(numberOne) - Number(numberTwo)
}

equalsButton.addEventListener("click", operate)

function operate() {
    switch (operator) {
        case "X":
            display.value = multiply(numberOne, numberTwo)
            result = multiply(numberOne, numberTwo)
            numberOne = result;
            numberTwo = "";
            operator = "";
            break;
        case "÷":
            display.value = divide(numberOne, numberTwo)
            result = divide(numberOne, numberTwo)
            numberOne = result;
            numberTwo = "";
            operator = "";
            break;
        case "+":
            display.value = add(numberOne, numberTwo)
            result = add(numberOne, numberTwo)
            numberOne = result;
            numberTwo = "";
            operator = "";
            break;
        case "-":
            display.value = subtract(numberOne, numberTwo)
            result = subtract(numberOne, numberTwo)
            numberOne = result;
            numberTwo = "";
            operator = "";
            break;
    }
}

digitButtons.forEach((button) => {
    button.addEventListener("click", updateNumbers)
})
operatorButtons.forEach((button) => {
    button.addEventListener("click", updateOperator)
})

function updateOperator(e) {
    operator = e.target.innerText
    display.value = `${numberOne} ${e.target.innerText}`;
}

function updateNumbers(e) {
    if (operator == "") {
        numberOne += e.target.innerText;
        display.value += e.target.innerText;
        console.log(e.target.innerText)
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
}
