import { User } from "../entities/User";

export interface AuthService {
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, passwordHash: string): Promise<boolean>;
  generateToken(user: User): string;
}
