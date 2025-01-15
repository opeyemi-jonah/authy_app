import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { AuthMiddleware } from '../../core/middleware/AuthMiddleware';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', AuthMiddleware,(req, res) => authController.register(req, res));
authRoutes.post('/login', AuthMiddleware, (req, res) => authController.login(req, res));

export default authRoutes;
