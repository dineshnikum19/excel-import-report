// controllers/storeController.js
import XLSX from "xlsx";
import crypto from "crypto";
import Store from "../models/Store.js";

export const uploadStoreExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read Excel
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (!rows.length) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // ✅ Required columns (case-sensitive as per your Excel)
    const requiredColumns = [
      "StoreName",
      "StoreCode",
      "Date",
      "Hour",
      "AverageAmount",
    ];

    const firstRow = rows[0];
    const missingColumns = requiredColumns.filter((col) => !(col in firstRow));
    if (missingColumns.length > 0) {
      return res.status(400).json({
        message: `Excel is missing required columns: ${missingColumns.join(
          ", "
        )}`,
      });
    }

    const storeName = firstRow.StoreName;
    const storeCode = firstRow.StoreCode;
    if (!storeName || !storeCode) {
      return res.status(400).json({
        message: "StoreName and StoreCode cannot be empty",
      });
    }

    // 🚫 Block duplicate store
    const existingStore = await Store.findOne({ storeCode });
    if (existingStore) {
      return res.status(400).json({
        message: "This store already exists. Upload blocked.",
      });
    }

    // ✅ Validate & build records
    const records = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      if (!row.Date || row.Hour === "" || row.AverageAmount === "") {
        return res.status(400).json({
          message: `Invalid data at row ${
            i + 2
          }. Date, Hour, and AverageAmount are required.`,
        });
      }

      const date = new Date(row.Date);
      if (isNaN(date.getTime())) {
        return res.status(400).json({
          message: `Invalid Date format at row ${i + 2}`,
        });
      }

      const hour = Number(row.Hour);
      const amount = Number(row.AverageAmount);
      if (Number.isNaN(hour) || Number.isNaN(amount)) {
        return res.status(400).json({
          message: `Hour and AverageAmount must be numbers at row ${i + 2}`,
        });
      }

      records.push({
        date,
        hour,
        amount,
      });
    }

    // (Optional) file hash to block same file
    const fileHash = crypto
      .createHash("sha256")
      .update(req.file.buffer)
      .digest("hex");

    const sameFile = await Store.findOne({ fileHash });
    if (sameFile) {
      return res
        .status(400)
        .json({ message: "This Excel file was already uploaded" });
    }

    // create store
    const store = await Store.create({
      storeName,
      storeCode,
      records,
      fileHash,
    });

    res.status(201).json({
      message: "Store Excel uploaded successfully",
      storeId: store._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
