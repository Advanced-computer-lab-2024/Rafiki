// FlaggedActivitiesContext.js
import React, { createContext, useContext, useState } from 'react';

const FlaggedActivitiesContext = createContext();

// Custom hook to use the FlaggedActivitiesContext in other components
export const useFlaggedActivities = () => useContext(FlaggedActivitiesContext);

// Provider component that wraps around components needing access to flagged activities
export const FlaggedActivitiesProvider = ({ children }) => {
  const [flaggedActivities, setFlaggedActivities] = useState([]);

  const flagActivity = (id) => {
    setFlaggedActivities((prev) => [...prev, id]);
  };

  return (
    <FlaggedActivitiesContext.Provider value={{ flaggedActivities, flagActivity }}>
      {children}
    </FlaggedActivitiesContext.Provider>
  );
};
