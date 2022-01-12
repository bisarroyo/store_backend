const express = require('express');

const productsRouter = require('./products.router.js');
const authRouter = require('./auth.router.js');
const orderRouter = require('./order.router.js');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/products', productsRouter);
  router.use('/user', authRouter);
  router.use('/order', orderRouter);
}

module.exports = routerApi;
