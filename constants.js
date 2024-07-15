const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
};

module.exports.constants = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401,
  FORBIDOEN:403,
  NOT_FOUND:404
}