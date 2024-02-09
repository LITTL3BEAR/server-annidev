const express = require('express');
const router = express.Router();

const mangaController = require('../controllers/mangaController');

router.get('/sync', mangaController.syncManga)

router.route('/')
  .get(mangaController.getAll)
  .post(mangaController.create)

router.route('/:id')
  .get(mangaController.getOne)
  .put(mangaController.update)
  .delete(mangaController.remove)

module.exports = router;
