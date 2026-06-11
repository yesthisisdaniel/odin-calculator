const display = document.querySelector("#display");
const calculatorContainer = document.querySelector("#calculatorContainer");

const operations = {
    "+": (a, b) => Number(a) + Number(b),
    "-": (a, b) => Number(a) - Number(b),
    "X": (a, b) => Number(a) * Number(b),
    "÷": (a, b) => Number(a) / Number(b)
};

const globalState = getInitialState();
function getInitialState() {
    return {
        numberOne: "", numberTwo: "", operator: "",
        result: "", isFinalResult: false,
        flags: { numOneSqrt: false, numTwoSqrt: false, numOnePi: false, numTwoPi: false },
        last: { lastNumberTwo: "", operator: "" }
    }
}

function clearAll() {
    Object.assign(globalState, getInitialState());
    display.value = "";
    display.style.fontSize = "44px";
}

function renderDisplay() {
    if (globalState.result === Infinity || globalState.result === undefined) {
        display.value = "Ah, ah, ah. Nice try ;)";
        scaleDisplay();
        return;
    }
    let formattedNumberOne = globalState.numberOne;
    if (globalState.numberOne.length > 11 && globalState.numberOne.includes(".")) {
        formattedNumberOne = Number(globalState.numberOne).toPrecision(10);
    }
    
    if (globalState.flags.numOnePi) {
        formattedNumberOne = "π";
    }
    if (globalState.flags.numOneSqrt) {
        formattedNumberOne = `√(${formattedNumberOne})`;
    }
    
    let formattedNumberTwo = globalState.numberTwo;
    if (globalState.flags.numTwoPi) {
        formattedNumberTwo = "π";
    }
    if (globalState.flags.numTwoSqrt) {
        formattedNumberTwo = `√(${formattedNumberTwo})`;
    }
    
    if (globalState.operator === "") {
        display.value = formattedNumberOne;
    } else if (globalState.numberTwo === "" && !globalState.flags.numTwoSqrt && !globalState.flags.numTwoPi) { 
        display.value = `${formattedNumberOne} ${globalState.operator}`;
    } else {
        display.value = `${formattedNumberOne} ${globalState.operator} ${formattedNumberTwo}`;
    }
    scaleDisplay();
}

function backspace () {
    if (globalState.isFinalResult === true) {
        clearAll()
        return;
    }
    if (globalState.flags.numTwoPi) {
        globalState.flags.numTwoPi = false;
        globalState.numberTwo = "";
        renderDisplay();
    }
    else if (globalState.numberTwo !== "" || globalState.flags.numTwoSqrt) {
        if (globalState.numberTwo !== "") {
            globalState.numberTwo = globalState.numberTwo.slice(0, -1);
        } else {
            globalState.flags.numTwoSqrt = false;
        }
        renderDisplay();
    }
    else if (globalState.operator) {
        globalState.operator = globalState.operator.slice(0, -1);
        renderDisplay();
    }
    else if (globalState.flags.numOnePi) {
        globalState.flags.numOnePi = false;
        globalState.numberOne = "";
        renderDisplay();
    }
    else if (globalState.numberOne !== "" || globalState.flags.numOneSqrt) {
        if (globalState.numberOne !== "") {
            globalState.numberOne = globalState.numberOne.slice(0, -1);
        } else {
            globalState.flags.numOneSqrt = false;
        }
        renderDisplay();
    }
    else {
        clearAll();
    }
}

function posOrNeg() {
    if (globalState.numberOne === "" && globalState.numberTwo === "") {
        globalState.numberOne = "-"
        renderDisplay();
        return;
    }
    if (globalState.isFinalResult) {
        globalState.numberOne = globalState.numberOne * -1;
        return;
    }

    if (globalState.operator != "" && !globalState.numberTwo.includes("-")) {
        globalState.numberTwo = "-" + globalState.numberTwo
    }
    else if (globalState.operator != "" && globalState.numberTwo.includes("-")) {
        globalState.numberTwo = globalState.numberTwo.slice(1)
    }
    if (globalState.operator === "" && !globalState.numberOne.includes("-")) {
        globalState.numberOne = "-" + globalState.numberOne
    }
    else if (globalState.operator === "" && globalState.numberOne.includes("-")) {
        globalState.numberOne = globalState.numberOne.slice(1)
    }

    renderDisplay();
    console.log(globalState.numberOne, globalState.numberTwo)
}

