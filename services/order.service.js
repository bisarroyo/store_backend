const boom = require('@hapi/boom');
const Order = require('../models/order.model');
const Product = require('../models/product.model');

class orderService {
  async getOrders(user) {
    const {id} = user;
    const orders = await Order.find({user: {$eq: id}});
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
    const newOrder = await new Order(
      {
        user: id,
        products,
        total,
      }
    );
    const productList = await Product.find({_id: {$in: products}});
    if (productList.length !== products.length) {
      throw boom.badRequest('Invalid product');
    }
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