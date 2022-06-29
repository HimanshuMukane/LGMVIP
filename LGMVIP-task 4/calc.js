"use strict";

var input = document.getElementById('input'), 
    number = document.querySelectorAll('.numbers div'), 
    operator = document.querySelectorAll('.operators div'), 
    result = document.getElementById('result'), 
    clear = document.getElementById('clear'), 
    resultDisplayed = false; 

for (var i = 0; i < number.length; i++) {
    if (window.CP.shouldStopExecution(0)) break;
    number[i].addEventListener("click", function(e) {

     
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

      
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        
            input.innerHTML += e.target.innerHTML;
        } else {
      
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }

    });
}


window.CP.exitedLoop(0);
for (var i = 0; i < operator.length; i++) {
    if (window.CP.shouldStopExecution(1)) break;
    operator[i].addEventListener("click", function(e) {

     
        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];


        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
          
            console.log("enter a number first");
        } else {
       
            input.innerHTML += e.target.innerHTML;
        }

    });
}


window.CP.exitedLoop(1);
result.addEventListener("click", function() {

 
    var inputString = input.innerHTML;

  
    var numbers = inputString.split(/\+|\-|\×|\÷/g);


    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    console.log(inputString);
    console.log(operators);
    console.log(numbers);
    console.log("----------------------------");

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        if (window.CP.shouldStopExecution(2)) break;
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }
    window.CP.exitedLoop(2);

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        if (window.CP.shouldStopExecution(3)) break;
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }
    window.CP.exitedLoop(3);

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        if (window.CP.shouldStopExecution(4)) break;
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }
    window.CP.exitedLoop(4);

    var add = operators.indexOf("+");
    while (add != -1) {
        if (window.CP.shouldStopExecution(5)) break;
        
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }
    window.CP.exitedLoop(5);

    input.innerHTML = numbers[0];

    resultDisplayed = true; 
});


clear.addEventListener("click", function() {
    input.innerHTML = "";
});