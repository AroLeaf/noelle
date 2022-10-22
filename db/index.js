import mongoose from 'mongoose';
import noelle from './noelle.js';

export default class Database {
  constructor (uri) {
    this.noelles = mongoose.model('Noelle', noelle);
    mongoose.connect(uri);
  }
}