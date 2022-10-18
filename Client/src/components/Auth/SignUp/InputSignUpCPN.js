import React from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {icons} from '../../../constants/index';
import ForgotPW from './FotgotPWText';

import DeviceInfo from 'react-native-device-info';

const WDheight = Dimensions.get('window').height;

const InputSignUpCPN = ({navigation}) => {
  const appName = DeviceInfo.getBrand();

  return (
    <View style={styles.Container}>
      {/* Email */}
      <View style={styles.TextStyle}>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter your Email"
          placeholderTextColor={appName == 'Redmi' ? '#A4D5DE' : '#7E6FAA'}
          style={styles.InputStyle}
        />
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            style={styles.visiblePassstyle}
            source={icons.deleteEmail}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.TextStyle}>
        <TextInput
          keyboardType="numeric"
          // textContentType="telephoneNumber"
          autoCapitalize="none"
          placeholder="Enter your Phone"
          placeholderTextColor={appName == 'Redmi' ? '#A4D5DE' : '#7E6FAA'}
          style={styles.InputStyle}
        />
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            style={styles.visiblePassstyle}
            source={icons.deleteEmail}
          />
        </TouchableOpacity>
      </View>
      {/* PassWord */}
      <View style={styles.TextStyle}>
        <TextInput
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="****************"
          placeholderTextColor={appName == 'Redmi' ? '#A4D5DE' : '#7E6FAA'}
          style={styles.InputStyle}
        />
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            style={styles.visiblePassstyle}
            source={icons.visiblePass}
          />
        </TouchableOpacity>
      </View>
      {/* RePassWord */}
      <View style={styles.TextStyle}>
        <TextInput
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="****************"
          placeholderTextColor={appName == 'Redmi' ? '#A4D5DE' : '#7E6FAA'}
          style={styles.InputStyle}
        />
        <TouchableOpacity>
          <Image
            resizeMode="contain"
            style={styles.visiblePassstyle}
            source={icons.visiblePass}
          />
        </TouchableOpacity>
      </View>
      {/* Forgot Pass */}
      <ForgotPW navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '15%',
    marginTop: 0.015 * WDheight,
    // backgroundColor: 'gray',
    alignItems: 'center',
  },
  TextStyle: {
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
    elevation: 5,
  },
  visiblePassstyle: {
    height: '100%',
    width: 25,
    aspectRatio: 1,
    position: 'absolute',
    right: 0,
    paddingLeft: 10,
    marginRight: 5,
    // borderWidth: 1,
    // borderColor: 'black',
  },
});

export default InputSignUpCPN;
