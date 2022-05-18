const jwt = require("jsonwebtoken");

const getMyIp = (req) => {
  return (
    req.socket.remoteAddress |
    req.connection.remoteAddress |
    req.headers["x-forwarded-for"]
  );
};

const verifyToken = (token) => {
  if (!token) {
    return false;
  }
  try {
    return jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    return false;
  }
};

module.exports = {
  verifyToken,
  getMyIp,
};
