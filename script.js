 const seven = document.querySelector(".seven")
 const btn = Array.from(document.querySelectorAll(".btn-content"))
 const display = document.querySelector(".display")


 let liveVar = " ";
 let isOprClicked = false;
 let secVar = "";
 let oprVar = " ";
 let checkerForLive = false;
 let checkerForPer = false;

 // operator function
 function operator(fir, opr, sec){
    const minusChar = "\u2212"
    const plusChar = "\u002B"
    const divideChar = "\u00F7";
    const multiplyChar = "\u00D7";

    if(opr===plusChar) return fir + sec;
    else if(opr===minusChar) return fir - sec;
    else if(opr===divideChar) return fir / sec;
    else if(opr===multiplyChar) return fir * sec;
 }


 document.addEventListener('click', (e)=>{
    let target = e.target; 
    if(target.className.includes("num") && isOprClicked === false){
        display.textContent += target.textContent;
        liveVar += target.textContent; 
        // console.log(`This is the First variable: ${liveVar}`)
    }else if(target.className.includes("num") && isOprClicked === true){
        if(checkerForLive === true){
            display.textContent = "";
            display.textContent += display.textContent.length <= 10 ? target.textContent: "";
            console.log(display.textContent.length)
            checkerForLive = false;
        }else {
            display.textContent += target.textContent;
        }
        secVar += target.textContent; 
        // console.log(`This is the Second variable: ${secVar}`)
    }else if(target.className.includes("opr") && secVar.length === 0){
        checkerForLive = true;
        oprVar = target.textContent;
        // console.log(`This is the Operator: ${oprVar}`);
        isOprClicked = true;
    }else if(target.className.includes("equals")){
        let liveVarInt = parseFloat(liveVar);
        let secVarInt = parseFloat(secVar);
        liveVar = operator(liveVarInt, oprVar, secVarInt);
        // console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} = ${liveVar}`);
        display.textContent = liveVar.length <= 10 ? liveVar : liveVar.toString().slice(0, 10);
        secVar = ""
    }else if(target.className.includes("opr") && !(secVar.length === 0)){
        checkerForLive = true;

        let liveVarInt = parseFloat(liveVar);
        let secVarInt = parseFloat(secVar);
        liveVar = operator(liveVarInt, oprVar, secVarInt);
        // console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} = ${liveVar}`);

        display.textContent = liveVar.length <= 10 ? liveVar : liveVar.toString().slice(0, 10);
        oprVar = target.textContent;

        // console.log(`This is the Operator: ${oprVar}`);
        secVar = ""
    }else if(target.className.includes("per") && (secVar.length === 0)){
        liveVar = liveVar/100;
        display.textContent = liveVar;
    }else if(target.className.includes("per") && !(secVar.length === 0)){
        if(checkerForPer === false) {
            let liveVarInt = parseFloat(liveVar);
            let secVarInt = parseFloat(secVar);
            liveVar = operator(liveVarInt, oprVar, secVarInt); 
            checkerForPer = true;    

            let temp = liveVar       
            liveVar = liveVar/100;    
            // console.log(`This are Bunch of Values: ${liveVarInt} ${oprVar} ${secVarInt} % = ${liveVar}`);
    
            display.textContent = liveVar;    
        }else {
            let temp = liveVar       
            liveVar = liveVar/100;
    
            // console.log(`This are Bunch of Values: ${temp} % = ${liveVar}`);    
            display.textContent = liveVar;
        }
    }
    if(target.className.includes("alt")) location.reload();
 })

 
function addText(btn){
     btn.textContent;
 }