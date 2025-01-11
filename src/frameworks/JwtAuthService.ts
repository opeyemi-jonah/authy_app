// src/frameworks/JwtAuthService.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthService } from "../interfaces/AuthService";
import { User } from "../entities/User";

export class JwtAuthService implements AuthService {
  private secret = "supersecretkey";

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  generateToken(user: User): string {
    return jwt.sign({ email: user.email, role: user.role }, this.secret, {
      expiresIn: "1h",
    });
  }
}
