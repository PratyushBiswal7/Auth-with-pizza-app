const { loginUser } = require("../services/authService");

async function login(req, res) {
  try {
    const loginPayload = req.body;
    const response = await loginUser(loginPayload);
    return res.status(200).json({
      success: "true",
      message: "Logged In SuccessFully",
      data: response,
      error: {},
    });
  } catch (error) {
    return res.status(err.statusCode).json({
      success: "false",
      message: error.message,
      error: error,
    });
  }
}

module.exports = {
  login,
};
