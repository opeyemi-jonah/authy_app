import { Router } from 'express';
import { UserController } from '../user/controller/UserController';
import { AuthMiddleware } from '../../core/middleware/AuthMiddleware';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/profile', (req, res) => userController.getProfile(req, res));

export default userRoutes;
