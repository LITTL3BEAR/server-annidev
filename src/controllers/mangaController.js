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
    const mangaList = await Manga.find();
    for (let i = 0; i < mangaList.length; i++) {
      const { _id, name, chapter, status, link } = mangaList[i];
      if (!link) continue
      const latestChapter = await getLatestChapter(link)

      if (chapter < latestChapter) await Manga.findByIdAndUpdate(_id, { chapter, status: 'new' });
      else if (chapter == latestChapter && status == 'new') await Manga.findByIdAndUpdate(_id, { status: 'read' });
    }
    res.send('Success');
  } catch (err) {
    next(err);
  }
};

async function getLatestChapter(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const elements = $('.eph-num');
  const chapter = parseInt(elements.eq(1).find('span').text().match(/\d+/)[0])
  if (typeof chapter == 'number') throw Error('Invalid chapter')

  return chapter
}

