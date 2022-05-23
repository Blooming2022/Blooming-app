import * as React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReviewTabNavigator from './ReivewTabNavigator';
import ReviewCreate from '../containers/review/create/ReviewCreate';
import ReviewDetail from '../containers/review/detail/ReviewDetail';

const Stack = createNativeStackNavigator();

const ReviewStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReviewHome"
        component={ReviewTabNavigator}
        options={({navigation}) => ({
          title: '내 후기',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('ReviewCreate');
              }}>
              <Image
                source={require('../assets/images/reviewCreateBtn.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ReviewCreate"
        component={ReviewCreate}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ReviewDetail"
        component={ReviewDetail}
        options={({navigation}) => ({
          title: '내 후기',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.popToTop();
              }}>
              <Image
                source={require('../assets/images/backBtn.png')}
                style={styles.backButtonImage}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // navigation.goBack();
              }}>
              <Image
                source={require('../assets/images/kebabMenu.png')}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  backButtonImage: {
    height: 16,
    resizeMode: 'contain',
  },
  buttonImage: {
    height: 20,
    resizeMode: 'contain',
  },
});

export default ReviewStackNavigator;
