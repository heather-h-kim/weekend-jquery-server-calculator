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

let arr = [];


app.get('/numbers', function(req, res){
    console.log('Request at /numbers was made', req.body);

    let firstOperand = arr[0].firstOperand;
    console.log('first operand is', firstOperand);
    
    let secondOperand = arr[0].secondOperand;
    console.log('second operand is', secondOperand);
    
    let operator = arr[0].operator;
    console.log('operator is', operator);

    let result = eval(firstOperand + operator + secondOperand);

    arr[0].result = result;

   console.log('arr is now ', arr);
    
   res.send(arr);
   
})


app.post('/numbers', function(req,res){
    console.log('in /numbers POST', req.body);
    arr.push(req.body);
    res.send(req.body);
});


app.get('/reset', function(req, res){
    console.log('Request at /reset was made');
    arr = [];
    res.send(arr);
})
