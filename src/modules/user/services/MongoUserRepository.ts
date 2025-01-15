import { UserRepository } from "../../../interfaces/UserRepository";
import { User } from "../entities/User";
import { Db } from "mongodb";
import { connectToMongoDB } from "../../../core/database/connection";

export class MongoUserRepository implements UserRepository {
  private dbPromise: Promise<Db>;

  constructor() {
    this.dbPromise = connectToMongoDB(); // Assign the DB promise
  }

  // Wait for DB connection to resolve before interacting with it
  private async getDb(): Promise<Db> {
    return await this.dbPromise; // Resolve the DB connection
  }

  async findByEmail(email: string): Promise<User | null> {
    const db = await this.getDb(); // Wait for the DB connection
    const user = await db.collection("users").findOne({ email });
    return user ? new User(user.email, user.passwordHash, user.role) : null;
  }

  async save(user: User): Promise<void> {
    const db = await this.getDb(); // Wait for the DB connection
    await db.collection("users").insertOne(user);
  }
}
