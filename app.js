const express = require("express");
const app = express();
app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.get('/', (req, res)=>{
    // res.writeHead(200,  {'Content-Type': 'text/html'})
    // res.sendFile(__dirname + '/index.html', 'utf8')
    res.render('index')
});

app.get('/register', (req, res)=>{
    res.render('register')
})
app.listen(3000, console.log('listening to port 3000'));