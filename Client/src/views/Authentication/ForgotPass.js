import React, {useState, useEffect} from 'react';
import {ImageBackground} from 'react-native';

import {images} from '../../constants/index';

const ForgotPass = ({navigation}) => {
  return (
    <ImageBackground
      style={{
        height: '100%',
        width: '100%',
        flex: 100,
      }}
      resizeMode="stretch"
      source={images.backgourndSigIn2}></ImageBackground>
  );
};

export default ForgotPass;
