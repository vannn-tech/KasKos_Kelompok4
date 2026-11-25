const express = require('express');
const { getPenghuni, registerPenghuni } = require('../controllers/penghuniController');
const router = express.Router();

router.get('/', getPenghuni);
router.post('/register', registerPenghuni);

module.exports = router;
