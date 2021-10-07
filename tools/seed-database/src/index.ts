import { Schema, model, connect } from 'mongoose';
import { User } from "@sage-bionetworks/rocc-client-angular"

let message: string = 'Hello World';
console.log(message);

let user: User = {
  id: '615e5b572797c126680142e5',
  login: 'tschaffter',
  email: '',
  createdAt: '',
  updatedAt: '',
  type: 'User'
};
console.log(user);