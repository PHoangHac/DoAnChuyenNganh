import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {images, icons} from '../../constants/index';

import DeviceInfo from 'react-native-device-info';

const WDwidth = Dimensions.get('window').width;
const HDheight = Dimensions.get('window').height;

const OnBoarding = ({navigation}) => {
  const appName = DeviceInfo.getBrand();

  return (
    <ImageBackground
      source={images.onboardImage1}
      resizeMode="stretch"
      style={{
        height: HDheight,
        WDwidth: WDwidth,
      }}>
      <SafeAreaView
        style={{
          flex: 100,
          height: '100%',
          width: '100%',
        }}>
        {/* logo */}
        <View
          style={{
            flex: 35,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 200,
              width: 200,
            }}
            source={icons.airplane2icon}
          />
        </View>
        {/* title */}
        <View
          style={{
            flex: 20,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: appName == 'Redmi' ? 30 : 40,
                // fontWeight: 'bold',
                textShadowColor: '#0000FF',
                textShadowOffset: {width: -1, height: 5},
                textShadowRadius: 10,
                fontFamily: 'Inter-Bold',
              }}>
              Welcome Back
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'white',
                fontSize: appName == 'Redmi' ? 18 : 24,
                textShadowColor: '#0000FF',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
                fontFamily: 'Inter-Bold',
              }}>
              Easy way to booking tour
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: appName == 'Redmi' ? 18 : 24,
                alignSelf: 'center',
                textShadowColor: '#0000FF',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
                fontFamily: 'Inter-Bold',
              }}>
              Enjoy your trip !
            </Text>
          </View>
        </View>
        {/* btn */}
        <View
          style={{
            flex: 40,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}>
          <View
            style={{
              height: '50%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={{
                backgroundColor: '#3188D7',
                height: HDheight >= 800 ? '30%' : '35%',
                width: '70%',
                borderRadius: 12,
                marginTop: 50,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  padding: 15,
                  alignSelf: 'center',
                  fontFamily: 'Inter-ExtraBold',
                }}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '50%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={{
                backgroundColor: '#3188D7',
                height: HDheight >= 800 ? '30%' : '35%',
                width: '70%',
                borderRadius: 12,
                marginBottom: 100,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  padding: 15,
                  alignSelf: 'center',
                  fontFamily: 'Inter-ExtraBold',
                }}>
                SIGN IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OnBoarding;
