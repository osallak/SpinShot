require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');



const app = express();
app.use(cookieParser());


app.get('/', (req, res) => {
    res.cookie('name', 'express', { maxAge: 900000, httpOnly: true });
    res.redirect('/home');
});


app.get('/home', (req, res) => {
    console.log(req.cookies.name);
    res.send('got the cookies!');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});