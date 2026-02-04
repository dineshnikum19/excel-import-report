import * as xlsx from "xlsx";
const XLSX = xlsx.default ?? xlsx;

/**
 * Read the Excel file and convert it to JSON array
 */
export const readExcel = async (filePath) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: null });
    return rows;
  } catch (error) {
    throw new Error(`Failed to read Excel file: ${error.message}`);
  }
};

/**
 * Validate the structure of the Excel file
 */
export const validateExcelStructure = (rows) => {
  const errors = [];

  if (!rows || rows.length === 0) {
    return { valid: false, errors: ["Excel file is empty"] };
  }

  const requiredColumns = [
    "StoreCode",
    "StoreName",
    "Date",
    "Day",
    "Hour",
    "AverageAmount",
  ];
  const firstRow = rows[0];

  for (const col of requiredColumns) {
    if (!(col in firstRow)) {
      errors.push(`Missing required column: ${col}`);
    }
  }
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  rows.forEach((row, index) => {
    const rowNum = index + 2;

    if (!row.StoreCode || typeof row.StoreCode !== "number") {
      errors.push(`Row ${rowNum}: Store code must be a number`);
    }

    if (!row.StoreName || typeof row.StoreName !== "string") {
      errors.push(`Row ${rowNum}: Store name must be a string`);
    }

    if (!row.Date) {
      errors.push(`Row ${rowNum}: Date is required`);
    }

    if (!row.Day || typeof row.Day !== "string") {
      errors.push(`Row ${rowNum}: Day must be a non-empty string`);
    }

    const hour = Number(row.Hour);
    if (isNaN(hour) || hour < 0 || hour > 23) {
      errors.push(`Row ${rowNum}: Hour must be a number between 0 and 23`);
    }

    const avgAmount = Number(row.AverageAmount);
    if (isNaN(avgAmount)) {
      errors.push(`Row ${rowNum}: Average amount must be a valid number`);
    }
  });

  if (errors.length > 10) {
    const remaining = errors.length - 10;
    errors.splice(10);
    errors.push(`... and ${remaining} more errors`);
  }

  return { valid: errors.length === 0, errors };
};
