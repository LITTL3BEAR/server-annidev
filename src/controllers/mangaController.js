const ErrorHandler = require('../middleware/errorHandler');
const Manga = require('../models/mangaModel');
const { callPython } = require('../services/callPython');
const cheerio = require('cheerio');

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
    const item = await Manga.findByIdAndUpdate(req.params.id, req.body);
    if (!item) throw new ErrorHandler(404, 'Item not found');
    res.send(item);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await Manga.findByIdAndDelete(req.params.id);
    if (!item) throw new ErrorHandler(404, 'Item not found');
    res.send(item);
  } catch (err) {
    next(err);
  }
};

exports.syncManga = async (req, res, next) => {
  try {
    const mangaList = await Manga.find();
    for (let i = 0; i < mangaList.length; i++) {
      const { _id, title, currentChapter, status, website } = mangaList[i];
      if (!website || !currentChapter) continue

      const latestChapter = await getLatestChapter(website)
      if (currentChapter === latestChapter) continue

      await Manga.findByIdAndUpdate(_id, { latestChapter, status: 'new' });
    }
    res.send({ message: 'Success' })
  } catch (err) {
    next(err);
  }
};

async function getLatestChapter(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const elements = $('.eph-num');
  const chapter = parseFloat(elements.eq(1).find('span').text().match(/\d+(\.\d+)?/)[0])
  if (typeof chapter != 'number') throw Error('Invalid chapter')
  return chapter
}
