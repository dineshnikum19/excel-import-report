/**
 * Best hour, worst hour, trends
 */
export const getBestHour = async (req, res, next) => {
  try {
    // TODO: use analytics.service
    res.json({ message: "Best hour – implement" });
  } catch (error) {
    next(error);
  }
};

export const getWorstHour = async (req, res, next) => {
  try {
    // TODO: use analytics.service
    res.json({ message: "Worst hour – implement" });
  } catch (error) {
    next(error);
  }
};

export const getTrends = async (req, res, next) => {
  try {
    // TODO: use analytics.service
    res.json({ message: "Trends – implement" });
  } catch (error) {
    next(error);
  }
};
