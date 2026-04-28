import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'antoapps';

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

let globalClient: MongoClient | null = null;

export async function getMongoDb() {
  if (!globalClient) {
    globalClient = new MongoClient(uri);
    await globalClient.connect();
  }

  return globalClient.db(dbName);
}

