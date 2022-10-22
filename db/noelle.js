import mongoose from 'mongoose';

export default new mongoose.Schema({
  user: String,
  uid: String,
  score: Number,
  noelle: {},
});