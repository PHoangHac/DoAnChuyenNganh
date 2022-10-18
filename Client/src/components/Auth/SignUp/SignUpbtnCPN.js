import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const WDheight = Dimensions.get('window').height;

const SignUpbtnCPN = () => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.btnSignIn}>
        <Text style={styles.textStyle}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: 100,
    marginTop: 0.22 * WDheight,
    // backgroundColor: 'gray',
    // borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    textShadowColor: 'rgba(85, 22, 19, 0.4)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 5,
    margin: 2,
  },
  btnSignIn: {
    width: '80%',
    height: 48,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8FBDE8',
    borderRadius: 8,
    elevation: 5,
  },
});

export default SignUpbtnCPN;