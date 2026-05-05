// let multiply = function() {
//     let answers = prompt("What numbers are we adding today my lord?")
//     console.log(answers)
//     let product = answers.replaceAll(",", " ")
//                          .split(" ")
//                          .filter(item => item !== "") 
//                          .reduce((acc, currentNum) => {
//                             return acc * currentNum;
//                          }, 1);

//     console.log(product);
// }

const multiplyButton = document.querySelector("#multiplyTest")

multiplyButton.addEventListener("click", () => {
    multiply();
})