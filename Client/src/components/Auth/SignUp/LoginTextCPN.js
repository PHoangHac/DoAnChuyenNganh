import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';

const LoginTextCPN = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white', fontSize: 18, fontFamily: 'Inter-Light'}}>
        Have Account {'\n'}
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.textStyle}>Login Here !</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    // backgroundColor: 'gray',
    // borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
});

export default LoginTextCPN;
