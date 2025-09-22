import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

export default adminSchema;
