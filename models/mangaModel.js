const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  author: {
    type: String,
    trim: true
  },
  chapter: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    trim: true,
    lowercase: true
  },
  link: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  versionKey: false
}
);

const Manga = mongoose.model('mangas', mangaSchema);

module.exports = Manga;