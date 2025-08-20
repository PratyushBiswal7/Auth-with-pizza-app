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
    role: decode.role,
  };

  next();
}

function isAdmin(req, res, next) {
  const loggedInUser = req.user;
  if (loggedInUser.role === "ADMIN") {
    next();
  } else {
    return res.status(401).json({
      success: false,
      data: {},
      message: "You are not authorize for this action",
      error: {
        statusCode: 401,
        reason: "Unathorized user for this action",
      },
    });
  }
}

module.exports = { isLoggedIn, isAdmin };
