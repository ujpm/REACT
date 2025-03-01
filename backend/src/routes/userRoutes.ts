import express, { Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { auth } from '../middleware/auth';

const router = express.Router();
const userController = new UserController();

// Public routes
router.post('/register', async (req: Request, res: Response) => {
  await userController.register(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  await userController.login(req, res);
});

// Protected routes
router.get('/profile', auth, async (req: Request, res: Response) => {
  await userController.getProfile(req, res);
});

router.patch('/profile', auth, async (req: Request, res: Response) => {
  await userController.updateProfile(req, res);
});

export default router;
