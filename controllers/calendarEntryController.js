const asyncHandler = require('express-async-handler')
const Entry = require('../models/calendarModel')


// @desc Get Entries
// @route GET /calendar
// @access Private
const getEntries = asyncHandler( async (req, res) => {
    const entries = await Entry.find()
    res.status(200).json(entries);
})

const getEntriesUser = asyncHandler( async (req, res) => {
    try{
    const entries = await Entry.find({ users: req.params.userId });
    res.status(200).json(entries);}
    catch (error) {
        res.status(500).send('Error retrieving events');
    }
})

// @desc Create Entries
// @route POST /calendar
// @access Private
const createEntries = asyncHandler( async (req, res) => {
    if(!req.body.title){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const entry = await Entry.create({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        color: req.body.color,
        allDay: req.body.allDay,
        textArea: req.body.textArea,
        isOnSite: req.body.isOnSite,
        room: req.body.room,
        remoteLink: req.body.remoteLink,
        isMilestone: req.body.isMilestone,
        users: req.body.users
    })

    res.status(200).json(entry);
})

// @desc Update Entries
// @route PUT /calendar/:id
// @access Private
const updateEntries = asyncHandler( async (req, res) => {

    const entry = await Entry.findById(req.params.id)

    if(!entry)
    {
        res.status(400)
        throw new Error('Entry not found')
    }

    const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {new: true,})
    res.status(200).json(updatedEntry);
})

// @desc Delete Entries
// @route DELETE /calendar/:id
// @access Private
const deleteEntries = asyncHandler( async (req, res) => {

    const entry = await Entry.findById(req.params.id)

    if(!entry){
        res.status(400)
        throw new Error('Entry not found')
    }

   await entry.deleteOne()

    res.status(200).json({id: req.params.id});
})

module.exports = {
    getEntries,
    createEntries,
    updateEntries,
    deleteEntries,
    getEntriesUser
}
