 const MAX_DISPLAY_LENGTH = 10;
 const MAX_VALUE = 9999999999;
 const MIN_VAlUE = 0.000001;

 const display = document.querySelector(".display");


 let liveVar = " ";
 let isOprClicked = false;
 let secVar = "";
 let oprVar = " ";
 let checkerForLive = false;
 let checkerForEqualsInPer = false;
 let checkerForFlag = false;

 // operator function
function operator(fir, opr, sec){
    const operators = {
        "\u002B": (a, b) => a + b,
        "\u2212": (a, b) => a - b,
        "\u00F7": (a, b) => a / b,
        "\u00D7": (a, b) => a * b,
        "Xn": (a, b) => Math.pow(a, b)
    };

    if(opr === "\u00F7" && sec === 0){
        return "U DUMB🤣"
    }else if (operators[opr](fir, sec) === Infinity){
        return "BOOM💥"
    }else if (operators[opr](fir, sec) === NaN){
        return "STOP🤚"
    }else {
        return operators[opr] ? operators[opr](fir, sec) : null;
    }
}

// This function handles the display of a value after it have been caluculated by the operator function

function displayVar(disp){
    if((disp > MAX_VALUE) || (disp < MIN_VAlUE && disp > 0)){
        display.textContent = disp.toExponential(4);
    }else if(disp.toString().length > MAX_DISPLAY_LENGTH){
        display.textContent = disp.toString().slice(0, MAX_DISPLAY_LENGTH);
    }else {
        display.textContent = disp;
    }
}

// This function handles the display of a value while the user is inputting it

function updateDisplay(text){
    display.textContent += display.textContent.length <= MAX_DISPLAY_LENGTH ? text: "";
}

// This function handles a scenario where the number are values are clicked

function handleNumberClick(Input){
    // The isOprClicked flag checks if an operator is clicked if it is not 
    // ... it will transport the data to liveVar
    //... otherwise it will transport user inputted data to secVar
    if(isOprClicked === false){
        updateDisplay(Input.textContent);
        // console.log(display.textContent.length)
    liveVar += Input.textContent; 
        // console.log(`This is the First variable: ${liveVar}`)
    }else {
        if(checkerForLive === true){
            display.textContent = "";
            updateDisplay(Input.textContent);
            checkerForLive = false;
        }else {
            updateDisplay(Input.textContent);
            // console.log(display.textContent.length)
        }
        secVar += Input.textContent; 
        // console.log(`This is the Second variable: ${secVar}`)
    }
}

// This function handles a scenario where the operators are clicked

function handleOperatorClick(Input){
    if((secVar.length === 0) || (checkerForFlag === true)){
        secVar = " ";
        checkerForFlag = false;
        checkerForLive = true;
        oprVar = Input.textContent;
        // console.log(`This is the Operator: ${oprVar}`);
        isOprClicked = true;
    }else if(!(secVar.length === 0)){
        checkerForLive = true;

        let liveVarInt = parseFloat(liveVar);
        let secVarInt = parseFloat(secVar);
        liveVar = operator(liveVarInt, oprVar, secVarInt);
        // console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} = ${liveVar}`);

        displayVar(liveVar);
        oprVar = Input.textContent;

        // console.log(`This is the Operator: ${oprVar}`);
        secVar = ""
    }
}

// This function handles a scenario where the equals button is clicked

function handleEqualsClick(){
    let liveVarInt = parseFloat(liveVar);
    let secVarInt = parseFloat(secVar);
    liveVar = operator(liveVarInt, oprVar, secVarInt);
    // console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} = ${liveVar}`);
    display.textContent = liveVar.toString().length <= 10 ? liveVar : liveVar.toString().slice(0, 10);
    // console.log(`${liveVar} ${typeof liveVar}`)
    displayVar(liveVar);
    checkerForFlag = true;
    checkerForEqualsInPer = true;
}

// handles percentile Click

function handlePercentClick(){
    if((secVar.length === 0)){
        liveVar /= 100;
        displayVar(liveVar);
    }else{
        // the reason checkerForEqualsInPer is used is to prevent edge cases like where the user clicks a number then another number then 
        // ... the percentage button. Let's say the user clicks 5 then + then 5 then the percentage button the result should computed to 0.1.
        // ... but since the user have not clicked another operator or the equals button the result of 5 + 5 have not been yet been computed to 10 by the operator function.
        // ... hence the result was shown to be 0.05. So the checkerForEqualsInPer is used to prevent this edge case by checking if the user have clicked the if
        // ... equals button was clicked in between. If so it will compute the calculation by itself
        if(checkerForEqualsInPer === false) {
            let liveVarInt = parseFloat(liveVar);
            let secVarInt = parseFloat(secVar);
            liveVar = operator(liveVarInt, oprVar, secVarInt); 
            checkerForEqualsInPer = true;    

            liveVar /= 100;    
            // console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} % = ${liveVar}`);
            displayVar(liveVar);
        }else {
            liveVar /= 100;
            // console.log(`This are Bunch of Values: ${temp} % = ${liveVar}`);    
            displayVar(liveVar);
        }
    }
}

 document.addEventListener('click', (e)=>{
    let target = e.target; 
    if(target.className.includes("num")){
        handleNumberClick(target);
    }else if(target.className.includes("opr")){
        handleOperatorClick(target);
    }else if(target.className.includes("equals")){
        handleEqualsClick();
    }else if(target.className.includes("per")){
        handlePercentClick();
    }else if(target.className.includes("alt")) location.reload();
 })

