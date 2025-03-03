 /**
  * Things to work for later:
  * 1. When the numbers become to large on the negative side it starts to cut them
  *    Fot example if a number is -2.23456743578234689876+e54 it doesn't cut it into 4 digits
  *    ... like it does in the positive side and it is also the same for extremely small numbers
  *    ... from the negative side
  * 2. Make the Del button work and find a way to find AC and Del functionality to the keyboard.
  */
 
 // some constant values

 const MAX_DISPLAY_LENGTH = 10;
 const MAX_POS_VALUE = 9999999999;
 const MAX_NEG_VALUE = -9999999999;
 const MIN_POS_VALUE = 0.000001;
 const MIN_NEG_VALUE = -0.000001;

 const display = document.querySelector(".display");

// some variables and flags used throughout the code
 let liveVar = " ";
 let secVar = "";
 let oprVar = " ";

 let isOprClicked = false;
 let checkerForLive = false;
 let checkerForEqualsInPer = false;
 let checkerForFlag = false;
 let checkerForDelete = false;

 // operator function
function operator(fir, opr, sec){
    const operators = {
        "\u002B": (a, b) => a + b,
        "\u2212": (a, b) => a - b,
        "\u00F7": (a, b) => a / b,
        "\u00D7": (a, b) => a * b,
        "Xn": (a, b) => Math.pow(a, b)
    };
    let result = operators[opr] ? operators[opr](fir, sec) : null;
    if(opr === "\u00F7" && sec === 0){
        return "U DUMB🤣"
    }else if (result === Infinity || result === -Infinity){
        return "BOOM💥"
    }else if (isNaN(result)){
        return "STOP🤚"
    }else {
        return result;
    }
}

// This function handles the display of a value after it have been caluculated by the operator function

function displayVar(disp){
    if((disp > MAX_POS_VALUE) || (disp < MIN_POS_VALUE && disp > 0) || (disp < MAX_NEG_VALUE) || (disp > MIN_NEG_VALUE && disp < 0)){
        display.textContent = disp.toExponential(4);
    }else if(disp.toString().length > MAX_DISPLAY_LENGTH){
        disp = display.textContent = disp.toString().slice(0, MAX_DISPLAY_LENGTH);
    }else {
        display.textContent = disp;
    }
}

// This function handles the display of a value while the user is inputting it

function updateDisplay(text){
    display.textContent += display.textContent.length <= MAX_DISPLAY_LENGTH ? text: "";
}

// This function is used for the AC and the backspace clicks

function hardReset(){
    liveVar = " ";
    isOprClicked = false;
    secVar = "";
    oprVar = " ";
    checkerForLive = false;
    checkerForEqualsInPer = false;
    checkerForFlag = false;
    checkerForDelete = false;

    display.textContent = "";
}

// This function handles a scenario where a number is clicked

function handleNumberClick(Input){
    if(isOprClicked === false){
        checkerForDelete = true;
        updateDisplay(Input);
        console.log(display.textContent.length)
        liveVar += liveVar.length < MAX_DISPLAY_LENGTH+2 ? Input: ""; 
        console.log(`This is the First variable: ${liveVar}`)
    }else {
        checkerForDelete = false;
        if(checkerForLive === true){
            display.textContent = "";
            updateDisplay(Input);
            checkerForLive = false;
        }else {
            updateDisplay(Input);
            console.log(display.textContent.length)
        }
        secVar += secVar.length < MAX_DISPLAY_LENGTH+2 ? Input: ""; 
        console.log(`This is the Second variable: ${secVar}`)
    }
}


// This function handles a scenario where the operators are clicked

function handleOperatorClick(Input){
    if((secVar.length === 0) || (checkerForFlag === true)){
        secVar = " ";
        checkerForFlag = false;
        checkerForLive = true;
        console.log(checkerForLive)
        oprVar = Input;
        console.log(`This is the Operator: ${oprVar}`);
        isOprClicked = true;
    }else if(!(secVar.length === 0)){
        checkerForLive = true;
        checkerForDelete = true;

        let liveVarInt = parseFloat(liveVar);
        let secVarInt = parseFloat(secVar);
        liveVar = operator(liveVarInt, oprVar, secVarInt);
        console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} = ${liveVar}`);

        displayVar(liveVar);
        oprVar = Input;

        console.log(`This is the Operator: ${oprVar}`);
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
    checkerForDelete = true;
}

// handles percentile Click

function handlePercentClick(){
    checkerForDelete = true;
    if((secVar.length === 0)){
        liveVar /= 100;
        displayVar(liveVar);
    }else{
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

// The Main Event Listener which directs to the different functions 
// ... depending on the button clicked

 document.addEventListener('click', (e)=>{
    let target = e.target; 
    switch (true) {
        case target.className.includes("num"):
            handleNumberClick(target.textContent);
            break;
        case target.className.includes("opr"):
            handleOperatorClick(target.textContent);
            break;
        case target.className.includes("equals"):
            handleEqualsClick();
            break;
        case target.className.includes("per"):
            handlePercentClick();
            break;
        case target.className.includes("alt"):
            hardReset();           
            break;
    }
})

 // The Event Listener which adds functionality for a keyboard input.

 document.addEventListener('keypress', (e)=>{
    let num = "1234567890.";
    let opr = "+-*/^";
    if(num.includes(e.key.toString())){
        handleNumberClick(e.key);
    }else if(opr.includes(e.key.toString())){
        const operatorMap = {
            "+": "\u002B",
            "-": "\u2212",
            "*": "\u00D7",
            "/": "\u00F7",
            "^": "Xn"
        };
        if (operatorMap[e.key]) {
            handleOperatorClick(operatorMap[e.key]);
        } 
    }else if(e.key.toString() === "=" ||e.key.toString() === "Enter"){
        handleEqualsClick();
    }
})

// The delete function
document.addEventListener('keydown', (e) =>{
    if(e.key === 'Delete' && checkerForDelete === true){
        liveVar = liveVar.toString().slice(0, liveVar.toString().length-1);
        console.log(`This is the first Variable ${liveVar}`)
        display.textContent = liveVar;
    }else if(e.key === 'Delete' && checkerForDelete === false){
        secVar = secVar.toString().slice(0, secVar.length-1); 
        display.textContent = secVar;
        console.log(`This is the second Variable ${secVar}`)       
    }
    if(e.key === 'Backspace'){
        hardReset();
    }
})   





