const path = require('path');
const fs = require('fs');
const Entry = require('../models/calendarModel')
const asyncHandler = require('express-async-handler')

const File = require('../models/fileModel'); // Adjust the path to your model

const FILES_DIR = path.join(__dirname, '../FileStorage');

//get all files
const getFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.status(500).send('Error retrieving files');
    }
};

//get one specific file
const getFile = async (req, res) => {
    try {
        const file = await File.findOne({ _id: req.params.id });
        if (!file) {
            return res.status(404).send('File not found');
        }

        res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
        res.set('Content-Type', file.contentType);
        res.send(file.fileData);
    } catch (error) {
        res.status(500).send('Error downloading file');
    }
};

const postFile = async (req, res) => {
    try {
        const eventId = req.params.eventId;

        // Check if event exists
        const event = await Entry.findById(eventId);
        if (!event) {
            return res.status(404).send('Event not found');
        }

        // Process each file and save it to MongoDB
        const fileInfos = await Promise.all(req.files.map(async (file) => {
            const newFile = new File({
                filename: file.originalname,
                contentType: file.mimetype,
                fileData: file.buffer,
            });
            await newFile.save();
            return { fileId: newFile._id, filename: newFile.filename };
        }));


        // Associate uploaded files with the event
        for (let fileInfo of fileInfos) {
            event.files.push({
                fileRef: fileInfo.fileId,
                filename: fileInfo.filename
            });
        }

        await event.save();

        res.send('Files uploaded successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading files');
    }
};

const deleteFile = async (req, res) => {
    try {
        const result = await File.deleteOne({ _id: req.params.fileId });
        if (result.deletedCount === 0) {
            return res.status(404).send('File not found');
        }

        const { eventId, fileId } = req.params;

        const event = await Entry.findById(eventId);
        if (event) {
            event.files = event.files.filter(file => file.fileRef.toString() !== fileId);
            await event.save();
            console.log(event.files, fileId)
            res.send('File and reference deleted successfully');
        } else {
            res.status(404).send('Event not found');
        }
        //res.send('File deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting file');
    }
};
module.exports = {getFile, postFile, getFiles, deleteFile}