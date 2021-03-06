const express = require('express');
const {verifyToken} = require('./../middlewares/token.handler');
const orderService = require('../services/order.service');

const router = express.Router();
const service = new orderService();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-headers',
  'x-access-token, Origin, Content-Type, Accept');
  next();
  }
);

router.post('/', verifyToken, async (req, res) => {
  try {
    const order = await service.createOrder(req.body, req.user);
    res.json(order);
  } catch(err) {
      console.error(err);
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await service.getOrders(req.user);
    res.json(orders);
  }
  catch(err) {
    console.error(err);
  }
});

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const order = await service.updateOrder(req.params.id, req.body);
    res.json(order);
  }
  catch(err) {
    console.error(err);
  }
});

module.exports = router;
