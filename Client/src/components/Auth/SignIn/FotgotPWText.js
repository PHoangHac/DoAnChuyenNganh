import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const ForgotPW = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
        <Text style={styles.styleText}>Forgot Password ?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderColor: 'white',
    marginTop: 17,
  },
  styleText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Inter-Bold',
  },
});

export default ForgotPW;
