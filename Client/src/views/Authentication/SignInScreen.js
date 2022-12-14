// import React
import React, {useState, useEffect, useContext} from 'react';

// import core componet
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

// import icons, images physical
import {images, icons} from '../../constants/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//------AuthContext-----//
import {AuthContext} from '../../context/AuthContext';
//------AuthContext-----//
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

// variable get height and width device
const WDwidth = Dimensions.get('window').width;
const WDheight = Dimensions.get('window').height;

const SignInScreen = ({navigation}) => {
  const [hasOpacity, setHasOpacity] = React.useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // console.log(email);
  // console.log(password);

  const [icon, setIcon] = useState('eye');
  const [show, setShow] = useState(true);

  const {isLoading, Login, userInfo} = useContext(AuthContext);

  // console.log('Client Res: ', userInfo);
  // console.log('Client Res: ', isLoading);

  const LoginAuth = () => {
    if (email === null || password === null) {
      showToast('EMAIL OR PASSWORD FIELD EMPTY !');
    } else Login(email, password);
  };

  const onChangeTextEmail = text => {
    setEmail(text);
  };

  const onChangeTextPassword = text => {
    setPassword(text);
  };

  const showToast = text => {
    Toast.show({
      type: 'error',
      text1: 'Status',
      text2: text,
      autoHide: true,
      visibilityTime: 1500,
    });
  };

  const changeIcon = () => {
    icon !== 'eye-off'
      ? (setIcon('eye-off'), setShow(false))
      : (setIcon('eye'), setShow(true));
  };

  const RemoveText = () => {
    setEmail('');
  };

  return (
    <ImageBackground
      source={images.backgourndSigIn2}
      style={styles.ImagesBackground}
      resizeMode="stretch">
      <Spinner visible={isLoading} />
      <Toast topOffset={20} />
      {/* SignIn View */}
      <SafeAreaView style={styles.SafeAreaStyles}>
        {/* SignIn Text */}
        <View style={styles.SignInStyle}>
          <Text style={styles.SignInText}>Sign In</Text>
        </View>
        {/* Email and Password */}
        <View style={styles.ViewInputContainer}>
          {/* Email */}
          <View style={styles.ViewInput}>
            <TextInput
              autoComplete="off"
              placeholder="Your email"
              onChangeText={onChangeTextEmail}
              value={email}
              style={styles.InputStyle}></TextInput>
            <TouchableOpacity onPress={RemoveText} style={styles.iconStyle}>
              <Icon size={30} name="close-box-outline" />
            </TouchableOpacity>
          </View>
          {/* PassWord */}
          <View style={styles.ViewInput}>
            <TextInput
              placeholder="***********"
              secureTextEntry={show}
              onChangeText={onChangeTextPassword}
              value={password}
              style={styles.InputStyle}></TextInput>
            <TouchableOpacity onPress={changeIcon} style={styles.iconStyle}>
              <Icon size={30} name={icon} />
              {/* eye-off */}
            </TouchableOpacity>
          </View>
          {/* Forgot Pass */}
          <View style={styles.textforgotpw}>
            <Text
              onPress={() => navigation.navigate('ForgotPass')}
              style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              Forgot Password ?
            </Text>
          </View>
        </View>
        {/* button login */}
        <View style={styles.btnSignInContainer}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('HomeTabs')}
            onPress={LoginAuth}
            style={styles.btnSignIn}>
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                fontWeight: 'bold',
                textShadowColor: 'rgba(85, 22, 19, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 5,
                margin: 2,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        {/* text login with social */}
        <View style={styles.Continue}>
          <Text
            style={{
              color: 'white',
              fontSize: 15,
              fontWeight: 'bold',
              textShadowColor: 'rgba(15, 255, 255, 0.3)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 7,
            }}>
            Or continue with
          </Text>
        </View>
        {/* button login with another social */}
        <View style={styles.SocialLoginContainer}>
          <View style={styles.SocialLogin}>
            {/* google login */}
            <TouchableOpacity
              // onPress={() => {
              //   setHasOpacity(!hasOpacity);
              // }}
              // onPress={showToast}
              activeOpacity={0.2}
              style={[styles.btnSocial, {opacity: hasOpacity ? 0.5 : 1.0}]}>
              <Image source={icons.googleIcon2} />
            </TouchableOpacity>
            {/* twitter login */}
            <TouchableOpacity style={styles.btnSocial}>
              <Image source={icons.twitterIcon2} />
            </TouchableOpacity>
            {/* facebook login */}
            <TouchableOpacity style={styles.btnSocial}>
              <Image source={icons.facebookIcon2} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Register */}
        <View style={styles.registerText}>
          <Text style={{color: 'white', fontSize: 18}}>
            Don't Have Account {'\n'}
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={{
                fontWeight: '900',
                textShadowColor: 'rgba(15, 255, 255, 0.3)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 7,
              }}>
              Register Here !
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ImagesBackground: {
    // height: '100%',
    // width: '100%',
    // flex: 1,
    // alignSelf: 'stretch',
    // width: null,
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  SafeAreaStyles: {
    flex: 1,
    // backgroundColor: 'white',
  },
  SignInStyle: {
    width: '100%',
    height: '10%',
    // backgroundColor: 'gray',
    marginTop: 0.1 * WDheight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignInText: {
    // borderColor: 'white',
    // borderWidth: 1,
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  CheckPosition: {
    borderColor: 'white',
    borderWidth: 1,
  },
  ViewInputContainer: {
    width: '100%',
    height: '15%',
    marginTop: 0.015 * WDheight,
    alignItems: 'center',
  },
  ViewInput: {
    width: '80%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'white',
    marginTop: 17,
  },
  InputStyle: {
    height: '100%',
    width: '100%',
    textAlign: 'left',
    fontSize: 16,
    padding: 12,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 7,
    paddingRight: 50,
  },
  iconStyle: {
    height: '100%',
    width: '10%',
    aspectRatio: 1,
    position: 'absolute',
    top: 8,
    right: 0,
    marginRight: 5,
  },
  textforgotpw: {
    width: '80%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderColor: 'white',
    marginTop: 17,
  },
  btnSignInContainer: {
    width: '100%',
    height: 100,
    marginTop: 0.08 * WDheight,
    // backgroundColor: 'gray',
    // borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSignIn: {
    width: '80%',
    height: 48,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8FBDE8',
    borderRadius: 8,
  },
  Continue: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SocialLoginContainer: {
    width: '100%',
    height: 95,
    // backgroundColor: 'gray',
    // borderWidth: 1,
    // borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SocialLogin: {
    width: '80%',
    height: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'white',
    marginTop: 17,
  },
  btnSocial: {
    // borderColor: 'white',
    // borderWidth: 1,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 9,
    // opacity: 0.7,
  },
  registerText: {
    width: '100%',
    height: 100,

    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignInScreen;
