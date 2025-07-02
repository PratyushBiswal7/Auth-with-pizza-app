const UserService = require("../services/userService");
const userRepository = require("../repositories/userRepository");

async function createUser(req, res) {
  console.log("Create user Controller called");
  console.log(req.body);
  // TODO: Implement user creation logic

  const userService = new UserService(new userRepository());
  console.log(userService);
  try {
    const response = await userService.registerUser(req.body);
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
