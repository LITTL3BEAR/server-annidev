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
    set: v => v || 0
  },
  status: {
    type: String,
    enum: ['New', 'Read', 'Done'],
    default: 'New',
    set: v => v || 'New'
  }
}, { timestamps: true });

module.exports = mongoose.model('Manga', MangaSchema);