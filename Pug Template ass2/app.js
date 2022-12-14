const express = require("express");
const fs = require('fs');
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about');
})
app.get('/gallery', (req, res) => {
    res.render('gallery');
})
app.get('/services', (req, res) => {
    res.render('services');
})
app.get('/contact', (req, res) => {
    res.render('contact');
})
app.post('/data', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.pass;
    let age = req.body.age;
    let city = req.body.city;
    let mobile = req.body.mobile;
var name1 = /^[a-z A-Z]+$/;
var email1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var pass1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}$/;
var age1 = /^[0-9]{2}$/;
var city1 = /^[a-z A-Z]+$/;
var mobile1=/^\d{10}$/;
let nameErr;
let emailErr;
let passErr;    
let ageErr;
let cityErr;
let mobileErr;

if(name1.test(name) && email1.test(email) && pass1.test(pass) && age1.test(age) && city1.test(city) && mobile1.test(mobile) ) {

    let data = `Name :- ${name}, Email :- ${email}, Password :- ${pass}, Age :- ${age}, City :- ${city}, Mobile :- ${mobile}` + '\n';

    fs.appendFile('file.txt', data + '\n', err => {
        if(err) throw err;
    })

    res.send('data is added');
}
else {
    if(!name1.test(name)) {
        nameErr = 'Only latter and white spaces allow';
    }
    if(!email1.test(email)) {
        emailErr = 'Email address is not valid';
    }
    if(!pass1.test(pass)) {
        passErr = 'password between 8 to 24 characters which contain at least one  uppercase,lowercase'
    }
    if(!age1.test(age)) {
        ageErr = 'Only two digit number is allowed'
    }
    if(!city1.test(city)) {
        cityErr = 'Only latter and white spaces allow';
    }
    if(!mobile1.test(mobile)) {
        mobileErr = 'Only ten numbers allowed';
    }
    res.render('contact', { nameErr: nameErr, passErr: passErr, emailErr: emailErr, cityErr: cityErr, ageErr: ageErr ,mobileErr :mobileErr })
}


})

app.get('/details', (req, res) => {
    var array = fs.readFileSync('file.txt').toString().split("\n");
    const result = filter(array);
    res.render('details', {file : result});
})

function filter(array){
    const result = [];
    array.forEach(ele => {
        if(ele.length != 0){
            result.push(ele);
        }
    })

    return result;
}

app.listen(PORT, err => {
    if(err) throw err;
    else console.log(`Server is run on ${PORT}`);
})