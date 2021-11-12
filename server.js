const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const apiRoute = require('./routes/apiRoute.js');
const authRoute = require('./routes/authRoute.js');

// jwt
// const SECRET_KEY = "sidharth-74659"

// connect DB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://user:user@cluster0.0lk24.mongodb.net/todoDatabase?retryWrites=true&w=majority" );

// check connection
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
})
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Mongoose connection error: ' + err);
    }
})


// middlewares
app.use(cors()); 
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './dist/todo')));

app.use('/api', apiRoute);
app.use('/auth', authRoute);


// test
app.get('/test', (req, res) => {
    res.send('Its working... Yayyy!!!!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});