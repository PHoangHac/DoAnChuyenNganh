// import React
import React, {useState, useEffect, useCallback} from 'react';

import axios from 'axios';

// import component core from react-native
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  TouchableHighlight,
} from 'react-native';

// // import function icons, images
import {images, icons} from '../../../constants/index';

// // import fake data
// import { FListData } from '../../../constants/dataDummy';
import {URL} from '../../../context/config';

// Check device
import DeviceInfo from 'react-native-device-info';
// import {getApplicationName, getProduct} from 'react-native-device-info';

// Innit 2 variable get value height and wight of device
const WIGHTDEVICE = Dimensions.get('window').width;
const HEIGHTDEVICE = Dimensions.get('window').height;

// Check thuong hieu nha san xuat
const appName = DeviceInfo.getBrand();
// // let appName2 = DeviceInfo.getBuildNumber();

// if (appName === 'Redmi' || appName === 'google') {
//   console.log('Android Device');
// } else {
//   console.log('IOS device');
// }

// console.log('Producer' + JSON.stringify(appName));

// console.log('Chieu dai:' + HEIGHTDEVICE, 'Chieu rong' + WIGHTDEVICE);

// Init variable = array of shapes(mảng chứa các hình)

const StarIcons = [
  <Image style={{height: 20, width: 20}} source={icons.staricon} />,
  <Image style={{height: 20, width: 20}} source={icons.staricon} />,
  <Image style={{height: 20, width: 20}} source={icons.staricon} />,
  <Image style={{height: 20, width: 20}} source={icons.staricon} />,
  <Image style={{height: 20, width: 20}} source={icons.staricon} />,
];

// Component
const CardPicture = ({FListData}) => {
  // console.log(FListData)
  return (
    <TouchableOpacity>
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
          // marginHorizontal: 10,
          marginRight: 10,
        }}
        // source={FListData.imageUrl}
        source={{uri: `${URL}/${FListData}`}}
      />
    </TouchableOpacity>
  );
};

