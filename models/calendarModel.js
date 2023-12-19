const mongoose = require('mongoose')

const calendarSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please add a title']
        },
        },
    {
        timestamps: true,
    })

module.exports = mongoose.model('Entry', calendarSchema)