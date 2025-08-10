const AppError = require("./AppError");

class InternalServerError extends AppError {
  constructor() {
    super("Its not you its our server where something went wrong", 500);
  }
}

module.exports = InternalServerError;