const DetailsScreen2 = ({navigation, route}) => {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [NameTour, setNameTour] = useState([]);
  const [totalTime, setTotalTime] = useState('');
  const [Description, setDescription] = useState('');
  const [PricePerson, setPricePerson] = useState('');
  const [Images, setImages] = useState('');
  const [Hotel, setHotel] = useState({});
  const [Location, setLocation] = useState({});
  const [transPort, setTransPort] = useState({});

  const pic = JSON.parse(route.params.images);

  const datanamearr = Object.keys(pic).map(key => pic[key]);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : 3);
  }, [textShown]);

  const onTextLayout = useCallback(
    e => {
      if (e.nativeEvent.lines.length > 3 && !textShown) {
        setShowMoreButton(true);
        setNumLines(3);
      }
    },
    [textShown],
  );

  const getByIdTour = useCallback(async () => {
    const getData = await axios.get(
      `${URL}/tour/GetIdTour2/${route.params.id}`,
    );
    setNameTour(getData.data.NameTour);
    setTotalTime(getData.data.totalTime);
    setDescription(getData.data.Description);
    setPricePerson(getData.data.PricePerson);
    setImages(getData.data.images);
    setHotel(getData.data.Hotel);
    setLocation(getData.data.Location);
    setTransPort(getData.data.TypeOfTransport);
  }, [route.params]);

  useEffect(() => {
    getByIdTour();
  }, [getByIdTour]);

  // const routes = useNavigationState(state => state.routes);
  // const previousRoute = routes[routes.length - 2].name;
  // console.log('currentRoute: ', previousRoute);

  // if (NameTour.length >= 30) {
  //   console.log('true');
  // }

  return (
    // Container
    <View
      style={{
        flex: 100,
        backgroundColor: 'white',
      }}>
      {/* Details container */}
      <View
        style={{
          flex: 90,
        }}>
        {/* ScrollView container */}

        <ScrollView
          style={{
            height: HEIGHTDEVICE,
            width: WIGHTDEVICE,
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: HEIGHTDEVICE / 40,
          }}>
          {/* picture container */}
          <View
            style={{
              height: HEIGHTDEVICE / 4,
              width: WIGHTDEVICE,
            }}>
            <ImageBackground
              style={{
                height: HEIGHTDEVICE / 4,
                width: WIGHTDEVICE,
              }}
              // source={images.onboardImage1}
              source={{uri: `${URL}/${pic[0]}`}}
              resizeMode="cover">
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  // borderWidth: 1,
                  // borderColor: 'white',
                  marginHorizontal: 10,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                  }}
                  onPress={() => navigation.goBack()}>
                  <Image
                    style={{
                      height: 32,
                      width: 32,
                      margin: 2,
                    }}
                    source={icons.ArrowBackIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 20,
                  }}>
                  <Image
                    style={{
                      height: 32,
                      width: 32,
                      tintColor: 'red',
                      margin: 2,
                    }}
                    source={icons.favoriteicon}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          {/* End picture container */}
          {/* Header Container*/}
          <View
            style={{
              height: HEIGHTDEVICE / 6.5,
              width: WIGHTDEVICE / 1.1,
              // borderWidth: 1,
              // borderColor: 'black',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            {/* Title */}
            <View
              style={
                {
                  // backgroundColor: 'gray',
                }
              }>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: NameTour.length >= 30 ? 20 : 22,
                  color: 'black',
                  fontFamily: 'Inter-ExtraBold',
                  // backgroundColor: "gray"
                  // marginBottom: NameTour.length >= 30 ? 10 : null,
                }}>
                {NameTour}
                {/* ThaiLand */}
              </Text>
            </View>
            {/* star rating */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {StarIcons.map((icon, index) => (
                <View key={index}>{icon}</View>
              ))}
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Inter-Medium',
                }}>
                (100)
              </Text>
            </View>
            {/* location */}
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'gray',
                marginVertical: 5,
              }}>
              <Image
                style={{
                  height: 26,
                  width: 26,
                  // alignSelf: 'center',
                }}
                source={icons.locationicon}
              />
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontFamily: 'Inter-Regular',
                  alignSelf: appName == 'google' ? 'center' : null,
                  paddingLeft: 3,
                  // marginTop: 5,
                  // backgroundColor: 'gray',
                }}>
                {Location.descLocation}
              </Text>
            </View>
          </View>
          {/* END Header Container*/}
          {/* tour infomation */}
          <View
            style={{
              height: HEIGHTDEVICE / 6,
              width: WIGHTDEVICE / 1.1,
              // borderWidth: 1,
              // borderColor: 'black',
              flexDirection: 'column',
            }}>
            {/* title tour header*/}
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Inter-SemiBold',
                }}>
                Tour Infomation
              </Text>
            </View>
            {/* title tour body */}
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                // alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              {/* line 1 */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: HEIGHTDEVICE >= 800 ? 16 : 12,
                      color: '#7A7A7A',
                      fontFamily: 'Inter-Medium',
                    }}>
                    Total Time: 5 Days
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: HEIGHTDEVICE >= 800 ? 16 : 12,
                      color: '#7A7A7A',
                      fontFamily: 'Inter-Medium',
                      marginRight: 5,
                    }}>
                    Transport:
                  </Text>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    source={icons.busicon}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                    }}
                    source={icons.diningcon}
                  />
                  <Text
                    style={{
                      fontSize: HEIGHTDEVICE >= 800 ? 16 : 12,
                      color: '#7A7A7A',
                      fontFamily: 'Inter-Medium',
                    }}>
                    Dining
                  </Text>
                </View>
              </View>
              {/* line 2 */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 5,
                    }}
                    source={icons.hotelicon}
                  />
                  <Text
                    style={{
                      fontSize: HEIGHTDEVICE >= 800 ? 16 : 12,
                      color: '#7A7A7A',
                      fontFamily: 'Inter-Medium',
                    }}>
                    {Hotel.NameHotel}
                    {/* Hotel: 5 Star */}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: HEIGHTDEVICE >= 800 ? 16 : 12,
                      color: '#7A7A7A',
                      fontFamily: 'Inter-Medium',
                    }}>
                    -------
                  </Text>
                  {/* <Image
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    source={icons.busicon}
                  /> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {/* <Image
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    source={icons.diningcon}
                  /> */}
                  <Text
                    style={{
                      fontSize: HEIGHTDEVICE >= 800 ? 16 : 12,
                      color: '#7A7A7A',
                      fontFamily: 'Inter-Medium',
                    }}>
                    -------
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* END tour infomation */}
          {/* Descriptions Container*/}
          <View
            style={{
              height: textShown == true ? HEIGHTDEVICE / 3 : HEIGHTDEVICE / 6,
              width: WIGHTDEVICE / 1.1,
              // borderWidth: 1,
              // borderColor: 'black',
              flexDirection: 'column',
              marginBottom: textShown == true && appName == 'Redmi' ? 75 : null,
            }}>
            {/* title descriptions*/}
            <View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Inter-SemiBold',
                }}>
                Descriptions
              </Text>
            </View>
            {/* body descriptions*/}
            <View>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 21,
                }}
                onTextLayout={onTextLayout}
                numberOfLines={numLines}
                ellipsizeMode="tail">
                {Description}
              </Text>
              {showMoreButton ? (
                <Text
                  style={{color: 'blue', fontSize: 16, fontWeight: 'bold'}}
                  onPress={toggleTextShown}>
                  {textShown ? 'Read Less' : 'Read More'}
                </Text>
              ) : null}
            </View>
          </View>
          {/* END Descriptions Container*/}
          {/* Details picture tour */}
          <View
            style={{
              height: HEIGHTDEVICE / 6.5,
              width: WIGHTDEVICE / 1.1,
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: appName === 'Redmi' ? 10 : null,
            }}>
            <View>
              {/* <FlatList
                // contentContainerStyle={{paddingHorizontal: 5}}
                data={FListData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <CardPicture FListData={item} />}
              /> */}
              <FlatList
                // contentContainerStyle={{paddingHorizontal: 5}}
                data={datanamearr}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CardPicture FListData={item} />}
              />
            </View>
          </View>
          {/* End picture tour */}
          {/* Star rating */}
          <View
            style={{
              height: HEIGHTDEVICE / 5,
              width: WIGHTDEVICE / 1.1,
              // borderWidth: 1,
              // borderColor: 'black',
            }}>
            {/* container */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ReviewByUserScreen');
              }}
              style={{
                height: '100%',
                width: '100%',
                flexDirection: 'column',
              }}>
              <View
                style={{
                  height: '30%',
                  width: '100%',
                  // backgroundColor: 'blue',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontFamily: 'Inter-SemiBold',
                  }}>
                  Review
                </Text>
              </View>
              <View
                style={{
                  height: '70%',
                  width: '100%',
                  // backgroundColor: 'orange',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    height: '30%',
                    width: '100%',
                    flexDirection: 'row',
                    // backgroundColor: 'blue',
                    // borderWidth: 1,
                    // borderColor: 'black',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      height: '100%',
                      // width: '70%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Image
                        style={{
                          height: 40,
                          width: 40,
                        }}
                        source={images.user}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        paddingLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          color: 'black',
                          fontSize: 12,
                        }}>
                        User name
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          color: 'black',
                          fontSize: 10,
                        }}>
                        A Hour ago
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: '100%',
                      // width: '30%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: 'black',
                      borderRadius: 6,
                      // justifyContent: 'space-evenly',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        paddingRight: 10,
                        paddingLeft: 10,
                        fontSize: 12,
                      }}>
                      4.0
                    </Text>
                    <Image
                      style={{
                        height: 18,
                        width: 18,
                        tintColor: 'white',
                        marginRight: 10,
                      }}
                      source={icons.Start2Icon}
                    />
                  </View>
                </View>
                <View
                  style={{
                    height: '70%',
                    width: '100%',
                    flexDirection: 'row',
                    // borderWidth: 1,
                    // borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      height: '80%',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Regular',
                        color: 'black',
                        fontSize: 13,
                      }}
                      numberOfLines={3}
                      ellipsizeMode="tail">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book.
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* End Star rating */}
          {/* Map */}
          <View
            style={{
              height: HEIGHTDEVICE / 3.5,
              width: WIGHTDEVICE / 1.1,
              // borderWidth: 1,
              // borderColor: 'black',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 220,
                width: 220,
              }}
              source={icons.mapHomeicon}
            />
          </View>
          {/* End Map */}
        </ScrollView>
      </View>
      {/* Btn Booking container */}
      <View
        style={{
          flex: 10,
          backgroundColor: 'green',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: '#1925C3',
        }}>
        {/* Price container */}
        <View>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontFamily: 'Inter-Bold',
            }}>
            $ {PricePerson}/Person
          </Text>
        </View>
        {/* btn container*/}
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Bookings', {
                location: Location.country,
                transport: transPort.nameTransport,
                price: PricePerson,
                idTour: route.params.id,
              })
            }
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 24,
                padding: 13,
                color: '#1925C3',
                fontWeight: 'bold',
              }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen2;
