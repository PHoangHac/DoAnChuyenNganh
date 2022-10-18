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
import {
  InputSignUpCPN,
  SignUpbtnCPN,
  SocialCPNS,
  LoginTextCPN,
} from '../../components/index';

const WDheight = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  return (
    <ImageBackground
      source={images.backgourndSigIn2}
      style={styles.ImagesBackground}
      resizeMode="stretch">
      {/* SignUp View */}
      <SafeAreaView style={styles.SafeAreaStyles}>
        {/* SignUp Text */}
        <View style={styles.SignUpStyle}>
          <Text style={styles.SignUpText}>Sign Up</Text>
        </View>
        {/* Email and Password */}
        <InputSignUpCPN navigation={navigation} />
        {/* button login */}
        <SignUpbtnCPN />
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
        <SocialCPNS />
        {/* Login */}
        <LoginTextCPN navigation={navigation} />
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
  SignUpStyle: {
    width: '100%',
    height: '10%',
    marginTop: 0.05 * WDheight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignUpText: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'Inter-Bold',
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

export default SignUp;
