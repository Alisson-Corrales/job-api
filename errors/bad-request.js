const CustomAPIError = require("./custom-api-error");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCodes = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
