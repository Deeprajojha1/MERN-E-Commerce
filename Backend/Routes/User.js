import express from 'express';
import { Authenticated } from '../Middlewares/IsAuthenticated.js';
// import { checkAuth } from '../Controllers/User.js';
import { 
  registerUser, 
  loginUser, 
  getAllUsers, 
  getUserProfile,
  
} from '../Controllers/User.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/all', Authenticated, getAllUsers);
router.get('/profile', Authenticated, getUserProfile);

export default router;