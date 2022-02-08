//Constants

const buttons = document.querySelectorAll('.button');
const numbers = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const clear = document.querySelector('.clear');
const addButton = document.querySelector('.add');
const subButton = document.querySelector('.subtract');
const divButton = document.querySelector('.divide');
const mulButton = document.querySelector('.multiply');
const equalsButton = document.querySelector('.equals');
const ouch = document.querySelector('.ouch');
const backSpace = document.querySelector('.backSpace');
const addDeci = document.querySelector('.deci');
const blinker = document.querySelector('.blinker');



let num1 = null;
let num2 = null;
let opSelected = null;
let typeToClear = true;

//General Functions

function initialize() {
numbers.forEach(number => number.addEventListener('click', buttonPress))
clear.addEventListener('click', clearScreen);
addButton.addEventListener('click', setOperator);
subButton.addEventListener('click', setOperator);
divButton.addEventListener('click', setOperator);
mulButton.addEventListener('click', setOperator);
equalsButton.addEventListener('click', operate);
backSpace.addEventListener('click', setBackspace);
addDeci.addEventListener('click', addDecimal);
window.addEventListener('keydown', keyPressed);
clearScreen();
}
function removeBlink(){
    blinker.classList.remove('blink');
    blinker.innerHTML = '';
}
function addBlink(){
    blinker.classList.add('blink');
    blinker.innerHTML = '|';
}

function keyPressed(e){
    let keyedCode = e.keyCode;
    let keyedString = e.key;
    if ((keyedCode >= 48 && keyedCode <=57 && !(e.shiftKey)) || (keyedCode>=96 && keyedCode <= 105)){
        buttonPressKey(e.key);
    }
    else if (keyedCode == 191 || (keyedCode == 56 && e.shiftKey) || 
             keyedCode == 189 || (keyedCode == 187 && e.shiftKey)||
             (keyedCode == 106 || keyedCode == 107 || keyedCode == 109 || keyedCode == 111))
    { 
        setOpKey(e.key);
    }
    else if (keyedCode == 8 ){
        setBackspace();
    }
    else if (keyedCode == 27){
        clearScreen();
    }
    else if (keyedCode == 13){
        operate();
    }
    else if (keyedCode == 190 || keyedCode == 110){
        addDecimal();
    }
}

function buttonPressKey(keyedCode){
    if(typeToClear == true){
        screen.innerHTML = ''
        typeToClear = false;
    }
    else if (screen.innerHTML.length  == 9){
        return;
    }
    addBlink();
    screen.innerHTML= screen.innerHTML.concat(keyedCode);
}

function setOpKey(keyedCode){
    if(opSelected !== null ){
        opSelected = keyedCode;
        ouch.innerHTML = opSelected;
        return;
    }

    opSelected = keyedCode;
    num1= Number(screen.innerHTML);
     ouch.innerHTML = opSelected;
     screen.innerHTML = '';
}

//Calc Functions

function add(x,y){
    return (x + y);
}
function subtract(x,y){
    return (x - y);
}
function divide(x,y){
    return (x / y);
}
function multiply(x,y){
    return (x * y);
}
function buttonPress(e){
    if(typeToClear == true){
        screen.innerHTML = ''
        typeToClear = false;
    }
    else if (screen.innerHTML.length  == 9){
        return;
    }
    addBlink();
    screen.innerHTML= screen.innerHTML.concat(e.target.innerHTML);
}
function clearScreen(){
    screen.innerHTML = '';
    ouch.innerHTML = '';
    num1 = null;
    num2 = null;
    opSelected = null;
    typeToClear = true;
    addBlink();

}
function operate(){
    if(opSelected == null){
        screen.innerHTML='Error.'
        typeToClear = true;
        return;
    }
    num2 = Number(screen.innerHTML)
    switch(opSelected){
        case '+': 
            screen.innerHTML=add(num1,num2);
            break;
        case '-':
            screen.innerHTML=subtract(num1,num2);
            break;
        case '*':
            screen.innerHTML=multiply(num1,num2);
            break;
        case '/':
            if(num2==0){
                screen.innerHTML = 'DIVIDEBYZERO'
                opSelected = null;
                ouch.innerHTML = opSelected;
                typeToClear = true;
                return;
            }
            screen.innerHTML=divide(num1,num2);
            break;
    }
    if(Number(screen.innerHTML) >999999999){
        screen.innerHTML = Number.parseFloat(screen.innerHTML).toExponential(5)
    }
    removeBlink();
    num1 = Number(screen.innerHTML);
    ouch.innerHTML = '';
    
}
function setOperator(e){
    
    if(opSelected !== null ){
        num2 = screen.innerHTML
        operate();
        opSelected = e.target.innerHTML;
        ouch.innerHTML = opSelected;
        num1 = screen.innerHTML;
        typeToClear = true;
        return;
    }

    opSelected = e.target.innerHTML;
    num1= Number(screen.innerHTML);
     ouch.innerHTML = opSelected;
     screen.innerHTML = '';
   
} 
function setBackspace(){
    screen.innerHTML = screen.innerHTML.slice(0,-1);
}
function addDecimal(){
    substring = '.'
    if(typeToClear == true){
        screen.innerHTML = '0.';
        typeToClear = false;
        return;
    }
    else if (screen.innerHTML.includes(substring) == true){
        return;
    }
    else if (screen.innerHTML.length >= 8){
        return;
    }
    screen.innerHTML= screen.innerHTML.concat(substring);
}


//Starting Scripts
initialize();
