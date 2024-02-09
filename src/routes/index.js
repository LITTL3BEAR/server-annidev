const express = require('express');
const router = express.Router();

router.use('/store', require('./storeRoute'));
router.use('/manga', require('./mangaRoute'));

module.exports = router;
