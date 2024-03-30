const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MangaSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  currentChapter: {
    type: Number,
    default: 0,
    set: v => v || 0
  },
  latestChapter: {
    type: Number,
    default: 0,
    set: v => v || 0
  },
  status: {
    type: String,
    enum: ['new', 'read', 'done'],
    default: 'new',
    set: v => v || 'new'
  },
  website: String
}, { timestamps: true });

module.exports = mongoose.model('Manga', MangaSchema);