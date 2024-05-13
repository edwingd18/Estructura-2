import mongoose from "mongoose";

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  id: { type: Number },
  title: { type: String },
  imageUrl: { type: String },
  bannerUrl: { type: String },
  description: { type: String },
  ageRange: { type: Number },
  duration: { type: String },
  format: { type: String },
  director: { type: String },
  type: { type: String },
  trailerUrl: { type: String },
}, { collection: 'movies' });

export default mongoose.model('MovieModel', movieSchema);
