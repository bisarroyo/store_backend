const express = require('express');

const productsRouter = require('./products.router.js')

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/products', productsRouter);
}

module.exports = routerApi;
