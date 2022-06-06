let mathObj = {
    '+': (x, y)=>x+y,
    '-': (x, y)=>x-y,
    '*': (x, y)=>x*y,
    '/': (x, y)=>x/y,
}

let flag=null, op1=null, op2=null;
const mainD = document.querySelector(".mainDisp");
console.log(mainD.textContent);
const topD = document.querySelector(".prevInput");

function operator(e){
    if(op1!==null){
        op2 = Number(mainD.textContent);
        op1 = operate(op1, op2);
        topD.textContent = `${op1}`;
        op2 = null;
        mainD.textContent = '';
        flag = e.target.textContent;
        return;
    }
    flag = e.target.textContent;
    op1 = Number(mainD.textContent);
    topD.textContent = mainD.textContent + ' ' + e.target.textContent;
    mainD.textContent = '';
}

function equals(e){
    if(mainD.textContent){
        op2 = Number(mainD.textContent);
    }
    if(op1===null || op2===null){
        return;
    }
    op2 = Number(mainD.textContent);
    topD.textContent = '';
    mainD.textContent = `${operate(op1, op2)}`;
    op1 =null;
    op2 = null;
    flag = null;
}

function operate(a, b){
    return mathObj[flag](a, b)
}


const buttons = document.querySelectorAll("button");
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
            op1 =null;
            op2 = null;
            flag = null;
        })
    }
    else{
        button.addEventListener('click',(e)=> mainD.textContent = mainD.textContent + e.target.textContent);
    }
}