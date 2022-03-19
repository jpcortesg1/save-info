// Class
const classRefreshToken = require("./../models/RefreshToken");

// Object
const RefreshToken = new classRefreshToken();

// Middleware
const verify = (req, res, next) => {
  // Get authorization of headers
  const authHeader = req.headers.authorization;

  // If authorization
  if (authHeader) {
    // Get only token
    const token = authHeader.split(" ")[1];
    const verify = RefreshToken.verifyToken(token, process.env.SECRET_KEY);
    const { error, user } = verify;
    if (error) {
      return res.status(403).json(error);
    }
    req.user = user;
    // console.log("gonorrea")
    next();
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

module.exports = verify;
