import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {images} from '../../constants/index';
import {InputCPN, BtnLogin, SocialCPN, RegisterCPN} from '../../components';

// const WDwidth = Dimensions.get('window').width;
const WDheight = Dimensions.get('window').height;

const SignIn = ({navigation}) => {
  return (
    <ImageBackground
      source={images.backgourndSigIn2}
      style={styles.ImagesBackground}
      resizeMode="stretch">
      {/* SignIn View */}
      <SafeAreaView style={styles.SafeAreaStyles}>
        {/* SignIn Text */}
        <View style={styles.SignInStyle}>
          <Text style={styles.SignInText}>Sign In</Text>
        </View>
        {/* Email and Password */}
        <InputCPN navigation={navigation} />
        {/* button login */}
        <BtnLogin navigation={navigation} />
        {/* text login with social */}
        <View style={styles.Continue}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontFamily: 'Inter-Bold',
              textShadowColor: 'rgba(15, 255, 255, 0.3)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 7,
            }}>
            Or continue with
          </Text>
        </View>
        {/* button login with another social */}
        <SocialCPN />
        {/* Register */}
        <RegisterCPN navigation={navigation} />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ImagesBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  SafeAreaStyles: {
    flex: 1,
  },
  SignInStyle: {
    width: '100%',
    height: '10%',
    marginTop: 0.1 * WDheight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignInText: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Inter-ExtraBold',
  },
  CheckPosition: {
    borderColor: 'white',
    borderWidth: 1,
  },
  Continue: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignIn;
