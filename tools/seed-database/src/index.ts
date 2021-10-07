// import { Schema, model, connect } from 'mongoose';
import mongoose from 'mongoose';
import { config } from './config';
import { AccountModel } from './models';
import userList from './seeds/development/users.json';


const mongooseConnection = mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', err => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

function dropCollections() {
  const db: any = mongoose.connection.db;
  return db.listCollections().toArray()
    .then((collections: any[]) => collections.map((collection) => db.dropCollection(collection.name)))
    .then((promises: Promise<boolean>[]) => Promise.all(promises))
}

mongooseConnection
  .then(() => console.log('Connected to DB'))
  .then(dropCollections)
  .catch(err => console.log(err));




// async function run(): Promise<void> {

//   const dbUri = 'mongodb://localhost:27017/rocc';
//   await mongoose.connect(dbUri, config.mongo.options);

//   const db: any = mongoose.connection.db;
//   const collections: any[] = await db.listCollections().toArray();

//   console.log('collection', collections);
//   let promises: Promise<boolean>[] = collections
//     .map((collection) => db.dropCollection(collection.name));

//   await Promise.all(promises);


//   // await StarredChallenge.find({})
//   //   .deleteMany()
//   //   .catch(err => console.log('Error populating starred challenges', err));

//   // const doc = new UserModel({
//   //   name: 'Bill',
//   //   email: 'bill@initech.com',
//   //   avatar: 'https://i.imgur.com/dM7Thhn.png'
//   // });
//   // await doc.save();

//   // console.log(doc.email); // 'bill@initech.com'
// }

// run()
//   .then(() => console.log('Connected to DB'))
//   // .then(() => {
//   //   return AccountModel.find({})
//   //     .deleteMany();
//   // })
//   .catch(err => console.log(err));