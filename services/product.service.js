const boom = require('@hapi/boom');

const Product = require('../models/product.model');

class ProductService {
  constructor() {
  }

  async getProducts() {
    const products = await Product.find();
    return products;
  }

  async getProduct(id) {
    const product = await Product.findById(id);
    if (!product) {
      throw boom.notFound('Cant find product');
    }
    return product
  }

  async createProduct(product) {
    const {name, description, price, qty, image} = product;
    const newProduct = new Product(
      {
        name,
        description,
        price,
        qty,
        image,
      }
    );
    newProduct.save((err) => {
      if (err) {
        throw boom.badRequest('Cant create the product');
      }
    })
    return newProduct;
  }

  async updateProduct(id, changes) {
    const update = Product.findByIdAndUpdate(id, changes, (err, result) => {
      if (err) {
        throw boom.notFound('cant find product');
      }
      return console.log(result);
    });
    return update;
  }

  async deleteProduct(id) {
    await Product.deleteOne({id});
    return { message: 'Product deleted', id: id }
  }
 
}

module.exports = ProductService;