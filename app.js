$(document).ready(function () {

    var current = "";
    var inputArr = ["", "", ""];
    var firstNum = true;
    var maxValue = boundaries.max;
    var minValue = boundaries.min;

    console.log(maxValue);
    console.log("Initially: " + " current:" + current + " inputArr:" + inputArr + " firstNum:" + firstNum);


    $('.btn').click(function () {

        var pressedKey = $(this);

        if (pressedKey.hasClass("btn-num")) {
            current += pressedKey.html();//get pressed value
            $(".result").attr("placeholder", current);//display entered num value
            console.log("Number pressed: " + " current:" + current + " inputArr:" + inputArr + " firstNum:" + firstNum);

        }

        else if (pressedKey.hasClass("op")) {
            handleOperator(pressedKey.html());//if pressed button is an operator,operator->arg
            console.log("Operation pressed: " + " current:" + current + " inputArr:" + inputArr + " firstNum:" + firstNum);

        }
        else if (pressedKey.html() === "C") {
            resetCond();
            $("input").attr("placeholder", "");

        }
        else if (pressedKey.html() === "=") {
            handleAssign();
        }
    })


    handleOperator = function (opKey) {
        console.log("Inside function handleOperator()");

        if (current === "") {
            if (firstNum === false) {//num pressed, then operator pressed, then operator pressed again 
                inputArr[1] = opKey;//overwrite
                $(".hist").attr("placeholder", inputArr[0] + inputArr[1]);
            }
            else {//operator pressed before any num pressed
                alert("You must enter a number first!");
            }
        }
        else {
            var num;
            num = parseFloat(current);

            if (num > maxValue || num < minValue) {
                alert("Value out of boundary");
                resetCond();
            }

            if (firstNum === false) { //operation with more than one operator
                inputArr[2] = num;
                calculate();
                inputArr[1] = opKey;//change operator to newly pressed
            }
            else {
                inputArr[0] = num;
                inputArr[1] = opKey;
                firstNum = false;
                $(".hist").attr("placeholder", inputArr[0] + inputArr[1]);
            }
            current = "";
            $(".result").attr("placeholder", inputArr[0]);
        }
    }

    handleAssign = function () {
        if (current === "") {
            if (inputArr[0] === "")
                alert("Nothing entered");
        }
        else {
            var num;
            num = parseFloat(current);
            if (firstNum === false) {
                inputArr[2] = num;
            }
            else
                inputArr[0] = num;
            if (inputArr[1] !== "") {
                var oldNum = inputArr[0];
                calculate();
                $(".hist").attr("placeholder", oldNum + inputArr[1] + inputArr[2] + "=" + inputArr[0]);
            }
            else
                $(".hist").attr("placeholder", inputArr[0] + "=" + inputArr[0]);
            $(".result").attr("placeholder", inputArr[0]);



        }
        firstNum = true;
        current = inputArr[0];
    }

    resetCond = function () {
        //set everything to initial values
        for (var i = 0; i < 3; i++)
            inputArr[i] = "";
        current = "";
        firstNum = true;
    }

    calculate = function () {
        //do the operation and put result in first index
        if (inputArr[1] === "+")
            inputArr[0] = inputArr[0] + inputArr[2];
        else if (inputArr[1] === "-")
            inputArr[0] = inputArr[0] - inputArr[2];
        else if (inputArr[1] === "x")
            inputArr[0] = inputArr[0] * inputArr[2];
        else if (inputArr[1] === "/")
            inputArr[0] = inputArr[0] / inputArr[2];

        if (inputArr[0] > maxValue || inputArr[0] < minValue) {
            alert("Value out of boundary");
            resetCond();
        }
    }


})
