import express from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();
const userController = new UserController();

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', auth, userController.getProfile);
router.patch('/profile', auth, userController.updateProfile);

export default router;
