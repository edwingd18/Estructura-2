import mongoose from "mongoose";

const Schema = mongoose.Schema;

const comboSchema = new Schema({
  id: { type: Number },
  title: { type: String },
  imageUrl: { type: String },
  description: { type: String },
  price: { type: Number },
}, { collection: 'combos' });

export default mongoose.model('ComboModel', comboSchema);
