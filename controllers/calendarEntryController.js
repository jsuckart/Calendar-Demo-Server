const asyncHandler = require('express-async-handler')



// @desc Get Entries
// @route GET /calendar
// @access Private
const getEntries = asyncHandler( async (req, res) => {
    res.status(200).json({message: 'get Entries'});
})

// @desc Create Entries
// @route POST /calendar
// @access Private
const createEntries = asyncHandler( async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({message: 'create Entries'});
})

// @desc Update Entries
// @route PUT /calendar/:id
// @access Private
const updateEntries = asyncHandler( async (req, res) => {

    res.status(200).json({message: `update Entry ${req.params.id}`});
})

// @desc Delete Entries
// @route DELETE /calendar/:id
// @access Private
const deleteEntries = asyncHandler( async (req, res) => {
    res.status(200).json({message: `delete Entry ${req.params.id}`});
})

module.exports = {
    getEntries,
    createEntries,
    updateEntries,
    deleteEntries,
}
