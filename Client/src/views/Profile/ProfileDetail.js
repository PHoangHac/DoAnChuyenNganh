import React from 'react';

import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import {icons, images} from '../../constants/index';

import DeviceInfo from 'react-native-device-info';

const ProfileDetail = ({navigation}) => {
  const appName = DeviceInfo.getBrand();

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      {/* Header */}
      <View style={{flex: 17}}>
        {/* 50% backg */}
        <View
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: '#23ABF2',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              left: 10,
            }}>
            <Image
              style={{
                height: 30,
                width: 30,
                margin: 2,
              }}
              source={icons.ArrowBackIcon}
            />
          </TouchableOpacity>
          <Image
            style={{
              top: 50,
              borderWidth: 5,
              borderColor: 'white',
              borderRadius: 55,
            }}
            source={images.user}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              right: 10,
            }}>
            <Image
              style={{
                height: 30,
                width: 30,
                margin: 2,
              }}
              source={icons.bellicon}
            />
          </TouchableOpacity>
        </View>
        {/* 50% backg */}
      </View>
      {/* Change picture */}
      <View style={{flex: 5}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 30,
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'Inter-ExtraBold',
                }}>
                Change your picture
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Input */}
      <View
        style={{
          flex: 45,
          // borderWidth: 1,
          // borderColor: 'black',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: '80%',
            height: '100%',
          }}>
          {/* Username */}
          <View
            style={{
              width: '100%',
              height: '25%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Inter-SemiBold',
                color: 'black',
                marginVertical: 5,
              }}>
              Username
            </Text>
            <TextInput
              style={{
                borderColor: '#838383',
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 20,
              }}
              placeholder="Quoc Dung"
              placeholderTextColor={appName == 'Redmi' ? '#A4D5DE' : '#7E6FAA'}
            />
          </View>
          {/* Email */}
          <View
            style={{
              width: '100%',
              height: '25%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Inter-SemiBold',
                color: 'black',
                marginVertical: 5,
              }}>
              Email
            </Text>
            <TextInput
              style={{
                borderColor: '#838383',
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 20,
              }}
              placeholder="NGD@gmail.com"
              placeholderTextColor={appName == 'Redmi' ? '#A4D5DE' : '#7E6FAA'}
            />
          </View>
          {/* Phonenumber */}
          <View
            style={{
              width: '100%',
              height: '25%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Inter-SemiBold',
                color: 'black',
                marginVertical: 5,
              }}>
              Phone
            </Text>
            <TextInput
              style={{
                borderColor: '#838383',
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 20,
              }}
              placeholder="edit093289362"
              placeholderTextColor={appName == 'Redmi' ? '#A4D5DE' : '#7E6FAA'}
            />
          </View>
          {/* Password */}
          <View
            style={{
              width: '100%',
              height: '25%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Inter-SemiBold',
                color: 'black',
                marginVertical: 5,
              }}>
              Password
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}>
              <TextInput
                style={{
                  borderColor: '#838383',
                  borderWidth: 1,
                  borderRadius: 10,
                  paddingLeft: 20,
                  paddingRight: 30,
                  width: '90%',
                }}
                placeholder="***********"
                secureTextEntry={true}
                placeholderTextColor={
                  appName == 'Redmi' ? '#A4D5DE' : '#7E6FAA'
                }
              />
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                }}>
                {/* <Image
                  style={{
                    position: 'absolute',
                    height: 40,
                    width: 40,
                    right: -10,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: 'black',
                  }}
                  source={icons.visiblePass}
                /> */}
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginLeft: 10,
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                  }}
                  source={icons.exchangeicon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* btn update */}
      <View
        style={{
          flex: 15,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <View style={{height: '50%', width: '50%'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#171F1D',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <Text
              style={{
                color: 'white',
                padding: 10,
                fontFamily: 'Inter-Bold',
              }}>
              UPDATE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileDetail;
