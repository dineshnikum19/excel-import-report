import mongoose from "mongoose";

const hourlySalesSchema = new mongoose.Schema(
  {
    storeName: { type: String, required: true },
    storeCode: { type: String, required: true },
    date: { type: Date, required: true },
    day: { type: String, required: true },
    hour: { type: Number, required: true, min: 0, max: 23 },
    avgAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

hourlySalesSchema.index({ storeCode: 1, date: 1, hour: 1 }, { unique: true });

export const HourlySales = mongoose.model("HourlySales", hourlySalesSchema);
