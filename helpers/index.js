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
const toRadians = (degree) => {
  return (degree * Math.PI) / 180;
};
const calCulateDistance = (latitude1, longitude1, latitude2, longitude2) => {
  var R = 6371;
  var deltaLatitude = toRadians(latitude2 - latitude1);
  var deltaLongitude = toRadians(longitude2 - longitude1);
  latitude1 = toRadians(latitude1);
  latitude2 = toRadians(latitude2);
  var a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

const randomNumber = () => {
  const max = 99999;
  const min = 11111;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = {
  verifyToken,
  calCulateDistance,
  randomNumber,
  getMyIp,
};
