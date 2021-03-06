import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';

const ReportPeriodSelectBtn = ({buttontext, selectedId, id, setSelectedId}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    id === selectedId ? setIsActive(true) : setIsActive(false);
  }, [selectedId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.3}
        style={[styles.button, isActive ? styles.selected : styles.notSelected]}
        onPress={() => {
          setSelectedId(id);
        }}>
        <Text style={[styles.buttontext, isActive ? styles.selectedtext : styles.notSelectedtext]}>
          {buttontext}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 110,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  selected: {
    backgroundColor: '#242424',
  },
  notSelected: {
    backgroundColor: '#fff',
  },
  selectedtext: {
    color: '#fff',
  },
  notSelectedtext: {
    color: '#242424',
  },
});

export default ReportPeriodSelectBtn;
