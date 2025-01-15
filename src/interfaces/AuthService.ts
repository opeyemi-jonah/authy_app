import { User } from "../modules/user/entities/User";

export interface AuthService {
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, passwordHash: string): Promise<boolean>;
  generateToken(user: User): string;
}
