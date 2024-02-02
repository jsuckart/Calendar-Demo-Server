const mongoose = require('mongoose')

const calendarSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'please add a title']
        },

    startDate: {
        type: String,
        required: [true, 'please add a start Date']
    },

    endDate: {
            type: String,
            required: [true, 'please add a end Date']
        },

    color: {
            type: String,
            required: [true, 'please add a color']
        },

    allDay: {
            type: Boolean,
            required: [true, 'please add a allDay value']
        },

    isOnSite: {
        type: Boolean,
        required: [true, 'please add isOnSite value']
    },

    room: {
            type: String,
        },

    remoteLink: {
            type: String,
        },

    isMilestone: {
            type: Boolean,
            required: [true, 'please add isMilestone value']
        },

    files: [{
        fileRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'},
        filename: String
    }],

    users: [{
            type: String,
            required: true
        }]
        },
    {
        timestamps: true,
    })

module.exports = mongoose.model('Entry', calendarSchema)