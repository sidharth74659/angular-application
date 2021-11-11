const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const apiRoute = require('./routes/apiRoute.js');


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
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRoute);


// test
app.get('/test', (req, res) => {
    res.send('Its working... Yayyy!!!!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});