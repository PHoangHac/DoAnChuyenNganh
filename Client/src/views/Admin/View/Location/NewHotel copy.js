import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import {icons, images} from '../../../../constants/index';
import {URL} from '../../../../context/config';
import axios from 'axios';
// import Spinner from 'react-native-loading-spinner-overlay';
// import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';

const CreateHotelScreen = ({navigation, route}) => {
  const [singleFile, setSingleFile] = useState([]);
  const [multipleFile, setMultipleFile] = useState([]);
  const [NameHotel, setNameHotel] = useState('');
  const [ImageHotel, setImageHotel] = useState('');

  // console.log(multipleFile);
  let Tem;
  if (multipleFile.length > 0) {
    const Yeh = multipleFile.map(item => {
      return item.name;
    });
    Tem = Yeh;
    // console.log(Yeh);
  } else {
    // console.log('false');
  }

  const CreateHotel = async () => {
    try {
      const formData = new FormData();
      formData.append('images', Tem);

      await axios
        .post(
          `${URL}/hotel/Create`,
          {
            NameHotel: NameHotel,
            images: Tem,
          },
          formData,
        )
        .then(res => {
          // console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(ImageUser);

  const OKK = singleFile[0];
  // let File;

  // if (OKK === undefined) {
  // } else {
  //   console.log(OKK.name);
  //   File = OKK.name;
  // }

  // const data = new FormData();
  // const filename = Date.now() + file?.name;
  // data.append('name', filename);
  // data.append('file', file);

  const SelectedSingleFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('User cancel select file!');
      } else {
        console.log(JSON.stringify(err));
        throw err;
      }
    }
  };

  const SelectedMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      setMultipleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('User cancel select file!');
      } else {
        console.log(JSON.stringify(err));
        throw err;
      }
    }
  };

  const RemoveFile = () => {
    setSingleFile([]);
    setMultipleFile([]);
  };

  // if (loading === true) {
  //   setTimeout(() => {
  //     console.log('Spinner stop running !');
  //     setLoading(false);
  //   }, 2500);
  // }

  // const showToast = () => {
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Status',
  //     text2: 'UPDATE SUCCESSFULLY ! ????',
  //   });
  // };
  return (
    <View
      style={{
        flex: 100,
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      {/* <Spinner visible={loading} /> */}
      <View
        style={{
          flex: 10,
          backgroundColor: '#000080',
        }}>
        {/* Header */}
        <View
          style={{
            flex: 10,
            backgroundColor: '#000080',
          }}>
          <View
            style={{
              height: '100%',
              width: '100%',
              flexDirection: 'row',
            }}>
            {/* 1 */}
            <View
              style={{
                height: '100%',
                width: '20%',
                // borderWidth: 1,
                // borderColor: 'green',
                // justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  style={{
                    height: 35,
                    width: 35,
                    tintColor: 'white',
                  }}
                  source={icons.ArrowBackIcon}
                />
              </TouchableOpacity>
            </View>
            {/* 2 */}
            <View
              style={{
                height: '100%',
                width: '60%',
                // borderWidth: 1,
                // borderColor: 'yellow',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Black',
                  fontSize: 18,
                }}>
                Edit User
              </Text>
            </View>
            {/* 3 */}
            <View
              style={{
                height: '100%',
                width: '20%',
                // borderWidth: 1,
                // borderColor: 'red',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '95%',
                  justifyContent: 'center',
                  // alignItems: 'flex-end',
                  flexDirection: 'column',
                }}>
                <TouchableOpacity>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    source={images.user}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* End Header */}
      </View>
      <View
        style={{
          flex: 90,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
          }}>
          <View
            style={{
              height: '15%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: '40%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'gray',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Name User:
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                // justifyContent: 'center',
                paddingRight: 10,
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 10,
                }}
                // value={Name}
                onChangeText={text => setNameHotel(text)}
                // placeholder="here...."
                // placeholderTextColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              height: '15%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
              opacity: 0,
            }}>
            <View
              style={{
                height: '40%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'gray',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Phone:
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                // justifyContent: 'center',
                paddingRight: 10,
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 10,
                }}
                // value={Phone}
                // onChangeText={text => setPhone(text)}
                placeholder="here...."
                // placeholderTextColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              height: '15%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
              opacity: 0,
            }}>
            <View
              style={{
                height: '40%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'gray',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Email:
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                // justifyContent: 'center',
                paddingRight: 10,
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 10,
                }}
                // value={Email}
                // onChangeText={text => setEmail(text)}
                placeholder="here...."
                // placeholderTextColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              height: '15%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
              opacity: 0,
            }}>
            <View
              style={{
                height: '40%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'gray',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Address:
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                // justifyContent: 'center',
                paddingRight: 10,
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                // value={PricePerson.toString()}
                // onChangeText={text => setPricePerson(text)}
                placeholder="here...."
                // placeholderTextColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              height: '30%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: '12%',
                width: '100%',
                // justifyContent: 'center',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Image:
              </Text>
            </View>
            <View
              style={{
                height: '90%',
                width: '100%',
                justifyContent: 'space-evenly',
                paddingRight: 10,
                // paddingBottom: 10,
                alignItems: 'center',
                flexDirection: 'row',
                // backgroundColor: 'gray',
              }}>
              <View
                style={{
                  height: '100%',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={SelectedMultipleFile}
                  style={
                    {
                      // alignSelf: 'flex-start',
                      // paddingTop: 20,
                    }
                  }>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      color: 'white',
                      backgroundColor: 'blue',
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    choose File
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={RemoveFile}
                  style={
                    {
                      // alignSelf: 'flex-start',
                      // paddingTop: 20,
                    }
                  }>
                  <Text
                    style={{
                      fontFamily: 'Inter-Bold',
                      color: 'white',
                      backgroundColor: 'blue',
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    Remove File
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                style={{height: 150, width: 150, borderRadius: 12}}
                source={singleFile.length > 0 ? OKK : images.NotFoundImg}
              />
            </View>
          </View>
          <View
            style={{
              height: '10%',
              width: '100%',
              // borderColor: 'black',
              // borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#00008B',
                borderRadius: 12,
              }}
              onPress={CreateHotel}>
              <Text
                style={{
                  color: 'white',
                  padding: 10,
                  fontFamily: 'Inter-Bold',
                  fontSize: 16,
                }}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <Toast topOffset={10} /> */}
    </View>
  );
};

export default CreateHotelScreen;
