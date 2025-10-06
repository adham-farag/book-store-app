import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: { type: Array, required: true },
    Address: { type: Object, default: undefined },
    pageId: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false, requred: true },
  },
  { timestamps: true }
);

export default customerSchema;
