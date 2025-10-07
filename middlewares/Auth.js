// middleware/auth.js
function auth(req, res, next) {
  const token = req.headers['authorization']; // e.g. "Bearer mytoken123"

  if (token === 'BearerMySecretToken') {
    next(); // Allow access
  } else {
    res.status(401).json({ message: 'Unauthorized access' });
  }
}

module.exports = auth;
