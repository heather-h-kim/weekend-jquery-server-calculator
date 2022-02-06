$(document).ready(readyNow);

function readyNow(){
    console.log('Ready!');
    $('#addition').on('click', getOperator);
    $('#subtraction').on('click', getOperator);
    $('#multiplication').on('click', getOperator);
    $('#division').on('click', getOperator);
    $('#submit').on('click', getOperands);
    $('#submit').on('click', sendData);
    $('#clear').on('click', resetCalculator)
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
        $('#result').empty();
        $('#result').append(`<p>The result is ${response[0].result}</p>`);
    }).catch(function(response){
        console.log('UGHHH');       
    })
}

function resetCalculator(){
    $.ajax({
        method: 'GET',
        url:'/reset'
    }).then(function(response){
        console.log('reset success!');
        clearForm();
    }).catch(function(response){
        console.log('UCHHHH'); 
    })
}

function clearForm(){
    $('#first-operand').val('');
    $('#second-operand').val('');
    $('#result').empty();
}