const express = require('express');
const router = express.Router();

router.use('/customer', require('./customerRoute'));
router.use('/product', require('./productRoute'));
router.use('/order', require('./orderRoute'));

module.exports = router;
