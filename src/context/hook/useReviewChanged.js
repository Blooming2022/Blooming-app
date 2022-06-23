import {useContext} from 'react';
import AppContext from '../AppContext';

const useReviewChanged = () => {
  const {isReviewChanged, setIsReviewChanged} = useContext(AppContext);

  return {
    isReviewChanged,
    setIsReviewChanged,
  };
};

export default useReviewChanged;
