import Product from "../models/productModel/index.js";
import asyncHandler from "./asyncHandler.js";

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not  found" });
  }
});

 //@desc   crate product
//@route  POST /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json({
    createdProduct
  })
  })

 //@desc   update product
//@route  PUT /api/products/:id
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
 const {name,price,image,brand,category,countInStock,description} = req.body
 const product = await Product.findById(req.params.id)
 if(product){
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.description = description
    const updatedProduct = await product.save()
    res.json(updatedProduct)

 }else{
    res.status(404).json({message: 'Product not found'})
    throw new Error('Product not found')

 }
});

//@desc   delete product
  //@route  DELETE /api/products/:id
  //@access private/admin
  const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({

        _id: product._id,
      });
      res.json({ message: "Product removed" });
    }
    else{
      res.status(404)
      throw new Error('Product not found')
    }
  })

export { getAllProduct, getSingleProduct ,createProduct,updateProduct, deleteProduct };
