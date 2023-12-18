const express = require('express');
const mongoose = require('mongoose');
const app = express();

const url = 'mongodb+srv://josi_bf:Passwort123@cluster0.6wrt6d2.mongodb.net/?retryWrites=true&w=majority'

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

const calendarRouter = require('./routes/calendar_entries');
app.use('/calendar_entries', calendarRouter);

app.listen(8000, () => {
    console.log("server started on Port 8000");
});


