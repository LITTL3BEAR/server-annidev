const ErrorHandler = require('../middleware/errorHandler');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) throw new ErrorHandler(400, 'Username, email, and password are required');

    const user = await User.findOne({ username });
    if (user) throw new ErrorHandler(400, 'Username already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    if (!newUser) throw new ErrorHandler(500, 'Error creating user');

    
  } catch (err) {
    console.error('LOG|auth|register|ERR|', err.message);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) throw new ErrorHandler(400, 'Username and password are required');

    const user = await User.findOne({ username });
    if (!user) throw new ErrorHandler(401, 'Invalid username or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new ErrorHandler(401, 'Invalid username or password');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token });

  } catch (err) {
    console.error('LOG|auth|login|ERR|', err.message);
    next(err);
  }
};
