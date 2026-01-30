import express from 'express'
import { Authenticated } from '../Middlewares/IsAuthenticated.js';
import {checkout ,verify,getUserOrders}from '../Controllers/Payment.js'
const router=express.Router();

// checkout 
router.post('/checkout',checkout);
// verify save to db 

router.post('/verify-payment',verify)

// get order
router.get('/userorder',Authenticated,getUserOrders)
export default router