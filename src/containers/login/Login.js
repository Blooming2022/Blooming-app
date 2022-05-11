import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Blooming</Text>
        <View style={styles.flexStart}>
          <Text style={styles.subTitle}>나라는 꽃</Text>
          <Text style={styles.subTitle}>피우기</Text>
        </View>
      </View>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"></Image>
      <TouchableOpacity style={[styles.button, styles.btn1]}>
        <Text style={styles.btnText1}>게스트로 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.btn2]}>
        <View style={styles.googleLogin}>
          <Image
            source={require('../../assets/images/logo_googleg_48dp.png')}></Image>
          <Text style={styles.btnText2}>Google로 로그인</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  titleBox: {
    marginTop: 30,
    marginBottom: 60,
    width: '80%',
  },
  flexStart: {
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 58,
    fontWeight: 'bold',
    color: '#242424',
  },
  subTitle: {
    fontSize: 26,
    color: '#969696',
  },
  logo: {
    width: '100%',
    height: 200,
    marginBottom: 70,
  },
  button: {
    width: '80%',
    height: 67,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 17,
  },
  btn1: {
    backgroundColor: '#242424',
  },
  btn2: {
    backgroundColor: '#ffffff',
    borderColor: '#CBCBCB',
    borderWidth: 1,
  },
  googleLogin: {
    flexDirection: 'row',
    width: 140,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText1: {
    fontSize: 16,
    color: '#ffffff',
  },
  btnText2: {
    fontSize: 16,
    color: '#242424',
  },
});

export default Login;
