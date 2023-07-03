const { productService } = require('../../services/storeService');

exports.getAll = async (req, res, next) => {
  try {
    const items = await productService.getAll()
    res.send(items);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await productService.getOne(req.body)
    res.send(item);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const item = await productService.create(req.body)
    res.send(item);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const item = await productService.update(req.params.id, req.body)
    res.send(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await productService.remove(req.params.id)
    res.send(item);
  } catch (err) {
    next(err);
  }
};