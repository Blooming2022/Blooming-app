import {useContext} from 'react';
import AppContext from '../AppContext';

const usePrevMissionChanged = () => {
  const {isPrevMissionChanged, setIsPrevMissionChanged} = useContext(AppContext);

  return {
    isPrevMissionChanged,
    setIsPrevMissionChanged,
  };
};

export default usePrevMissionChanged;
