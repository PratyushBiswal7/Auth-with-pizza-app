const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

async function isLoggedIn(req, res, next) {
  const token = req.cookies.authToken;
  if (!token) {
    res.status(401).json({
      success: "false",
      data: {},
      error: "Un-Authorized!",
      message: "No Auth Token Provided!",
    });
  }

  const decode = jwt.verify(token, JWT_SECRET);
  if (!decode) {
    res.status(401).json({
      success: "false",
      data: {},
      error: "Un-Authorized!",
      message: "Invalid Token Provided!",
    });
  }

  //If reached here allow them to access the api.
  req.user = {
    email: decode.email,
    id: decode.id,
  };

  next();
}

module.exports = { isLoggedIn };
