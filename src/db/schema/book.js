import mongoose from "mongoose";

const bookschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: { type: Array, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    currentQuantity: { type: Number },
    image: { type: String, required: true },
    isAvilable: { type: Boolean, default: true, required: true },
  },
  { timestamps: true }
);

bookschema.index({ title: 1, authors: 1 }, { unique: true });

export default bookschema;
