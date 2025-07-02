class UserService {
  constructor(_userRepository) {
    // we will espect an argument of userRepository
    this.userRepository = _userRepository;
  }

  async registerUser(userDetails) {
    console.log("Hitting service layer")
    // It will create a new user in the database and return the details of created user
    const user = await this.userRepository.findUser({
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
    const newUser = await this.userRepository.createUser({
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
}

module.exports = UserService;
