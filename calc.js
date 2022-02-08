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
clearScreen();
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
        screen.classList.remove('blink');
    }
    else if (screen.innerHTML.length  == 9){
        return;
    }
    screen.innerHTML= screen.innerHTML.concat(e.target.innerHTML);
}
function clearScreen(){
    screen.innerHTML = '|';
    ouch.innerHTML = '';
    num1 = null;
    num2 = null;
    opSelected = null;
    typeToClear = true;
    screen.classList.add('blink');

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
        case 'x':
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
    num1 = Number(screen.innerHTML);
    opSelected = null;
    ouch.innerHTML = '';
    
}
function setOperator(e){
    
    if(opSelected !== null ){
        opSelected = e.target.innerHTML;
        ouch.innerHTML = opSelected;
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
