import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const connectionString = 'mongodb+srv://admin-tennyson:JndIzIaSOkEqwWwZ@cluster0.0ntge.mongodb.net/Auth-demo?retryWrites=true&w=majority';
  const client = MongoClient.connect(
    connectionString,
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
    },  
    {useNewUrlParser: true, useUnifiedTopology: true},
  );

  return client;
};
