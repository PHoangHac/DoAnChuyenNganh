import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import {icons, images} from '../../../../../constants/index';
import {DataFakeImg} from '../../../../../constants/dataDummy';
import {URL} from '../../../../../context/config';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

const NewHotelScreen = ({navigation}) => {
  const [multipleFile, setMultipleFile] = useState([]);
  // const [Data, setData] = useState([]);
  const [nameTsp, setNameTsp] = useState(null);
  const [loading, setLoading] = useState(false);
  const SelectedMultipleFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      setMultipleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // alert('User cancel select file!');
      } else {
        console.log(JSON.stringify(err));
        throw err;
      }
    }
  };

  const CreateHotel = async () => {
    if (nameTsp === null) {
      Toast.show({
        type: 'error',
        text1: 'Status',
        text2: 'SOME FIELD EMPTY ! 👋',
        autoHide: true,
        visibilityTime: 1500,
      });
    } else if (multipleFile.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Status',
        text2: 'PICTURE NOT CHOOSE ! 👋',
        autoHide: true,
        visibilityTime: 1500,
      });
    } else {
      try {
        const data = new FormData();
        multipleFile.forEach((item, i) => {
          data.append('MultipleFiles', {
            uri: item.uri,
            type: 'image/jpeg',
            name: item.filename || `filename${i}.jpg`,
          });
        });
        const res = await axios({
          method: 'POST',
          url: `${URL}/Upload/upload-multiple`,
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => {
            axios
              .post(`${URL}/hotel/Create`, {
                NameHotel: nameTsp,
                images: res.data.split(' '),
              })
              .then(res => {
                console.log(res.data);
                setLoading(true);
                setTimeout(() => {
                  Toast.show({
                    type: 'success',
                    text1: 'Status',
                    text2: 'CREATE SUCCESSFULLY ! 👋',
                  });
                }, 2500);
              });
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading === true) {
    setTimeout(() => {
      // console.log('Spinner stop running !');
      setLoading(false);
    }, 2500);
  }

  const RemoveFile = () => {
    setSingleFile([]);
    setMultipleFile([]);
  };
  return (
    <View
      style={{
        flex: 100,
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <Spinner visible={loading} />
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
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
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
              Create Hotel
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
              <Image
                style={{
                  height: 50,
                  width: 50,
                }}
                source={images.user}
              />
              {/* <Text
                style={{
                  color: 'white',
                }}>
                user name
              </Text> */}
            </View>
          </View>
        </View>
      </View>
      {/* End Header */}
      <View
        style={{
          flex: 80,
          backgroundColor: 'white',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: '100%',
            width: '100%',
          }}>
          {/* Country */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginTop: 10,
              marginBottom: 10,
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '30%',
                // backgroundColor: 'blue',
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Name Hotel:
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '70%',
                // backgroundColor: 'green',
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 10,
                }}
                value={nameTsp}
                onChangeText={text => setNameTsp(text)}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/* End Country */}

          {/* Images */}
          <View
            style={{
              height: 400,
              width: '90%',
              //   backgroundColor: 'blue',
              alignSelf: 'center',
              flexDirection: 'column',
            }}>
            <View
              style={{
                height: '8%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'blue',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Images:
              </Text>
            </View>
            <View
              style={{
                height: '92%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '35%',
                  //   backgroundColor: 'blue',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    height: '40%',
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={SelectedMultipleFile}
                    style={{
                      backgroundColor: 'blue',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        padding: 8,
                      }}>
                      Choose Files
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={RemoveFile}
                    style={{
                      backgroundColor: 'blue',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        padding: 8,
                      }}>
                      Remove Files
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: '60%',
                    width: '100%',
                    // backgroundColor: 'yellow',
                  }}></View>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '60%',
                  //   backgroundColor: 'blue',
                  //   borderColor: 'black',
                  //   borderWidth: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {multipleFile.length === 0 ? (
                  <>
                    {DataFakeImg.map((item, index) => {
                      // console.log(item);
                      return (
                        <View
                          style={{
                            paddingRight: 10,
                            paddingBottom: 10,
                            // paddingLeft: 10,
                          }}
                          key={index}>
                          {/* <Text>{item.name}</Text> */}
                          <Image
                            style={{
                              height: 95,
                              width: 95,
                              borderRadius: 8,
                            }}
                            source={item.image}
                          />
                        </View>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {multipleFile.map((item, index) => {
                      // console.log(item);
                      return (
                        <View
                          style={{
                            paddingRight: 10,
                            paddingBottom: 10,
                            // paddingLeft: 10,
                          }}
                          key={index}>
                          {/* <Text>{item.name}</Text> */}
                          <Image
                            style={{
                              height: 95,
                              width: 95,
                              borderRadius: 8,
                            }}
                            // source={{uri: item.name}}
                            source={item}
                          />
                        </View>
                      );
                    })}
                  </>
                )}
              </View>
            </View>
          </View>
          {/* End Images */}
        </ScrollView>
      </View>

      <View
        style={{
          flex: 10,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={CreateHotel}
          style={{
            backgroundColor: 'blue',
            borderRadius: 12,
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              color: 'white',
              padding: 12,
              fontSize: 16,
            }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
      <Toast topOffset={10} />
    </View>
  );
};

export default NewHotelScreen;
