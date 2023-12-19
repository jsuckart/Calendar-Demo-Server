const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)

const url = 'mongodb+srv://josi_bf:Passwort123@cluster0.6wrt6d2.mongodb.net/?retryWrites=true&w=majority'

const calendarRouter = require('./routes/calendar_routes');
app.use('/calendar', calendarRouter);

/*
async function connect () {
    try{
        await mongoose.connect(url);
        console.log('connected to MongoDB...');
    } catch(error){
        console.error(error);
    }
}

connect();
*/



app.listen(port, () => {
    console.log("server started on Port ", port);
});