function convertToPercent() {
    if (globalState.numberOne === "" && globalState.numberTwo === "" && globalState.operator === "") {
        return;
    }
    
    if (globalState.flags.numOnePi) globalState.flags.numOnePi = false;
    if (globalState.flags.numTwoPi) globalState.flags.numTwoPi = false;
    if (globalState.flags.numTwoSqrt) {
        globalState.numberTwo = Math.sqrt(Number(globalState.numberTwo)).toString();
        globalState.flags.numTwoSqrt = false;
    }
    else{
        globalState.numberOne = Math.sqrt(Number(globalState.numberOne)).toString();
        globalState.flags.numOneSqrt = false;
    }
    if (globalState.isFinalResult) {
        globalState.numberOne = Number((globalState.result) / 100).toString();
        globalState.isFinalResult = false;
    }
    else if (globalState.numberTwo) {
        globalState.numberTwo = Number((globalState.numberTwo) / 100).toString();
    }
    else {
        globalState.numberOne = Number((globalState.numberOne) / 100).toString();
    }
    renderDisplay();
}

function squareRoot() {
    if (globalState.isFinalResult) {
        globalState.numberOne = globalState.result.toString(); 
        globalState.flags.numOneSqrt = true;
        globalState.isFinalResult = false;
    }
    else if (globalState.numberTwo || globalState.operator) {
        globalState.flags.numTwoSqrt = true; 
    }
    else {
        globalState.flags.numOneSqrt = true;
    }
    renderDisplay();
}

function pi() {
    if (globalState.isFinalResult) {
        clearAll();
        globalState.isFinalResult = false;
    }
    if (globalState.operator !== "") {
        globalState.numberTwo = "3.14159265359";
        globalState.flags.numTwoPi = true;
    }
    else {
        globalState.numberOne = "3.14159265359";
        globalState.flags.numOnePi = true;
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
    if (globalState.numberOne === "" && globalState.numberTwo === "" && globalState.operator === "") {
        return;
    }
    
    globalState.flags.numOnePi = false;
    globalState.flags.numTwoPi = false;

    if (globalState.numberTwo === "" && globalState.operator === "") {
        if (globalState.last.operator !== "") {
            globalState.numberTwo = globalState.last.lastNumberTwo;
            globalState.operator = globalState.last.operator;
        }
        else if (globalState.flags.numOneSqrt) {
            globalState.numberOne = Math.sqrt(Number(globalState.numberOne)).toString();
            globalState.flags.numOneSqrt = false;
            globalState.isFinalResult = true;
            scaleDisplay();
            renderDisplay();
            return;
        } 
        else {
            globalState.isFinalResult = true;
            scaleDisplay();
            renderDisplay();
            return;
        }
    }
    if (globalState.flags.numOneSqrt) {
        globalState.numberOne = Math.sqrt(Number(globalState.numberOne)).toString();
        globalState.flags.numOneSqrt = false;
    }
    if (globalState.flags.numTwoSqrt) {
        globalState.numberTwo = Math.sqrt(Number(globalState.numberTwo)).toString();
        globalState.flags.numTwoSqrt = false;
    }
    globalState.result = operations[globalState.operator](globalState.numberOne, globalState.numberTwo);
    globalState.numberOne = globalState.result.toString();
    globalState.last.lastNumberTwo = globalState.numberTwo;
    globalState.numberTwo = "";
    globalState.last.operator = globalState.operator;
    globalState.operator = "";
    globalState.isFinalResult = true;
    scaleDisplay();
    renderDisplay();
}

function updateOperator(e) {
    if (globalState.numberOne === "") return;
    if (globalState.numberOne != "" && globalState.numberTwo != "") {
        operate();
    }
    globalState.operator = e.target.innerText;
    renderDisplay()
    globalState.isFinalResult = false;
}

function updateNumbers(e) {
    if (globalState.isFinalResult === true) {
        clearAll();
        globalState.isFinalResult = false;
    }
    
    if (globalState.operator == "") {
        if (globalState.flags.numOnePi) {
            globalState.flags.numOnePi = false;
            globalState.numberOne = "";
        }
        globalState.numberOne += e.target.innerText;
        renderDisplay();
    }
    else {
        if (globalState.flags.numTwoPi) {
            globalState.flags.numTwoPi = false;
            globalState.numberTwo = "";
        }
        globalState.numberTwo += e.target.innerText;
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
    else if (button.id === "positiveNegativeButton") {
        posOrNeg();
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