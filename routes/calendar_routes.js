const express = require('express');
const router = express.Router();
const {getEntries,createEntries, updateEntries, deleteEntries, getEntriesUser} = require('../controllers/calendarEntryController')
const {getFile, postFile, getFiles, deleteFile} = require('../controllers/calendarFileController')
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/')
router.get('/', getEntries)
router.get('/:userId', getEntriesUser)
router.post('/', createEntries)
router.put('/:id', updateEntries)
router.delete('/:id', deleteEntries)

router.get('/files', getFiles)
router.get('/files/:id', getFile)
router.post('/:eventId/files', upload.array('files', 10), postFile)
router.delete('/:eventId/files/:fileId', deleteFile)

module.exports = router