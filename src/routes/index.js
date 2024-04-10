const express = require('express');
const router = express.Router();

router.use('/store', require('./storeRoute'));
router.use('/manga', require('./mangaRoute'));
router.use('/auth', require('./authRoute'));

module.exports = router;
