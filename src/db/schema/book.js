import mongoose from "mongoose";

const bookschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: { type: Array, required: true },
  },
  { timestamps: true }
);

bookschema.index({ title: 1, authors: 1 }, { unique: true });

export default bookschema;
