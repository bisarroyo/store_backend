const User = require('../models/user.model');
const Role = require('../models/role.model');
const boom = require('@hapi/boom');

const checkDuplicateEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return next(boom.badRequest('Email already exist'));
    }
    next();
  } catch (error) {
    return next(boom.badRequest(error));
  }
}

module.exports = checkDuplicateEmail;