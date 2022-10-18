import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {images} from '../../constants/index';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPass = () => {
  return (
    <ImageBackground
      style={{
        height: '100%',
        width: '100%',
        flex: 100,
      }}
      resizeMode="stretch"
      source={images.backgourndSigIn2}>
      {/* title */}
      <View style={[styles.container]}>
        <TextInput placeholder="Label" style={styles.inputStyle}></TextInput>
        <TouchableOpacity>
          <Icon name="eye" style={styles.iconStyle}></Icon>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    color: '#000',
    paddingRight: 16,
    fontSize: 16,
    alignSelf: 'stretch',
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  iconStyle: {
    color: '#616161',
    fontSize: 24,
    paddingRight: 8,
  },
});

export default ForgotPass;
