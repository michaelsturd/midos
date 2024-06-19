const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const db = require('./config/db');
// const UserSchema = require('./model/usercontroller');
const urlencodedparser = bodyParser.urlencoded({extebded: false});

const mongoose = require("mongoose")

const UserSchema =  new mongoose.Schema({
    fullname: String,
    email: String,
    phone: String,
    password: String

    
});

// create model 
const clients = mongoose.model('clients', UserSchema)

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.get('/', (req, res)=>{
    // res.writeHead(200,  {'Content-Type': 'text/html'})
    // res.sendFile(__dirname + '/index.html', 'utf8')
    res.render('index')
});
db();
app.get('/register', (req, res)=>{
    res.render('register')
});

app.get('/books', (req, res)=>{
    res.render('book')
})
// post books 
app.post('/books', urlencodedparser, (req, res)=>{
    // create schema for books
    const bookSchema = new mongoose.Schema({
        title: String,
        price: Number
    });

    // create model for books 
    const bookshops = mongoose.model('bookshops', bookSchema);
    const booked = bookshops(req.body).save()
    .then((success)=>{
        console.log('book saved successful')
        res.send({response: "You have successfully added a book to you shop"})
       
    }).catch((error)=>{
        console.log('failed saving book, try again')
        res.send({response: "Unable to add books to the shop"})
       
    })
})
// handle post request from registration page 
app.post('/register', urlencodedparser, (req, res)=>{
    // console.log(req.body.email);
    // let resEmail = req.body.email
    
    const { fullname, email, phone, password } = req.body;
    const userData = {
        fullname,
        email,
        phone,
        password
     };
    // res.send({resemail: resEmail});
    const retrieveData = clients.findOne({email})
    if (retrieveData) {
         console.log("User already registered")
        
     }else{
        const newUsers = clients(req.body).save()
        .then((success) =>{
            console.log('successfully created an account.')
            // console.log({retrieveData})
            res.send({response: "You have successfully completed your registration"})
        })
        .catch((error)=>{
            console.log(error)
        })
     }
   
    // const signUp = async (req, res)=>{

    // const { fullname, email, phone, password } = req.body;
    // const userData = {
    //     fullname,
    //     email,
    //     phone,
    //     password
    //  };

    //  User.create(userData).then((data, err) => {
    //     if (err) console.log(res.status(StatusCodes.BAD_REQUEST).json({ err }));
    //     else
    //       res
    //        .status(StatusCodes.CREATED)
    //        .json({ message: "User created Successfully" });
    //        console.log('successfully created users')
    //     });
   
    // }
    // console.log(us)
    // add users 
    // const addUsers = User(req.body.name).insert({})
    //     .then((success) =>{
    //         console.log('successfully saved users', addUsers)
    //     })

    
});

app.get('/feed', (req, res)=>{
    res.render('feed')
})

app.listen(3000, console.log('listening to port 3000'));