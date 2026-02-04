import { HourlySales } from "../models/HourlySales.model.js";

/**
 * Aggregation logic for best hour, worst hour, trends
 */
export const getBestHourAggregation = async (storeId, startDate, endDate) => {
  // TODO: aggregate by hour, return best
  return null;
};

export const getWorstHourAggregation = async (storeId, startDate, endDate) => {
  // TODO: aggregate by hour, return worst
  return null;
};

export const getTrendsAggregation = async (storeId, startDate, endDate) => {
  // TODO: time-series or trend aggregation
  return [];
};
