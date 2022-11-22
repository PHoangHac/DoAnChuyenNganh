import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {icons, images} from '../../../../constants';
import {places, DataFakeImg} from '../../../../constants/dataDummy';
import {Dropdown} from 'react-native-element-dropdown';
import {URL} from '../../../../context/config';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const NewTourScreen = ({navigation}) => {
  const [multipleFile, setMultipleFile] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [DataTSP, setDataTSP] = useState([]);
  const [DataLCT, setDataLCT] = useState([]);
  const [DataHotel, setDataHotel] = useState([]);
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [TSPId, setTSPId] = useState(null);
  const [LCTId, setLCTId] = useState(null);
  const [HotelId, setHotelId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [NameTour, setNameTour] = useState(null);
  const [Abbreviation, setAbbreviation] = useState(null);
  const [totalTime, setTotalTime] = useState(null);
  const [Description, setDescription] = useState(null);
  const [DeparTureDay, setDeparTureDay] = useState(null);
  const [PricePerson, setPricePerson] = useState(null);

  useEffect(() => {
    axios.get(`${URL}/transport/GetAll`).then(res => setDataTSP(res.data));

    axios.get(`${URL}/hotel/GetAll`).then(res => setDataHotel(res.data));

    axios.get(`${URL}/location/GetAll`).then(res => setDataLCT(res.data));
  }, []);

  const OK = DataTSP.map((item, index) => ({
    label: item.nameTransport,
    id: item.id,
    value: `${index}`,
  }));

  const OK2 = DataLCT.map((item, index) => ({
    label: item.placeName,
    country: item.country,
    descLocation: item.descLocation,
    id: item.id,
    value: `${index}`,
  }));

  const OK3 = DataHotel.map((item, index) => ({
    label: item.NameHotel,
    id: item.id,
    value: `${index}`,
  }));

  // console.log(OK3);

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

  const CreateTour = async () => {
    if (
      NameTour === null ||
      Abbreviation === null ||
      totalTime === null ||
      DeparTureDay === null ||
      totalTime === null ||
      PricePerson === null
    ) {
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
              .post(`${URL}/tour/Create`, {
                NameTour: NameTour,
                abbreviation: Abbreviation,
                totalTime: totalTime,
                Departureday: DeparTureDay,
                Description: Description,
                PricePerson: PricePerson,
                idTypesOfTransport: TSPId,
                idHotel: HotelId,
                idLocation: LCTId,
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

  if (loading === true) {
    setTimeout(() => {
      // console.log('Spinner stop running !');
      setLoading(false);
    }, 2500);
  }

  const RemoveFile = () => {
    setMultipleFile([]);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, []);

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
              Create Tour
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
        }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{paddingBottom: 40}}
          showsVerticalScrollIndicator={false}
          style={{
            height: '100%',
            width: '100%',
          }}>
          {/* Name Tour */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              flexDirection: 'column',
              alignSelf: 'center',
              marginTop: 10,
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
                Name Tour:
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
                value={NameTour}
                onChangeText={text => setNameTour(text)}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/*End Name Tour */}

          {/* abbreviation */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginVertical: 10,
              flexDirection: 'column',
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
                Abbreviation:
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
                value={Abbreviation}
                onChangeText={text => setAbbreviation(text)}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/*End abbreviation */}

          {/* TotalTime */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginVertical: 10,
              flexDirection: 'column',
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
                Total Time:
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
                value={totalTime}
                onChangeText={text => setTotalTime(text)}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/*End TotalTime */}

          {/* DeparTureDay */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginVertical: 10,
              flexDirection: 'column',
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
                DeparTure Day:
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
                value={DeparTureDay}
                onChangeText={text => setDeparTureDay(text)}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/*End DeparTureDay */}

          {/* Description */}
          <View
            style={{
              height: 200,
              width: '90%',
              // backgroundColor: 'blue',
              // marginVertical: 10,
              flexDirection: 'column',
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
                Description:
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
                  textAlignVertical: 'top',
                }}
                multiline={true}
                numberOfLines={5}
                maxLength={380}
                value={Description}
                onChangeText={text => setDescription(text)}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/*End Description */}

          {/* PricePerson */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginVertical: 10,
              flexDirection: 'column',
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
                Price Per Person:
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
                value={PricePerson}
                onChangeText={text => setPricePerson(text)}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/*End PricePerson */}

          {/* idTypesOfTransport */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginVertical: 10,
              flexDirection: 'column',
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
                Type of transport:
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '70%',
                // backgroundColor: 'green',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '80%',
                }}>
                <Dropdown
                  style={{
                    height: 50,
                    borderColor: 'gray',
                    borderWidth: 0.5,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                  }}
                  placeholderStyle={{
                    fontSize: 16,
                  }}
                  selectedTextStyle={{
                    fontSize: 16,
                  }}
                  inputSearchStyle={{
                    height: 40,
                    fontSize: 16,
                  }}
                  iconStyle={{
                    width: 20,
                    height: 20,
                  }}
                  data={OK}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select item'}
                  // searchPlaceholder="Search..."
                  value={value}
                  onChange={item => {
                    setValue(item.value);
                    setTSPId(item.id);
                  }}
                />
              </View>

              <View
                style={{
                  height: '100%',
                  //   width: '30%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('NewTransPortScreen');
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    source={icons.AddIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/*End idTypesOfTransport */}

          {/* idHotel */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginVertical: 10,
              flexDirection: 'column',
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
                Hotel:
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '70%',
                // backgroundColor: 'green',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '80%',
                }}>
                <Dropdown
                  style={{
                    height: 50,
                    borderColor: 'gray',
                    borderWidth: 0.5,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                  }}
                  placeholderStyle={{
                    fontSize: 16,
                  }}
                  selectedTextStyle={{
                    fontSize: 16,
                  }}
                  inputSearchStyle={{
                    height: 40,
                    fontSize: 16,
                  }}
                  iconStyle={{
                    width: 20,
                    height: 20,
                  }}
                  data={OK3}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select item'}
                  // searchPlaceholder="Search..."
                  value={value2}
                  onChange={item => {
                    setValue2(item.value);
                    setHotelId(item.id);
                  }}
                />
              </View>

              <View
                style={{
                  height: '100%',
                  //   width: '30%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('NewHotelScreen');
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    source={icons.AddIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/*End idHotel */}

          {/* idLocation */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginVertical: 10,
              flexDirection: 'column',
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
                Location:
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '70%',
                // backgroundColor: 'green',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '80%',
                }}>
                <Dropdown
                  style={{
                    height: 50,
                    borderColor: 'gray',
                    borderWidth: 0.5,
                    borderRadius: 8,
                    paddingHorizontal: 8,
                  }}
                  placeholderStyle={{
                    fontSize: 16,
                  }}
                  selectedTextStyle={{
                    fontSize: 16,
                  }}
                  inputSearchStyle={{
                    height: 40,
                    fontSize: 16,
                  }}
                  iconStyle={{
                    width: 20,
                    height: 20,
                  }}
                  data={OK2}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select item'}
                  // searchPlaceholder="Search..."
                  value={value3}
                  onChange={item => {
                    setValue3(item.value);
                    setLCTId(item.id);
                  }}
                />
              </View>

              <View
                style={{
                  height: '100%',
                  //   width: '30%',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('NewLocationScreen');
                  }}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    source={icons.AddIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/*End idLocation */}

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
          //   backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={CreateTour}
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

export default NewTourScreen;
