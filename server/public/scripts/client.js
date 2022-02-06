$(document).ready(readyNow);

function readyNow(){
    console.log('Ready!');
    $('#addition').on('click', getOperator);
    $('#subtraction').on('click', getOperator);
    $('#multiplication').on('click', getOperator);
    $('#division').on('click', getOperator);
    $('#submit').on('click', getOperands);
    $('#submit').on('click', sendData);
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

function getOperands(){
    dataToSend.firstOperand = $('#first-operand').val();
    dataToSend.secondOperand = $('#second-operand').val();
    console.log(dataToSend);
}

function sendData(){
    $.ajax({
        method: 'POST',
        url: '/numbers',
        data: dataToSend
    }).then(function (response){
        console.log('success', response);
        calculateNumbers();   
    }).catch(function(err){
        alert('request failed');
    })
}

function calculateNumbers(){
    $.ajax({
        method: 'GET',
        url:'/numbers'
    }).then(function (response){
        console.log('success!', response);
    }).catch(function(response){
        console.log('UGHHH');       
    })
}