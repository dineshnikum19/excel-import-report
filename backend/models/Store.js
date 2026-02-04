// models/Store.js
import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  hour: { type: Number, required: true },
  amount: { type: Number, required: true },
});

const storeSchema = new mongoose.Schema(
  {
    storeCode: { type: String, required: true, unique: true },
    storeName: { type: String, required: true },
    records: [recordSchema],
    fileHash: { type: String, unique: true, sparse: true }, // optional safety
  },
  { timestamps: true }
);

export default mongoose.model("Store", storeSchema);
