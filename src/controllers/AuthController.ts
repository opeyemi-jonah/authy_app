import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../services/UserService"; // Service layer
import { User } from "../entities/User";

const userService = new UserService();

export class AuthController {
  // Register a new user
  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    
    if (!email || !password) {
      res.status(400).send("Email and password are required");
      return;
    }

    try {
      // Check if user already exists
      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        res.status(400).send("User already exists");
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User(email, hashedPassword, 'user');
      await userService.save(user);

      res.status(201).send("User registered successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while registering the user");
    }
  }

  // Login and generate JWT token
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Email and password are required");
      return;
    }

    try {
      // Find user by email
      const user = await userService.findByEmail(email);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      // Compare password with hashed password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        res.status(401).send("Invalid password");
        return;
      }

      // Generate JWT token
      const token = jwt.sign(
        { email: user.email, role: user.role },
        "your_jwt_secret", // Secret key (ideally stored in an env variable)
        { expiresIn: "1h" } // Expiry time for the token
      );

      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while logging in");
    }
  }
}
