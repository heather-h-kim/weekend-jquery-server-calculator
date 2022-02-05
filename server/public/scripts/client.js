$(document).ready(readyNow);

function readyNow(){
    console.log('Ready!');
    $('#addition').on('click', getOperator);
    $('#subtraction').on('click', getOperator);
    $('#multiplication').on('click', getOperator);
    $('#division').on('click', getOperator);
    
}

const dataToSend = {
    firstOperand: 0,
    secondOperand: 0,
    operator: '+'
}

function getOperator(){
    console.log('in getOperator');
    dataToSend.operator = $(this).data().operator;
    console.log(dataToSend);
}



