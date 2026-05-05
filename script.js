// let numberOne;
// let numberTwo;
// let operator;

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

