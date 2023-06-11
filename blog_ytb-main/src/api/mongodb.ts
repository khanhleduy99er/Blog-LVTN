import { config } from "dotenv";
import { Db, MongoClient, ServerApiVersion } from "mongodb";
if (process.env.NODE_ENV !== "production") {
  config();
}
let uri = process.env.MONGODB_URI || "";
let dbName = process.env.MONGODB_DB || "";
let cachedClient: MongoClient;
let cachedDb: Db;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!dbName) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

export function connectToDatabase() {
  const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
  });
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
