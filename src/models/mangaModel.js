const mongoose = require('mongoose');

const MangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  currentChapter: {
    type: Number,
    default: 0
  },
  latestChapter: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['', 'new', 'read', 'done'],
    default: ''
  },
  website: String
}, { timestamps: true });

module.exports = mongoose.model('Manga', MangaSchema);