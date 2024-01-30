import { getAllProduct, deleteProduct, updateProduct,getSingleProduct ,createProduct} from '../middleWere/productController.js';

import Product from '../models/productModel/index.js'
import asyncHandler from '../middleWere/asyncHandler.js';
import express from 'express'
import products from '../data/Products.js';
import {protect,admin} from '../middleWere/authHandler.js';
const router = express.Router();

router.route('/').get(getAllProduct).post(protect,admin,createProduct)
// router.route('/:id').get(getSingleProduct)
router.route('/:id').get(getSingleProduct).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct)


// router.get('/',asyncHandler(async(req,res)=>{
//     const products = await Product.find({})
//     res.json(products)
// }))
// router.get('/:id',asyncHandler(async(req,res)=>{
//     const product = await Product.findById(req.params.id)
//     if(product){
//         res.json(product)
//     }
//     res.status(404).json({message: 'Product not found'})
//     // const product = products.find((p)=>p._id === req.params.id)
//     // res.json(product)
// }))




export default router