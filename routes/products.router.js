const express = require('express');

const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { crateProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductService();


router.get('/', async (req, res, next) => {
  try {
    const products = await service.getProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const product = await service.getProduct(req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(crateProductSchema, 'body'), async (req, res, next)=> {
  try {
    const newProduct = await service.createProduct(req.body);
    res.json(newProduct)
  } catch(error){
    next(error)
  }
});

router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req,res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updateProduct = await service.updateProduct(id, changes);
    res.json( updateProduct )
  } catch(error) {
    next(error)
  }
});

router.delete('/:id', validatorHandler(getProductSchema, 'params'), async (req,res,next) => {
  try {
    const { id } = req.params;
    const deleteproduct = await service.deleteProduct(id)
    res.status(201).json(deleteproduct)
  } catch(error) {
    next(error)
  }
})

module.exports = router;