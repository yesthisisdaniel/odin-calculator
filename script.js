let numberOne = "";
let numberTwo = "";
let operator = ""
const calculatorButtons = document.querySelectorAll(".calculatorButtons")
const digitButtons = document.querySelectorAll(".digitButtons")
const display = document.querySelector("#display")

let multiply = function(numberOne, numberTwo) {
    console.log(numberOne * numberTwo)
}
let divide = function(numberOne, numberTwo) {
    console.log(Number(numberOne) / Number(numberTwo))
}
let add = function(numberOne, numberTwo) {
    console.log(numberOne + numberTwo)
}
let subtract = function(numberOne, numberTwo) {
    console.log(numberOne - numberTwo)
}

const operate = function(numberOne, numberTwo, operator) {
    switch (operator) {
        case "*":
            multiply(numberOne, numberTwo)
            break;
        case "/":
            divide(numberOne, numberTwo)
            break;
        case "+":
            add(numberOne, numberTwo)
            break;
        case "-":
            subtract(numberOne, numberTwo)
    }
}

digitButtons.forEach((button) => {
    button.addEventListener("click", updateValues)
})
calculatorButtons.forEach((button) => {
    button.addEventListener("click", updateValues)
})

function updateValues(e) {
    let currentNum = "";

    if (numberOne === "") {
        numberOne = e.target.innerText;
        display.value += e.target.innerText;
        console.log(e.target.innerText)
    }
    else if (operator === "") {
        operator = e.target.innerText;
        display.value += e.target.innerText;
        console.log(e.target.innerText)
    }
    else {
        numberTwo = e.target.innerText;
        display.value += e.target.innerText;
        console.log(e.target.innerText)
    }
    console.log("numberOne is:" + numberOne);
    console.log("operator is:" + operator);
    console.log(operator);
}