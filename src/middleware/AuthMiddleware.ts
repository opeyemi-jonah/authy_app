import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authorization token missing or invalid' });
      return;
    }
  
    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
  
    const secret = process.env.JWT_SECRET || 'defaultsecret'; // Replace 'defaultsecret' with a valid secret for testing
    console.log('Verifying Token:', token);
  
    try {
      const decoded = jwt.verify(token, secret);
      console.log('Decoded Token:', decoded);
  
      (req as any).user = decoded; // Attach the decoded token payload to the request object
      next();
    } catch (err) {
      console.error('JWT Verification Error:', err);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
  };