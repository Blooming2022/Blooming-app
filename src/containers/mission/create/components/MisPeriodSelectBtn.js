import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const MisPeriodSelectBtn = ({buttontext, selectedId, period, setPeriod}) => {
  const [isActive, setIsActive] = useState();

  useEffect(() => {
    period === selectedId ? setIsActive(true) : setIsActive(false);
  }, [period]);

  return (
    <TouchableOpacity
      activeOpacity={0.3}
      style={[styles.button, isActive ? styles.selected : styles.notSelected]}
      onPress={() => {
        setPeriod(selectedId);
      }}>
      <Text style={[styles.buttontext, isActive ? styles.selectedtext : styles.notSelectedtext]}>
        {buttontext}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 55,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 0,
    padding: 8,
    borderRadius: 20,
  },
  buttontext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: '#242424',
  },
  notSelected: {
    backgroundColor: '#C5C5C7',
  },
  selectedtext: {
    color: '#fff',
  },
  notSelectedtext: {
    color: '#000',
  },
});

export default MisPeriodSelectBtn;
