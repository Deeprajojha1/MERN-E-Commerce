import express from "express";
import { addProduct,getAllProducts,getProductByProductId,updateProduct,deleteProduct} from "../Controllers/Product.js";
const router=express.Router();

// Add Product Route
router.post('/add',addProduct);

// Get all product
router.get('/all',getAllProducts)

// Get product by id
router.get('/product/:product_id', getProductByProductId);

// Update product by id
router.put('/update/:id',updateProduct);

// Delete product by id 
router.delete('/delete/:id',deleteProduct);

export default router;