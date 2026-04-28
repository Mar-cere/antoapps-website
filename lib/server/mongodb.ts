import { MongoClient } from 'mongodb';

const dbName = process.env.MONGODB_DB_NAME || 'antoapps';

let globalClient: MongoClient | null = null;

export async function getMongoDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable.');
  }

  if (!globalClient) {
    globalClient = new MongoClient(uri);
    await globalClient.connect();
  }

  return globalClient.db(dbName);
}

