const express = require('express');
const bodyParser = require('body-parser');

const { send } = require('process');

const app = express();

const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('server/public'));


app.listen(port, () => {
    console.log('listening on port', port);  
});

//create an empty array to store data 
let arr = [];

//per the request from the client, perform arithmetic operation and send the results back to the client
app.get('/numbers', function(req, res){
    console.log('Request at /numbers was made', req.body);
    let calculation = 0;
    for(let number of arr){
        let firstOperand = Number(number.firstOperand);
        console.log('first operand is', firstOperand);
        let secondOperand = Number(number.secondOperand);
        console.log('second operand is', secondOperand);
        let operator = number.operator;
        console.log('operator is', operator);
        if(operator === '+'){
            calculation = firstOperand + secondOperand;
        }else if(operator === '-'){
            calculation = firstOperand - secondOperand;
        }else if(operator === '*'){
            calculation = firstOperand * secondOperand;
        }else if(operator === '/'){
            calculation = firstOperand / secondOperand;
        }
        number.result = calculation;
    }
   console.log('arr is now ', arr);  
   res.send(arr);
})


//push the data received from the client to the array
app.post('/numbers', function(req,res){
    console.log('in /numbers POST', req.body);
    arr.push(req.body);
    res.send(req.body);
});


