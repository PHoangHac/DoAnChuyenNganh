import React from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ForgotPW from './FotgotPWText';
import {icons} from '../../../constants/index';

import DeviceInfo from 'react-native-device-info';

const WDheight = Dimensions.get('window').height;
const WDwidth = Dimensions.get('window').width;

const InputCPN = ({navigation}) => {
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
        <TouchableOpacity style={styles.btnstyle}>
          <Image
            style={styles.visiblePassstyle}
            resizeMode="contain"
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
            style={styles.visiblePassstyle}
            resizeMode="contain"
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
    // padding: 12,
    paddingLeft: 12,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'white',
    borderRadius: 7,
    paddingRight: 50,
    elevation: 5,
    alignSelf: 'center',
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

export default InputCPN;
