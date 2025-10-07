// middleware/logger.js
function logger(req, res, next) {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Move to next middleware or route
}

module.exports = logger;
