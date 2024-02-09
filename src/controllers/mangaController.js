const ErrorHandler = require('../middleware/errorHandler');
const Manga = require('../models/mangaModel');
const { callPython } = require('../services/callPython');

exports.getAll = async (req, res, next) => {
  try {
    const items = await Manga.find();
    res.send(items);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await Manga.findById(req.params.id);
    if (!item) throw new ErrorHandler(404, 'Item not found');
    res.send(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    let item = new Manga(req.body);
    item = await item.save();
    res.send(item);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await Manga.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) throw new ErrorHandler(404, 'Item not found');
    res.send(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Manga.findByIdAndRemove(req.params.id);
    if (!item) throw new ErrorHandler(404, 'Item not found');
    res.send(item);
  } catch (err) {
    next(err);
  }
};

exports.syncManga = async (req, res, next) => {
  try {
    console.log('object');
    const item = await callPython('./scripts/sync-manga.py', process.env.MONGODB_URI);
    console.log('item: ',item);
    res.send(item);
  } catch (err) {
    next(err);
  }
};

