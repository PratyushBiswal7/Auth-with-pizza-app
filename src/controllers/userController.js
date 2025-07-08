const { registerUser } = require("../services/userService");

async function createUser(req, res) {
  try {
    const response = await registerUser(req.body);
    res.status(201).json({
      message: "Successfully registered a user",
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.reason || "Internal Server Error",
      success: false,
      data: null,
    });
  }
}

module.exports = {
  createUser,
};
