let numberOne;
let numberTwo;
let operator;
const calculatorButtons = document.querySelectorAll(".calculatorButtons")
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

calculatorButtons.forEach((button) => {
    button.addEventListener("click", updateNumberOne)
})

function updateNumberOne(e) {
    console.log(event.target.innerText)
    display.textContent+=(event.target.innerText)
}