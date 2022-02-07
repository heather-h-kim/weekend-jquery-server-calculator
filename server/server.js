const express = require('express');
const bodyParser = require('body-parser');

const { send } = require('process');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));


app.listen(port, () => {
    console.log('listening on port', PORT);
});

//create an empty array to store data 
let arr = [];

//per the request from the client, perform arithmetic operation and send the results back to the client
app.get('/numbers', function (req, res) {
    console.log('Request at /numbers was made', req.body);
    res.send(arr);
})


//push the data received from the client to the array
app.post('/numbers', function (req, res) {
    console.log('in /numbers POST', req.body);
    let calculation = 0;
    let firstOperand = Number(req.body.firstOperand);
    let secondOperand = Number(req.body.secondOperand);
    let operator = req.body.operator;
    if (operator === '+') {
        calculation = firstOperand + secondOperand;
    } else if (operator === '-') {
        calculation = firstOperand - secondOperand;
    } else if (operator === '*') {
        calculation = firstOperand * secondOperand;
    } else if (operator === '/') {
        calculation = firstOperand / secondOperand;
    }
    req.body.result = calculation;
    arr.push(req.body);
    console.log('arr is now', arr);

    res.sendStatus(201);
});


