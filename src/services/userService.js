const { findUser, createUser } = require("../repositories/userRepository");

async function registerUser(userDetails) {
  // It will create a new user in the database and return the details of created user
  const user = await findUser({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
  });

  if (user) {
    throw {
      status: 400,
      reason: "User already exists with this email or mobile number",
    };
  }
  // Create a new user
  const newUser = await createUser({
    email: userDetails.email,
    mobileNumber: userDetails.mobileNumber,
    password: userDetails.password,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
  });

  if (!newUser) {
    throw {
      status: 500,
      reason: "Failed to create user",
    };
  }

  return newUser;
}

module.exports = { registerUser };
