if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const handleError = require('./src/middleware/errorMiddleware');
const ErrorHandler = require('./src/middleware/errorHandler');

const port = process.env.PORT || 3000;
const app = express();
 
connectDB();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .use(express.static(path.join(__dirname, 'public')))

  .use('/api', require('./src/routes'))
  .use((req, res, next) => next(new ErrorHandler(404, 'API route not found')))
  .use(handleError);

app.listen(port, () => console.log(`Server running on port ${port}`));
