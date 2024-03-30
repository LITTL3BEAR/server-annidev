const ErrorHandler = require('../../middleware/errorHandler');
const { Customer } = require('../../models/storeModel');

exports.getAll = async () => {
  try {
    const items = await Customer.find();
    return items;
  } catch (err) {
    throw err;
  }
};

exports.getOne = async (name) => {
  try {
    const item = await Customer.findOne({ name });
    if (!item) throw new ErrorHandler(404, 'Item not found');
    return item;
  } catch (err) {
    throw err;
  }
};

exports.create = async (data) => {
  try {
    const item = new Customer(data);
    const newItem = await item.save();
    return newItem;
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    const item = await Customer.findByIdAndUpdate(id, data, { new: true });
    if (!item) throw new ErrorHandler(404, 'Item not found');
    return item;
  } catch (err) {
    throw err;
  }
};

exports.remove = async (id) => {
  try {
    const item = await Customer.findByIdAndDelete(id);
    if (!item) throw new ErrorHandler(404, 'Item not found');
    return item;
  } catch (err) {
    throw err;
  }
};