import { Schema, model } from 'mongoose';

const WilderSchema = new Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, voteCount: Number }],
});

export default model('wilder', WilderSchema);
