const express = require('express');
const { getKamar, createKamar, deleteKamar } = require('../controllers/kamarController');
const router = express.Router();

router.get('/', getKamar);
router.post('/', createKamar);
router.delete('/:id', deleteKamar);

module.exports = router;
