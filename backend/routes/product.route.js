import express from 'express';
import { getProducts, postProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
const router = express.Router();

// post request
router.post('/', postProduct);
// delete request
router.delete('/:id', deleteProduct);
// put request
router.put('/:id', updateProduct);
// get request
router.get('/', getProducts);

export default router;