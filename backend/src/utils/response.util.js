/**
 * Standard API response helpers
 */
export const success = (res, data, status = 200) => {
  res.status(status).json({ success: true, data });
};

export const error = (res, message, status = 400) => {
  res.status(status).json({ success: false, message });
};

export const paginated = (res, data, page, limit, total) => {
  res.json({
    success: true,
    data,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
};
