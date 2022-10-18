import React from 'react';
import {View, Text, ImageBackground} from 'react-native';

import {images} from '../../constants/index';

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
      <View
        style={{
          flex: 50,
          borderWidth: 1,
          borderColor: 'white',
        }}></View>
      {/* title */}
      <View
        style={{
          flex: 50,
          borderWidth: 1,
          borderColor: 'white',
        }}></View>
    </ImageBackground>
  );
};

export default ForgotPass;
