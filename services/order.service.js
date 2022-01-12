const boom = require('@hapi/boom');
const Order = require('../models/order.model');
const Product = require('../models/product.model');

class orderService {
  async getOrders() {
    const orders = await Order.find();
    return orders;
  }
  
  async getOrder(id) {
    const order = await Order.findById(id);
    if (!order) {
      throw boom.notFound('Cant find order');
    }
    return order
  }

  async createOrder(order, user) {
    const {products, total} = order;
    const {id} = user;
    const productsIds = products.map(product => product._id);
    const newOrder = await new Order(
      {
        user: id,
        products: productsIds,
        total,
      }
    );
    const totalOrder = (products, total) => {
      const productValidate = products.reduce((acc, product) => {
        return acc + product.price;
      }, 0);
      if(total !== productValidate) {
        return boom.badRequest('Total order is not valid');
      }
    }
    totalOrder(products, total);
    await newOrder.save();
    return newOrder;
  }

  async updateOrder(id, changes) {
    const update = Order.findByIdAndUpdate(id, changes, (err, result) => {
      if (err) {
        throw boom.notFound('cant find order');
      }
      return console.log(result);
    });
    return update;
  }

  async deleteOrder(id) {
    await Order.deleteOne({id});
    return { message: 'Order deleted', id: id }
  }
};

module.exports = orderService;