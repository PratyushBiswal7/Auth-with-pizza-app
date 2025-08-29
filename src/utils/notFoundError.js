const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(properties, resource) {
    if (!Array.isArray(properties)) {
      properties = [properties];
    }
    let notFoundProperties = "";
    properties.forEach((property) => (notFoundProperties += `${property},`));
    super(
      `Not able to find the properties: ${notFoundProperties} for the resource ${resource}`,
      404
    );
  }
}

module.exports = NotFoundError;
