const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'Access denied. Token required.' });
  }

  // Verify the token using the secret stored in the environment variable
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // Store the decoded user data (including role) in the request object for later use
    req.user = decoded;
    
    // Continue with the request handling process
    next();
  });
};


module.exports = authenticateToken;
