const express = require('express');
const colors = require('colors')
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 8000;
const connectDB = require('./config/db')

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(errorHandler)

const uri = 'mongodb+srv://josi_bf:Passwort123@cluster0.6wrt6d2.mongodb.net/?retryWrites=true&w=majority'

const calendarRouter = require('./routes/calendar_routes');
app.use('/calendar', calendarRouter);



app.listen(port, () => {
    console.log("server started on Port ", port);
});


