import { connect, connection } from 'mongoose';
import { dropCollections } from './database';
import { config } from './config';

export class App {
  constructor() {}

  public async run(): Promise<void> {
    const mongooseConnection = connect(config.mongo.uri, config.mongo.options);
    connection.on('error', (err: any) => {
      console.error(`MongoDB connection error: ${err}`);
      process.exit(-1);
    });

    return mongooseConnection
      .then(() => console.log('Connected to DB'))
      .then(dropCollections)
      // .then(seedDatabase)
      .then(() => console.log('DB seeding complete'))
      .catch((err: any) => console.log(err));
  }
}

