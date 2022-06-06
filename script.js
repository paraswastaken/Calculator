// object for identifying operator and performing corresponding opration
let mathObj = {
    '+': (x, y)=>x+y,
    '-': (x, y)=>x-y,
    '*': (x, y)=>x*y,
    '/': (x, y)=>x/y,
}

// initialising all needed variables
let flag=null; // to keep track of current oprator
let operand1=null, operand2=null;
let reset=false; // to keep track of when to reset the calculator after any calculation

// query selecting displays
const mainD = document.querySelector(".mainDisp");
const topD = document.querySelector(".prevInput");

// function for handling the event when user clicks any operator button
function operator(e){
    let op;
    if(e.type === 'keydown') op = e.key;
    else op = e.target.textContent;
    reset=false;
    if(operand1!==null && mainD.textContent){
        operand2 = parseFloat(mainD.textContent);
        if(operate(operand1, operand2) === Infinity){
            topD.textContent = '';
            mainD.textContent = "You Can't Divide By Zero"
            return;
        }
        operand1 = operate(operand1, operand2);
        topD.textContent = `${operand1}` + ' ' + op;
        operand2 = null;
        mainD.textContent = '';
        flag = op;
        return;
    }
    flag = op;
    operand1 = parseFloat(mainD.textContent);
    topD.textContent = mainD.textContent + ' ' + op;
    mainD.textContent = '';
}

// function to handle the event when user clicks "=" button
function equals(){
    if(mainD.textContent){
        operand2 = parseFloat(mainD.textContent);
    }
    if(operand1===null || operand2===null){
        return;
    }
    topD.textContent = '';
    if(operate(operand1, operand2) === Infinity){
        mainD.textContent = "You Can't Divide By Zero";
        return;
    }
    mainD.textContent = `${operate(operand1, operand2)}`;
    operand1 =null;
    operand2 = null;
    flag = null;
    reset = true;
}

// function for performing arithmetic operation when certain criterion is met
// those certain criteria are checked in *operator* and *equals* functions
function operate(a, b){
    return mathObj[flag](a, b)
}

// query selecting all clickable buttons on page
const buttons = document.querySelectorAll("button");

// run a for loop on the buttons iterable, check for certain conditions such as what button was pressed
// and add a corresponding event listener function
for(button of buttons){
    if(button.textContent in mathObj){
        button.addEventListener('click', operator);
    }
    else if(button.textContent === '='){
        button.addEventListener('click', equals);
    }
    else if(button.textContent === 'AC'){
        button.addEventListener('click', ()=>{
            mainD.textContent = '';
            topD.textContent = '';
            operand1 =null;
            operand2 = null;
            flag = null;
        })
    }
    else if(button.textContent === 'Delete'){
        button.addEventListener('click', ()=>{
            if(!mainD.textContent){return;}
            mainD.textContent = mainD.textContent.slice(0,-1);
        })
    }
    else{
        button.addEventListener('click',(e)=> {
            if((mainD.textContent && isNaN(parseFloat(mainD.textContent)))||reset){
                mainD.textContent = '';
                operand1 =null;
                operand2 = null;
                flag = null;
                reset = false;
            }
            mainD.textContent = mainD.textContent + e.target.textContent;
        });
    }
}

// event listener for  handling keyboard inputs
window.addEventListener('keydown', handleKeyboard);

function handleKeyboard(e){
    console.log(typeof(e.code))
    if(e.key in mathObj){
        operator(e);
    }
    else if(e.key === '='||'Enter'){
        equals();
        
    }
    else if(e.key === 'Backspace'){
        if(!mainD.textContent){return;}
        mainD.textContent = mainD.textContent.slice(0,-1);
    }
    else if(e.key>='0' && e.key<='9'){
        if((mainD.textContent && isNaN(parseFloat(mainD.textContent)))||reset){
            mainD.textContent = '';
            operand1 =null;
            operand2 = null;
            flag = null;
            reset = false;
        }
        mainD.textContent = mainD.textContent + e.key;
    }
}