import mongoose from 'mongoose';

export default new mongoose.Schema({
  role: String,
  type: String,
  start: Number,
  end: Number,
});