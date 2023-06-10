const express = require('express');
const router = express.Router();

const mangaController = require('../controllers/mangaController');

router.get('/', mangaController.getAll);
router.get('/:id', mangaController.getOne);
router.post('/', mangaController.create);
router.put('/:id', mangaController.update);
router.delete('/:id', mangaController.remove);

module.exports = router;
