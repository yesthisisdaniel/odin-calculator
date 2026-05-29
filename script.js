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
    if (numberTwo === "" && operator === "") {
        numberTwo = lastNumberTwo;
        operator = lastOperator;
    }
    switch (operator) {
        case "X":
            display.value = multiply(numberOne, numberTwo)
            result = multiply(numberOne, numberTwo)
            break;
        case "÷":
            display.value = divide(numberOne, numberTwo)
            result = divide(numberOne, numberTwo)
            break;
        case "+":
            display.value = add(numberOne, numberTwo)
            result = add(numberOne, numberTwo)
            break;
        case "-":
            display.value = subtract(numberOne, numberTwo)
            result = subtract(numberOne, numberTwo)
            break;
    }
    numberOne = result;
    lastNumberTwo = numberTwo;
    numberTwo = "";
    lastOperator = operator;
    operator = "";
    isFinalResult = true;
}

digitButtons.forEach((button) => {
    button.addEventListener("click", updateNumbers)
})
operatorButtons.forEach((button) => {
    button.addEventListener("click", updateOperator)
})

function updateOperator(e) {
    if (numberOne != "" && numberTwo != "") {
        operate();
        numberOne = result;
        numberTwo = "";
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
