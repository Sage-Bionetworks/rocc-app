import { connect, connection } from 'mongoose';
import { Command } from 'commander';
import { dropCollections } from './database';
import { config } from './config';

export class App {
  private program: any;

  constructor() {
    this.program = new Command();

    this.program
      .option('--uri <uri>', 'MongoDB uri', 'mongodb://localhost:27017/rocc')
      .option('--username <username>', 'MongoDB username', 'roccmongo')
      .option('--password <password>', 'MongoDB password', 'roccmongo')
      .option('--input <path>', 'directory that contains the JSON files');
  }

  public run(): void {
    this.program.parse(process.argv);

    const options = this.program.opts();
    console.log('options:', options);

    // config.mongo.uri =

    // const mongooseConnection = connect(config.mongo.uri, config.mongo.options);
    // connection.on('error', (err: any) => {
    //   console.error(`MongoDB connection error: ${err}`);
    //   process.exit(-1);
    // });

    // return mongooseConnection
    //   .then(() => console.log('Connected to DB'))
    //   .then(dropCollections)
    //   // .then(seedDatabase)
    //   .then(() => console.log('DB seeding complete'))
    //   .catch((err: any) => console.log(err));
  }
}

