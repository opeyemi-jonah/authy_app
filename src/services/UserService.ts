// src/services/UserService.ts
import { MongoUserRepository } from "../frameworks/MongoUserRepository"; // MongoDB repo
import { User } from "../entities/User";

const userRepository = new MongoUserRepository();

export class UserService {
  async save(user: User): Promise<void> {
    await userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await userRepository.findByEmail(email);
  }
}
