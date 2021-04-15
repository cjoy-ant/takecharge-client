import React from "react";

export default React.createContext({
  providers: [],
  visits: [],
  recommendations: [],
  addProvider: () => {},
  deleteProvider: () => {},
  editProvider: () => {},
  addVisit: () => {},
  deleteVisist: () => {},
  editVisit: () => {},
  addRecommendation: () => {},
  deleteRecommendation: () => {},
  editRecommendation: () => {},
});
