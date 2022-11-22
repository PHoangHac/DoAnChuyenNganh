import React, {useContext, useState, useCallback, useEffect} from 'react';

import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {icons, images} from '../../constants/index';
import DeviceInfo from 'react-native-device-info';
import DocumentPicker from 'react-native-document-picker';
import {AuthContext} from '../../context/AuthContext';
import {URL} from '../../context/config';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

const ProfileDetail = ({navigation}) => {
  const appName = DeviceInfo.getBrand();
  const {userInfo} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [singleFile, setSingleFile] = useState([]);

  const OKK = singleFile[0];
  // console.log(image);

  const SelectedSingleFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // alert('User cancel select file!');
      } else {
        console.log(JSON.stringify(err));
        throw err;
      }
    }
  };

  const getByIdTour = useCallback(async () => {
    const getData = await axios.get(`${URL}/auth/GetOne/${userInfo.user.id}`);
    setEmail(getData.data.email);
    setName(getData.data.name);
    setPhone(getData.data.phone);
    setImage(getData.data.image);
  }, [userInfo.user.id]);

  if (loading === true) {
    setTimeout(() => {
      // console.log('Spinner stop running !');
      setLoading(false);
    }, 2500);
  }

  useEffect(() => {
    getByIdTour();
  }, [getByIdTour]);

  const Update = async () => {
    if (name === '' || phone === '' || email === '') {
      Toast.show({
        type: 'error',
        text1: 'Status',
        text2: 'SOME FIELD EMPTY ! 👋',
      });
    } else {
      try {
        const data = new FormData();
        singleFile.forEach((item, i) => {
          data.append('file', {
            uri: item.uri,
            type: 'image/jpeg',
            name: item.filename || `filename${i}.jpg`,
          });
        });
        await axios({
          method: 'POST',
          url: `${URL}/Upload/upload-single`,
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res => {
          axios
            .post(`${URL}/auth/Update/${userInfo.user.id}`, {
              name: name,
              phone: phone,
              email: email,
              image: `src/assets/images/` + res.data,
            })
            .then(res => {
              console.log(res.data);
              setLoading(true);
              setTimeout(() => {
                Toast.show({
                  type: 'success',
                  text1: 'Status',
                  text2: 'UPDATE SUCCESSFULLY ! 👋',
                });
              }, 2500);
            })
            .catch(err => console.log(err));
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      <Spinner visible={loading} />

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
              height: 120,
              width: 120,
            }}
            source={singleFile.length > 0 ? OKK : {uri: `${URL}/${image}`}}
          />
          <TouchableOpacity
            style={{
              // backgroundColor: 'white',
              borderRadius: 20,
              right: 10,
            }}>
            <Image
              style={{
                height: 30,
                width: 30,
                margin: 2,
              }}
              // source={icons.bellicon}
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
            <TouchableOpacity onPress={SelectedSingleFile}>
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
              value={name}
              onChangeText={text => setName(text)}
              placeholder="Your Name"
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
              value={email}
              onChangeText={text => setEmail(text)}
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
              value={phone}
              onChangeText={text => setPhone(text)}
              // placeholder="edit093289362"
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
                editable={false}
                selectTextOnFocus={false}
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
            onPress={Update}
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
      <Toast topOffset={10} />
    </View>
  );
};

export default ProfileDetail;
