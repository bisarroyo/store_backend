const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
require('dotenv').config();

const User = require('../models/user.model');
const Role = require('../models/role.model');

const verifyToken = async (req, res, next) => {
  //verify that the token exist
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  if(!token) {
    return next(boom.unauthorized('No token provided'));
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id, {password: 0});
    if (!user) {
      return next(boom.unauthorized('User not found'));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(boom.unauthorized('Invalid token'));
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const role = await Role.find({_id: {$in: user.roles}});
    for(let i = 0; i < role.length; i++) {
      if(role[i].name === 'admin') {
        next();
        return;
      }
    }
    return next(boom.unauthorized('You are not an admin'));
  } catch (error) {
    return next(boom.badRequest('error'));
  }
}

module.exports = {verifyToken, isAdmin};