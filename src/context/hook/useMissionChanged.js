import { useContext } from 'react';
import AppContext from '../AppContext';

const useMissionChanged = () => {
    const { 
        isMissionChanged,
        setIsMissionChanged, } = useContext(AppContext);

    return {
        isMissionChanged,
        setIsMissionChanged,
    };
};

export default useMissionChanged;
