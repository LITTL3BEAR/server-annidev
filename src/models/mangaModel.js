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
    enum: ['new', 'read', 'done'],
    default: 'new',
    set: v => v || 'new'
  }
}, { timestamps: true });

module.exports = mongoose.model('Manga', MangaSchema);