// import { Schema, model, connect } from 'mongoose';
import mongoose from 'mongoose';
import { User } from '@sage-bionetworks/rocc-client-angular';
import { config } from './config';
import StarredChallenge from './models/starred-challenge';


let message: string = 'Hello World';
console.log(message);

console.log(config);



// let user: User = {
//   id: '615e5b572797c126680142e5',
//   login: 'tschaffter',
//   email: '',
//   createdAt: '',
//   updatedAt: '',
//   type: 'User'
// };
// console.log(user);

async function run(): Promise<void> {

  await mongoose.connect('mongodb://localhost:27017/rocc', config.mongo.options);

  await StarredChallenge.find({})
    .deleteMany()
    .catch(err => console.log('Error populating starred challenges', err));

  // const doc = new UserModel({
  //   name: 'Bill',
  //   email: 'bill@initech.com',
  //   avatar: 'https://i.imgur.com/dM7Thhn.png'
  // });
  // await doc.save();

  // console.log(doc.email); // 'bill@initech.com'
}

run()
  .then(plop => console.log('Connected to DB', plop))
  .catch(err => console.log(err));