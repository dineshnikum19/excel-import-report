/**
 * Date helpers for parsing and formatting
 */
export const parseDate = (value) => {
  if (value instanceof Date) return value;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

export const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

export const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};
