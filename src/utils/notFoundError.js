const AppError = require("./AppError");

class NotFoundError extends AppError {
  constructor(properties, resource) {
    let notFoundProperties = "";
    properties.forEach((propert) => (notFoundProperties += `&{property},`));
    super(
      `Not able to find the properties: ${notFoundProperties} for the resource ${resource}`,
      404
    );
  }
}

module.exports = NotFoundError;
