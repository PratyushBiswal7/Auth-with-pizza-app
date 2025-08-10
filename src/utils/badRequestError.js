const AppError = require("./AppError");

class BadRequestError extends AppError {
  constructor(invalidParams) {
    let message = "";
    invalidParams.forEach((params) => (message += `${params}\n`));
    super("the request has the following invalid parameters", 400);
  }
}

module.exports = BadRequestError;
