const ErrorHandler = require('../middleware/errorHandler');
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) throw new ErrorHandler(401, 'Unauthorized');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
     if (error.message === "Invalid token") {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else if (error.message === "Token expired") {
      res.status(401).json({ message: "Unauthorized: Token expired" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}