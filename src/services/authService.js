const { findUser } = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

async function loginUser(userDetails) {
  const email = userDetails.email;
  const plainPassword = userDetails.password;
  //check any user exist of the given email
  const user = await findUser({ email });

  if (!user) {
    throw { message: "No user found with the given Email", statusCode: 404 };
  }
  //verify by given password
  const isPasswordValidated = await bcrypt.compare(
    plainPassword,
    user.password
  );

  if (!isPasswordValidated) {
    throw { message: "InValid Password!, Please try again!", statusCode: 401 };
  }

  const userRole = user.role ? user.role : "USER";

  //generate token and return
  const token = jwt.sign(
    { email: user.email, id: user.id, role: userRole },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRY,
    }
  );

  return token;
}

module.exports = {
  loginUser,
};
