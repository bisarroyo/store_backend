const express = require('express');

const AuthService = require('../services/auth.service');
const checkDuplicateEmail = require('../middlewares/verifyEmail.handler');
const validatorHandler = require('./../middlewares/validator.handler');
const {singIn, singUp} = require('../schemas/user.schema');
const checkRole = require('./../middlewares/role.handler');

const router = express.Router();
const authService = new AuthService();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-headers',
    'x-access-token, Origin, Content-Type, Accept');
    next();
    });

router.post('/singup', validatorHandler(singUp, 'body'), checkDuplicateEmail, checkRole, async (req, res) => {
  try {
    const user = await authService.signUp(req.body);
    res.json(user);
  }catch(err) {
    console.error(err);
  }
})

router.post('/singin', validatorHandler(singIn, 'body'), async(req, res) => {
  try {
    const user = await authService.singIn(req.body);
     res.json(user);
  } catch(err) {
    console.error(err)
  };
})

module.exports = router;