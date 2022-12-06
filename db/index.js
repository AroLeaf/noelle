import mongoose from 'mongoose';
import noelle from './noelle.js';
import role from './role.js';

export default class Database {
  constructor (uri) {
    this.noelles = mongoose.model('Noelle', noelle);
    this.roles = mongoose.model('Role', role);
    mongoose.connect(uri);
  }
}