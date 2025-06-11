const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user; //access to `req.user.id`
    next();
  });
}

module.exports = authMiddleware;
