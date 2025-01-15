import { Request, Response } from 'express';

export class UserController {
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      // Example user profile logic
      res.status(200).json({ message: 'User profile retrieved successfully' });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ message: err.message });
      }
    }
  }
}
