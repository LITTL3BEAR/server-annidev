if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const handleError = require('./middlewares/errorMiddleware');
const ErrorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, HOST = '0.0.0.0' } = process.env;
const app = express();

connectDB();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .use(express.static(path.join(__dirname, '../client/dist/annidev-client')))

  .use('/api/manga', require('./routes/mangaRoute'))
  .get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/annidev-client/index.html'))
  })

  .use((req, res, next) => next(new ErrorHandler(404, 'API route not found')))
  .use(handleError);

app.listen(PORT, () => console.log(`Server running on http://${HOST}:${PORT}`));
