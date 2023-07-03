const ErrorHandler = require('../../middlewares/errorHandler');
const { Order } = require('../../models/storeModel');

exports.getAll = async () => {
  try {
    const items = await Order.find();
    return items;
  } catch (err) {
    throw err;
  }
};

exports.getOne = async (name) => {
  try {
    const item = await Order.findOne({ name });
    if (!item) throw new ErrorHandler(404, 'Item not found');
    return item;
  } catch (err) {
    throw err;
  }
};

exports.create = async (data) => {
  try {
    const item = new Order(data);
    const newItem = await item.save();
    return newItem;
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Order.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new ErrorHandler(404, 'Item not found');
    return item;
  } catch (err) {
    throw err;
  }
};

exports.remove = async (id) => {
  try {
    const item = await Order.findByIdAndRemove(id);
    if (!item) throw new ErrorHandler(404, 'Item not found');
    return item;
  } catch (err) {
    throw err;
  }
};