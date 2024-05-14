import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatAdminSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  messages: [{
    text: { type: String },
    sender: { type: String },
    timestamp: { type: Date, default: Date.now }
  }]
}, { collection: 'chatAdmin' });

export default mongoose.model('ChatAdmiModel', chatAdminSchema);
