const boom = require('@hapi/boom');
const Role = require('../models/role.model');

const checkRole = async (req, res, next) => {
  const {roles} =req.body;
  try {
    if(roles) {
      const role = await Role.findOne({name: roles});
      if(!role) {
        return next(boom.unauthorized('Role not found'));
      }
      req.role = role;
    }
    next();
  } catch (error) {
    return next(boom.unauthorized('role not found'));
  }
};

module.exports = checkRole;