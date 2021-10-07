import { connect, connection } from 'mongoose';
import { config } from './config';
import { UserModel } from './models';
// import { seeds } from './seeds';

const mongooseConnection = connect(
  config.mongo.uri,
  config.mongo.options
);
connection.on('error', (err: any) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

const dropCollections = (): Promise<boolean[]> => {
  const db: any = connection.db;
  return db
    .listCollections()
    .toArray()
    .then((collections: any[]) =>
      collections.map((collection) => db.dropCollection(collection.name))
    )
    .then((promises: Promise<boolean>[]) => Promise.all(promises));
};

const seedDatabase = (): Promise<any> => {
  console.log(`Initializing db with seed: ${config.dbSeedName}`);

  let promises = [];
  let promise;

  promise = UserModel.create({})  // seeds.users
    .then(() => console.log('Finished populating users'))
    .catch(err => console.log('Error populating users', err));
  promises.push(promise);

  // .then(() => (seeds.apps ? App.create(seeds.apps).then(() => console.log('finished populating apps')) : null))
  // .catch(err => console.log('error populating apps', err));
  // promises.push(promise);

  return Promise.all(promises);
}

mongooseConnection
  .then(() => console.log('Connected to DB'))
  .then(dropCollections)
  .then(seedDatabase)
  .catch((err: any) => console.log(err));
