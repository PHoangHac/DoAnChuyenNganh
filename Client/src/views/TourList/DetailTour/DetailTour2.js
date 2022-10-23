// import React
import React, { useState, useEffect, useCallback } from 'react';

import { useRoute } from '@react-navigation/native';

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
} from 'react-native';

// import function icons, images
import { images, icons } from '../../../constants/index';

// import fake data
import { FListData } from '../../../constants/dataDummy';

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
  <Image style={{ height: 20, width: 20 }} source={icons.staricon} />,
  <Image style={{ height: 20, width: 20 }} source={icons.staricon} />,
  <Image style={{ height: 20, width: 20 }} source={icons.staricon} />,
  <Image style={{ height: 20, width: 20 }} source={icons.staricon} />,
  <Image style={{ height: 20, width: 20 }} source={icons.staricon} />,
];

// Component
const CardPicture = ({ FListData }) => {
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
        source={FListData.imageUrl}
      />
    </TouchableOpacity>
  );
};

const URL = `http://192.168.1.8:9090`;

const DetailsScreen2 = ({ navigation }) => {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [NameTour, setNameTour] = useState([]);
  const [totalTime, setTotalTime] = useState("");
  const [Description, setDescription] = useState("");
  const [PricePerson, setPricePerson] = useState("");
  const [Images, setImages] = useState("");
  const [Hotel, setHotel] = useState({});

  // console.log(Hotel)

  // const pic = JSON.parse(Images);
  // // console.log(typeof pic[0]);
  // const filenames = pic.map(function (item) {
  //   return item.path; // or file.originalname
  // });

  // console.log(filenames)

  const route = useRoute();

  // console.log(route.params)

  // console.log(textShown);

  const URL = `http://192.168.1.8:9090`;

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
    const getData = await axios.get(`${URL}/tour/GetIdTour2/${route.params}`);
    setNameTour(getData.data.NameTour);
    setTotalTime(getData.data.totalTime);
    setDescription(getData.data.Description);
    setPricePerson(getData.data.PricePerson);
    setImages(getData.data.images);
    setHotel(getData.data.Hotel);
  }, [route.params]);

  useEffect(() => {
    getByIdTour();
  }, [getByIdTour]);

  // useEffect(() => {
  //   fetch(`${URL}/tour/GetIdTour2/${route.params}`, {
  //     method: 'GET',
  //   })
  //     .then(response => response.json())
  //     .then(json => setData(json))
  //     .catch(err => console.error(err))
  //     .finally(() => setLoading(true));
  // }, []);

  // console.log(data)


  // console.log(filenames);

  // const Chuoi =
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged sadsd dadsadad dadd sdasd ddddddd.";
  // console.log(Chuoi.length);
  // console.log(JSON.parse(data.images));
  // console.log(data.images)

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
              source={images.onboardImage1}
              // source={{ uri: `${URL}/${filenames[0]}` }}
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
            <View>
              <Text
                style={{
                  fontSize: 22,
                  color: 'black',
                  fontFamily: 'Inter-ExtraBold',
                  // backgroundColor: "gray"
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
                // borderWidth: 1,
                // borderColor: 'black',
              }}>
              <Image
                style={{
                  height: 26,
                  width: 26,
                  alignSelf: 'center',
                }}
                source={icons.locationicon}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Inter-Light',
                  alignSelf: appName == 'google' ? 'center' : null,
                  marginTop: 5,
                }}>
                Wat Pho, BangKok, ThaiLand
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
                  style={{ color: 'blue', fontSize: 16, fontWeight: 'bold' }}
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
            <View
              style={
                {
                  // borderWidth: 1,
                  // borderColor: 'red',
                }
              }>
              <FlatList
                // contentContainerStyle={{paddingHorizontal: 5}}
                data={FListData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <CardPicture FListData={item} />}
              />
            </View>
          </View>
          {/* End picture tour */}
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
            $ 200/Person
          </Text>
        </View>
        {/* btn container*/}
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Bookings')}
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
