import express from 'express';
import {Authenticated} from '../Middlewares/IsAuthenticated.js';
import { addToCart,getUserCart,removeProductFromCart,clearCart,decreaseQuantity,increaseQuantity }  from "../Controllers/Cart.js";
const router=express.Router();

// Add Product Route
router.post('/add',Authenticated,addToCart);
// Get User Cart Route
router.get('/user/:userId',Authenticated,getUserCart);
// Remove Product from Cart Route
router.delete('/remove/:product_id',Authenticated,removeProductFromCart);
// Clear Cart Route
router.delete('/clear/:userId',Authenticated,clearCart);
// Decrease Quantity Route
router.post('/decreaseQty', Authenticated, decreaseQuantity);
// Increase Quantity Route
router.post('/increaseQty', Authenticated, increaseQuantity);

export default router;