const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MangaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  author: String,
  link: String,
  chapter: {
    type: Number,
    default: 0,
    required: true
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Done'],
    default: 'New',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Manga', MangaSchema);