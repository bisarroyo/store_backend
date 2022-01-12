const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const User = require('../models/user.model');
const Role = require('../models/role.model');

require('dotenv').config();

const secret = process.env.SECRET;

class AuthService {
  constructor() {
  }

  async signUp(user) {
    try {
      const {name, email, password, roles} = user;
      const newUser = await new User(
        {
          name,
          email,
          password: await User.encryptPassword(password),
        }
      );

      //checking for roles
      if(roles) {
        const foundRole = await Role.find({name: {$in: roles}});
        newUser.roles = foundRole.map((role) => role._id)
      } else {
        const role = await Role.find({name: "user"});
        newUser.roles = [role._id];
      }

      //save the user object
      const savedUser = await newUser.save();

      //create token
      const token = jwt.sign({id: savedUser._id}, secret, {
        expiresIn: 86400 //24 hours
      });

      return token;
    }catch(err) {
      console.error(err);
    }
  };

  async singIn(user) {
    try {
      const {email, password} = user;
      const foundUser = await User.findOne({email: email});
      if(!foundUser) {
        throw boom.unauthorized('Invalid email or password');
      }
      const matchedPassword = await User.comparePassword(password, foundUser.password);
      if(!matchedPassword) {
        throw boom.unauthorized('Invalid email or password');
      }
      const token = jwt.sign({id: foundUser._id}, secret, {
        expiresIn: 86400 //24 hours
      });
      return token;
    }catch(err) {
      console.error(err);
    }
  }
}

module.exports = AuthService;