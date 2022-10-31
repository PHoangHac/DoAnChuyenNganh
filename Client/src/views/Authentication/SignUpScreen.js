import React, {useContext, useState} from 'react';
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
import {images, icons} from '../../constants/index';
import {AuthContext} from '../../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const WDwidth = Dimensions.get('window').width;
const WDheight = Dimensions.get('window').height;

const SignUpScreen = ({navigation}) => {
  const [hasOpacity, setHasOpacity] = React.useState(false);

  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  // const [roleName, setRoleName] = useState(null);
  const [icon, setIcon] = useState('eye');
  const [show, setShow] = useState(true);

  const {isLoading, Register} = useContext(AuthContext);

  const changeIcon = () => {
    icon !== 'eye-off'
      ? (setIcon('eye-off'), setShow(false))
      : (setIcon('eye'), setShow(true));
  };

  const RemoveText = () => {
    setEmail('');
  };

  const RemovePhone = () => {
    setPhoneNumber('');
  };

  return (
    <ImageBackground
      source={images.backgourndSigIn2}
      style={styles.ImagesBackground}
      resizeMode="stretch">
      <Spinner visible={isLoading} />
      {/* SignUp View */}
      <SafeAreaView style={styles.SafeAreaStyles}>
        {/* SignUp Text */}
        <View style={styles.SignUpStyle}>
          <Text style={styles.SignUpText}>Sign Up </Text>
        </View>
        {/* Email and Password */}
        <View style={styles.ViewInputContainer}>
          {/* Email */}
          <View style={styles.ViewInput}>
            <TextInput
              placeholder="Your email"
              onChangeText={text => setEmail(text)}
              value={email}
              style={styles.InputStyle}></TextInput>
            <TouchableOpacity onPress={RemoveText} style={styles.iconStyle}>
              <Icon size={30} name="close-box-outline" />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.ViewInput}>
            <TextInput
              placeholder="Your name"
              onChangeText={text => setName(text)}
              value={name}
              style={styles.InputStyle}></TextInput>
            <TouchableOpacity onPress={RemoveText} style={styles.iconStyle}>
              <Icon size={30} name="close-box-outline" />
            </TouchableOpacity>
          </View> */}
          <View style={styles.ViewInput}>
            <TextInput
              placeholder="Enter your Phone"
              keyboardType="numeric"
              // textContentType="telephoneNumber"
              autoCapitalize="none"
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              style={styles.InputStyle}></TextInput>
            <TouchableOpacity onPress={RemovePhone} style={styles.iconStyle}>
              <Icon size={30} name="close-box-outline" />
            </TouchableOpacity>
          </View>
          {/* PassWord */}
          <View style={styles.ViewInput}>
            <TextInput
              placeholder="***********"
              secureTextEntry={show}
              onChangeText={text => setPassword(text)}
              value={password}
              style={styles.InputStyle}></TextInput>
            <TouchableOpacity onPress={changeIcon} style={styles.iconStyle}>
              <Icon size={30} name={icon} />
              {/* eye-off */}
            </TouchableOpacity>
          </View>
          {/* RePassWord */}
          <View style={styles.ViewInput}>
            <TextInput
              placeholder="Repeat password"
              secureTextEntry={show}
              onChangeText={text => setPassword(text)}
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
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              Forgot Password ?
            </Text>
          </View>
        </View>
        {/* button login */}
        <View style={styles.btnSignUpContainer}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('SignIn')}
            onPress={() => {
              Register(email, password);
            }}
            style={styles.btnSignUp}>
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
              Register
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
              onPress={() => {
                setHasOpacity(!hasOpacity);
              }}
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
            Have Account {'\n'}
            <Text
              onPress={() => navigation.navigate('SignIn')}
              style={{
                fontWeight: '900',
                textShadowColor: 'rgba(15, 255, 255, 0.1)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 7,
              }}>
              Login Here !
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
  SignUpStyle: {
    width: '100%',
    height: '10%',
    // backgroundColor: 'gray',
    marginTop: 0.06 * WDheight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignUpText: {
    // borderColor: 'white',
    // borderWidth: 1,
    fontSize: 30,
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
    // backgroundColor: 'gray',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'black',
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
  visiblePassstyle: {
    height: '100%',
    width: '10%',
    aspectRatio: 1,
    position: 'absolute',
    right: 0,
    paddingLeft: 10,
    marginRight: 5,
  },
  textforgotpw: {
    width: '80%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  btnSignUpContainer: {
    width: '100%',
    height: 100,
    marginTop: 0.2 * WDheight,
    // backgroundColor: 'gray',
    // borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSignUp: {
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
    // borderWidth: 1,
    // borderColor: 'white',
  },
  SocialLoginContainer: {
    width: '100%',
    height: 80,
    // backgroundColor: 'gray',
    // borderWidth: 1,
    // borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SocialLogin: {
    width: '80%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'white',
    marginTop: 20,
  },
  btnSocial: {
    // borderColor: 'white',
    // borderWidth: 1,
    backgroundColor: 'white',
    paddingVertical: 12, // Tren, phai, duoi, trai
    paddingHorizontal: 35,
    borderRadius: 9,
    // opacity: 0.7,
  },
  registerText: {
    width: '100%',
    height: 100,
    // backgroundColor: 'gray',
    // borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default SignUpScreen;
