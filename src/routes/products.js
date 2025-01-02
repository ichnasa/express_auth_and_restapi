// ** THIS FILE HANDLE ROUTING

import express from 'express'
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/productsController.js';

// this router object method changed after applying get, post, put, etc method to it, then we export it to be used outside this script
const router = express.Router();

router.get('/', getProducts)

router.get('/:id', getProductById)

router.post('/', addProduct)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)

export default router;