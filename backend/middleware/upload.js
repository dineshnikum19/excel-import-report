import multer from "multer";

const storage = multer.memoryStorage(); // keep file in memory

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "application/vnd.ms-excel"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only Excel files are allowed"), false);
    }
  },
});

// Accept a single Excel file under ANY field name (avoids Multer "Unexpected field")
export const uploadExcel = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) return next(err);
    const file = Array.isArray(req.files) ? req.files[0] : undefined;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    req.file = file; // normalize so controllers can keep using req.file
    return next();
  });
};

export default upload;
