import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';

const router = express.Router();
const authController = new AuthController();

// Public routes
router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

// Protected route - Delete after test
router.get('/protected', AuthMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: (req as any).user });
});

router.get('/user/profile', AuthMiddleware, (req, res) => {
    const user = (req as any).user; // Extract user from request
    res.status(200).json({ profile: `Hello, ${user.email}` });
  });

export default router;
