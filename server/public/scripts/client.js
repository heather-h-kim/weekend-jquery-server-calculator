$(document).ready(readyNow);

function readyNow(){
    console.log('Ready!');
    $('.operator').on('click',getOperator);
    $('#submit').on('click', handleSubmit);
    $('#clear').on('click', clearForm);
}

//create a data object to send to the server
const dataToSend = {
    firstOperand: 0,
    secondOperand: 0,
    operator: '+'
}


//grab operator values from DOM
function getOperator(){
    console.log('in getOperator');
    dataToSend.operator = $(this).data().operator;
    console.log(dataToSend);
}

//grab operand values from DOM
function getOperands(){
    dataToSend.firstOperand = $('#first-operand').val();
    dataToSend.secondOperand = $('#second-operand').val();
    console.log(dataToSend);
}

//send data to the server
function handleSubmit(){
    getOperands()
    $.ajax({
        method: 'POST',
        url: '/numbers',
        data: dataToSend
    }).then(function (response){
        console.log('success', response);
        calculateNumbers();  //when the sever sends back data, send calculation request back to the server 
    }).catch(function(err){
        alert('request failed');
    })
}

//send calculation request to the server
function calculateNumbers(){
    $.ajax({
        method: 'GET',
        url:'/numbers'
    }).then(function (response){
        console.log('success!', response);
        $('#result').empty();
        $('#result').append(response[response.length-1].result);
        renderToDom(response); //render the received data to DOM
    }).catch(function(response){
        console.log('UGHHH');       
    })
}

//append history of the calculations
function renderToDom(arr){
    $('#list').empty();
    for(let element of arr){
        let firstOperand = element.firstOperand;
        let secondOperand = element.secondOperand;
        let operator = element.operator;
        let result = element.result
        $('#list').append(`<li>${firstOperand} ${operator} ${secondOperand} = ${result}</li>`)
    }
}

//clear form when C button is clicked
function clearForm(){
    $('#first-operand').val('');
    $('#second-operand').val('');
}