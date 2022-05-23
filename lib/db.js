import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = MongoClient.connect(
    'mongodb+srv://admin-tennyson:B9UfDtXRX57gy6gS@cluster0.0ntge.mongodb.net/Auth-demo?retryWrites=true&w=majority'
  );

  return client;
}
