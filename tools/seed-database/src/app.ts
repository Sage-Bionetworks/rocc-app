import { connect, connection } from 'mongoose';
import { Command } from 'commander';
import { dropCollections } from './database';
import { config } from './config';

export class App {
  private program;

  constructor() {
    this.program = new Command();

    this.program
      .option('-d, --debug', 'output extra debugging')
      .option('-s, --small', 'small pizza size')
      .option('-p, --pizza-type <type>', 'flavour of pizza');
  }

  public run(): void {
    this.program.parse(process.argv);


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

