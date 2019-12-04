"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

function configuration(NODE_ENV) {
  if (NODE_ENV === 'test') {
    return {
      connectionString: process.env.TEST_DB,
      SECRET_KEY: 'anythingcangoHERE'
    };
  }

  if (NODE_ENV === 'development') {
    return {
      connectionString: process.env.DATABASE_URL,
      SECRET_KEY: process.env.JWT_KEY
    };
  }

  if (NODE_ENV === 'production') {
    return {
      connectionString: process.env.DATABASE_URL,
      SECRET_KEY: process.env.JWT_KEY
    };
  }

  throw new Error("Environment configuration ".concat(NODE_ENV, " does not exist"));
}

var _default = configuration;
exports["default"] = _default;