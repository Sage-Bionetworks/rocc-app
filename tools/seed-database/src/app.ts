import { connect, connection, Mongoose } from 'mongoose';
import { Command } from 'commander';
import { dropCollections, pingDatabase } from './database';
import { config } from './config';
import * as Pkg from '../package.json';

export class App {
  private program: any;

  constructor() {
    this.program = new Command();

    this.program
      .name('rocc-client')
      .usage('[global options] command')
      .version(Pkg.version, '-v, --version', 'output the current version')
      .description(Pkg.description);

    this.program
      .command('ping')
      .description('ping the MongoDB instance')
      .action(() => this.ping());

    this.program
      .command('start <service>', 'start named service')
      .command(
        'stop [service]',
        'stop named service, or all if no name supplied'
      );

    this.program
      .option('--uri <uri>', 'MongoDB uri', 'mongodb://localhost:27017/rocc')
      .option('--username <username>', 'MongoDB username', 'roccmongo')
      .option('--password <password>', 'MongoDB password', 'roccmongo');
  }

  private async ping(): Promise<void> {
    return this.connect()
      .then(pingDatabase)
      .then((pong) => {
        if (pong) {
          console.log('pong');
          process.exit(0);
        } else {
          console.log('No pong received');
          process.exit(-1);
        }
      })
      .catch((err: any) => {
        console.log(err);
        process.exit(-1);
      });
  }

  private plop(): void {
    console.log('plop');
  }

  private async connect(): Promise<Mongoose> {
    const options = this.program.opts();
    const connectOptions = {
      user: options.username,
      pass: options.password,
    };
    const mongooseConnection = connect(options.uri, connectOptions);
    connection.on('error', (err: any) => {
      console.error(`MongoDB connection error: ${err}`);
      process.exit(-1);
    });
    return mongooseConnection;
  }

  public async run(): Promise<void> {
    await this.program.parseAsync(process.argv);

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
