// src/useCases/AuthenticateUser.ts
import { UserRepository } from "../../../interfaces/UserRepository";
import { AuthService } from "../../../interfaces/AuthService";

export class AuthenticateUser {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await this.authService.verifyPassword(password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    return this.authService.generateToken(user);
  }
}
