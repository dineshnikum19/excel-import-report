/**
 * Global error handler
 */
export const errorHandler = (err, req, res, next) => {
  // Multer errors → 400 with clear message
  if (err.code === "MISSING_FIELD_NAME") {
    return res.status(400).json({
      success: false,
      message:
        "Upload a file using a form field (e.g. field name 'file' in multipart/form-data).",
    });
  }
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      success: false,
      message: "Only one file is allowed. Use a single file field.",
    });
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "File too large. Max size is 10MB.",
    });
  }
  if (err.code === "LIMIT_FILE_COUNT") {
    return res.status(400).json({
      success: false,
      message: "Too many files. Only one file is allowed.",
    });
  }

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(err);
  res.status(status).json({ success: false, message });
};

export const notFound = (req, res, next) => {
  res.status(404).json({ message: "Not found" });
};
