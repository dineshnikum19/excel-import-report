import {
  readExcel,
  validateExcelStructure,
} from "../services/excel.service.js";
import { HourlySales } from "../models/HourlySales.model.js";
import fs from "fs";

/**
 * Excel upload + parsing
 */
export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Excel file is required" });
    }

    const rows = await readExcel(req.file.path);

    const validation = validateExcelStructure(rows);
    if (!validation.valid) {
      return res.status(400).json({
        message: "Invalid Excel structure",
        errors: validation.errors,
      });
    }

    const formattedData = rows.map((row) => ({
      storeCode: row.StoreCode,
      storeName: row.StoreName,
      date: new Date(row.Date),
      day: row.Day,
      hour: Number(row.Hour),
      avgAmount: Number(row.AverageAmount),
    }));

    await HourlySales.insertMany(formattedData);

    // optional: delete file after processing
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      message: "Excel data uploaded successfully",
      insertedRecords: formattedData.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Excel upload failed" });
  }
};
