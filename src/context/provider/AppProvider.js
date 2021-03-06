import React, {useState} from 'react';
import AppContext from '../AppContext';

const AppProvider = ({children}) => {
  // Data Provider for notify rendering Time
  const [isMissionChanged, setIsMissionChanged] = useState(false);
  const [isReviewChanged, setIsReviewChanged] = useState(false);
  const [isPrevMissionChanged, setIsPrevMissionChanged] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isMissionChanged,
        setIsMissionChanged,
        isReviewChanged,
        setIsReviewChanged,
        isPrevMissionChanged,
        setIsPrevMissionChanged,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
