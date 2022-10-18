import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, TouchableOpacity} from 'react-native';

const RegisterCPN = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          fontFamily: 'Inter-Light',
        }}>
        Don't Have Account {'\n'}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textstyle}>Register Here !</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {
    fontSize: 18,
    fontWeight: '900',
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
});

export default RegisterCPN;
