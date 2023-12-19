const express = require('express');
const router = express.Router();
const {getEntries,createEntries, updateEntries, deleteEntries} = require('../controllers/calendarEntryController')

router.get('/')

router.get('/', getEntries)
router.post('/', createEntries)
router.put('/:id', updateEntries)
router.delete('/:id', deleteEntries)

module.exports = router