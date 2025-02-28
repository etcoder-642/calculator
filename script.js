/**
 * Things to fix for tomorrow:
 * 1. There is abug around the percentile button creates
 *    - when i click 122 and click 122 and click = it will be displayed 244 as it should
 *    - but if i click % this time it shows me 3.66 instead of 2.44 that means there is some sort of problem around there
 *    - and i don't even know why i set the checkerForPer flag I have forgot why I putted there I will figure it out later.
 * 
 */

const seven = document.querySelector(".seven")
 const btn = Array.from(document.querySelectorAll(".btn-content"))
 const display = document.querySelector(".display")


 let liveVar = " ";
 let isOprClicked = false;
 let secVar = "";
 let oprVar = " ";
 let checkerForLive = false;
 let checkerForPer = false;
 let checkerForFlag = false;

 // operator function
function operator(fir, opr, sec){
    const operators = {
        "\u002B": (a, b) => a + b,
        "\u2212": (a, b) => a - b,
        "\u00F7": (a, b) => a / b,
        "\u00D7": (a, b) => a * b
    };

    return operators[opr] ? operators[opr](fir, sec) : null;
}

function displayVar(disp){
    if((disp > 9999999) || (disp < 0.000001)){
        display.textContent = disp.toExponential(4);
    }else if(!(disp > 9999999) && !(disp < 0.00000001) && disp.toString().length >= 10){
        display.textContent = disp.toString().slice(0, 10)
    }else {
        display.textContent = disp;
    }
}


 document.addEventListener('pointerdown', (e)=>{
    let target = e.target; 
    if(target.className.includes("num") && isOprClicked === false){
        display.textContent += display.textContent.length <= 10 ? target.textContent: "";
        console.log(display.textContent.length)
    liveVar += target.textContent; 
        // console.log(`This is the First variable: ${liveVar}`)
    }else if(target.className.includes("num") && isOprClicked === true){
        if(checkerForLive === true){
            display.textContent = "";
            display.textContent += display.textContent.length <= 10 ? target.textContent: "";
            checkerForLive = false;
        }else {
            display.textContent += display.textContent.length <= 10 ? target.textContent: "";
            console.log(display.textContent.length)
        }
        secVar += target.textContent; 
        // console.log(`This is the Second variable: ${secVar}`)
    }else if((target.className.includes("opr") && secVar.length === 0) || (target.className.includes("opr") && checkerForFlag === true)){
        secVar = " ";
        checkerForFlag = false;
        checkerForLive = true;
        oprVar = target.textContent;
        // console.log(`This is the Operator: ${oprVar}`);
        isOprClicked = true;
    }else if(target.className.includes("equals")){
        let liveVarInt = parseFloat(liveVar);
        let secVarInt = parseFloat(secVar);
        liveVar = operator(liveVarInt, oprVar, secVarInt);
        console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} = ${liveVar}`);
        display.textContent = liveVar.toString().length <= 10 ? liveVar : liveVar.toString().slice(0, 10);
        console.log(`${liveVar} ${typeof liveVar}`)
        displayVar(liveVar);
        checkerForFlag = true;
    }else if(target.className.includes("opr") && !(secVar.length === 0)){
        checkerForLive = true;

        let liveVarInt = parseFloat(liveVar);
        let secVarInt = parseFloat(secVar);
        liveVar = operator(liveVarInt, oprVar, secVarInt);
        console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} = ${liveVar}`);

        displayVar(liveVar);
        oprVar = target.textContent;

        // console.log(`This is the Operator: ${oprVar}`);
        secVar = ""
    }else if(target.className.includes("per") && (secVar.length === 0)){
        liveVar /= 100;
        displayVar(liveVar);
    }else if(target.className.includes("per") && !(secVar.length === 0)){
        // if(checkerForPer === false) {
            let liveVarInt = parseFloat(liveVar);
            let secVarInt = parseFloat(secVar);
            liveVar = operator(liveVarInt, oprVar, secVarInt); 
            checkerForPer = true;    

            let temp = liveVar       
            liveVar /= 100;    
            // console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} % = ${liveVar}`);
            displayVar(liveVar);
        // }else {
        //     let temp = liveVar       
        //     liveVar /= 100;
        //     // console.log(`This are Bunch of Values: ${temp} % = ${liveVar}`);    
        //     displayVar(liveVar);
        // }
    }
    if(target.className.includes("alt")) location.reload();
 })

 
function addText(btn){
     btn.textContent;
 }