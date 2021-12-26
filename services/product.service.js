const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
    this.products = [];
    this.generate()
  }

  generate() {
    for (let i = 0; i < 10; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: faker.commerce.price(),
        qty: faker.datatype.number(),
        image: faker.image.imageUrl()
      })
    }
  }

  async getProducts() {
    return this.products
  }

  async getProduct(id) {
    const product = this.products.find(product => product.id === id)
    if (!product) {
      throw boom.notFound()
    }
    return product
  }

  async createProduct(product) {
    const newProduct = {
      id: faker.random.uuid(),
      ...product
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async updateProduct(id, changes) {
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) {
      throw boom.notFound()
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id)
    if (index === -1) {
      throw boom.notFound()
    }
    this.products.splice(index, 1)
    return { message: 'Product deleted', id: id }
  }
 
}

module.exports = ProductService;