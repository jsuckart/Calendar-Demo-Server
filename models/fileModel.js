const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
        filename: {
            type: String,
            required: [true, 'please add a filename']
        },
        contentType: {
            type: String,
            required: [true, 'please add a content Type']
        },
        fileData: {
            type: Buffer,
            required: [true, 'please add the file content']
        },
    },
    {
        timestamps: true,
    })

module.exports = mongoose.model('File', fileSchema)