// src/frameworks/MongoDBClient.ts
import { MongoClient, Db } from 'mongodb';

const url = ''; // MongoDB connection string
const dbName = 'AuthyCluster0'; // Database name

let db: Db;

export async function connectToMongoDB(): Promise<Db> {
  if (db) {
    return db; // Return the already connected DB
  }

  try {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName); // Select the database
    console.log(db)
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
