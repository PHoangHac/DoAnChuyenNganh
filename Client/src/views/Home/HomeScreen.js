import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import DeviceInfo from 'react-native-device-info';

// import { places } from '../../constants/dataDummy';
import { icons, images } from '../../constants/index';
const WDwidth = Dimensions.get('window').width;
const WDheight = Dimensions.get('window').height;

// const screen = Dimensions.get('screen');

// console.log(screen);

// console.log('Chieu dai man hinh:' + WDheight, 'Chieu rong man hinh:' + WDwidth);

const HomeScreen = ({ navigation }) => {
  const appName = DeviceInfo.getBrand();
  const [data, setData] = useState([]);
  const [dataTour, setDataTour] = useState([]);
  const [loading, setLoading] = useState(false);


  // const String =
  //   'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.';
  // console.log(String.length);

  // console.log(loading);
  // const URL = `http://192.168.1.13:9090/transport/GetAll`;
  const URL = `http://192.168.1.8:9090`;

  // fect data transport
  useEffect(() => {
    fetch(`${URL}/transport/GetAll`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.error(err))
      .finally(() => setLoading(true));
  }, []);

  useEffect(() => {
    fetch(`${URL}/tour/GetAll`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => setDataTour(json))
      .catch(err => console.error(err))
      .finally(() => setLoading(true));
  }, []);

  // console.log(dataTour);
  // const categoryIcons = [
  //   <Image style={{height: 50, width: 50}} source={icons.airplaneicon} />,
  //   <Image style={{height: 50, width: 50}} source={icons.truckicon} />,
  //   <Image style={{height: 50, width: 50}} source={icons.tranicon} />,
  //   <Image style={{height: 50, width: 50}} source={icons.shipicon} />,
  // ];

  const StarIcons = [
    <Image style={{ height: 12, width: 12 }} source={icons.staricon} />,
    <Image style={{ height: 12, width: 12 }} source={icons.staricon} />,
    <Image style={{ height: 12, width: 12 }} source={icons.staricon} />,
    <Image style={{ height: 12, width: 12 }} source={icons.staricon} />,
    <Image style={{ height: 12, width: 12 }} source={icons.staricon} />,
  ];

  const ListCategories = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          top: 10,
        }}>
        {loading ? (
          data.map((icon, index) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: '#EFEFEF',
                  borderRadius: 10,
                  elevation: 5,
                  // borderWidth: 1,
                  // borderColor: 'black',
                }}
                key={index}>
                <View style={{ padding: 5 }}>
                  <Image
                    style={{ height: 50, width: 50 }}
                    source={{ uri: `${URL}/${icon.image}` }}
                  />
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View
            style={{
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}>
            <ActivityIndicator size="large" color="#1925C3" />
          </View>
        )}
      </View>
    );
  };

  const Card = ({ place }) => {
    // console.log(typeof JSON.parse(place.images));
    // console.log(place.Location.country)
    // console.log(place.id)
    const pic = JSON.parse(place.images);
    // console.log(typeof pic[0]);
    const filenames = pic.map(function (item) {
      return item.path; // or file.originalname
    });
    // console.log(filenames);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailsScreen2',
          place.id)}
        style={{ marginHorizontal: 10 }}
        activeOpacity={0.82}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#EBF0EF',
            borderRadius: 20,
            shadowColor: 'gray',
            shadowOpacity: 2,
            elevation: 10,
            marginBottom: 10,
          }}>
          {/* picture */}
          <Image
            style={{
              height: 150,
              width: 150,
              borderRadius: 12,
            }}
            source={{ uri: `${URL}/${filenames[0]}` }}
          />
          {/* body */}
          <View
            style={{
              flexDirection: 'column',
              width: 150,
              borderRadius: 20,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Inter-Bold',
                color: 'black',
              }}>
              {place.NameTour}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {StarIcons.map((icon, index) => (
                <View
                  style={{
                    marginTop: 10,
                    marginHorizontal: 2,
                  }}
                  key={index}>
                  {icon}
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
              }}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={icons.locationicon}
              />
              <Text
                style={{
                  fontSize: 13,
                  paddingLeft: 5,
                  color: 'black',
                  fontFamily: 'Inter-Medium',
                }}>
                {place.Location.country}
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 13,
                  color: '#1925C3',
                  fontFamily: 'Inter-Bold',
                }}>
                $ {place.PricePerson}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: 'Inter-Bold',
                  color: '#551613',
                }}>
                /Person
              </Text>
            </View>
          </View>
        </View>
        {/* <ImageBackground
          style={{
            height: 150,
            width: 150,
            borderRadius: 12,
          }}
          source={place.image}></ImageBackground> */}
      </TouchableOpacity>
    );
  };

  // <TouchableOpacity
  //       onPress={() => navigation.navigate('DetailsScreen2')}
  //       style={{marginHorizontal: 10}}
  //       activeOpacity={0.82}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           backgroundColor: '#EBF0EF',
  //           borderRadius: 20,
  //           shadowColor: 'gray',
  //           shadowOpacity: 2,
  //           elevation: 10,
  //           marginBottom: 10,
  //         }}>
  //         {/* picture */}
  //         <Image
  //           style={{
  //             height: 150,
  //             width: 150,
  //             borderRadius: 12,
  //           }}
  //           source={{uri: `${URL_STATCI}/${place.images[0]}`}}
  //         />
  //         {/* body */}
  //         <View
  //           style={{
  //             flexDirection: 'column',
  //             width: 150,
  //             borderRadius: 20,
  //             paddingLeft: 10,
  //             paddingRight: 10,
  //           }}>
  //           <Text
  //             style={{
  //               fontSize: 14,
  //               fontFamily: 'Inter-Bold',
  //               color: 'black',
  //             }}>
  //             {place.NameTour}
  //           </Text>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //             }}>
  //             {StarIcons.map((icon, index) => (
  //               <View
  //                 style={{
  //                   marginTop: 10,
  //                   marginHorizontal: 2,
  //                 }}
  //                 key={index}>
  //                 {icon}
  //               </View>
  //             ))}
  //           </View>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               paddingTop: 10,
  //             }}>
  //             <Image
  //               style={{
  //                 height: 20,
  //                 width: 20,
  //               }}
  //               source={icons.locationicon}
  //             />
  //             <Text
  //               style={{
  //                 fontSize: 14,
  //                 paddingLeft: 5,
  //                 color: 'black',
  //                 fontFamily: 'Inter-Medium',
  //               }}>
  //               {place.location}
  //             </Text>
  //           </View>
  //           <View
  //             style={{
  //               marginTop: 10,
  //               flexDirection: 'row',
  //             }}>
  //             <Text
  //               style={{
  //                 fontSize: 14,
  //                 color: '#1925C3',
  //                 fontFamily: 'Inter-Medium',
  //               }}>
  //               $ {place.PricePerson}
  //             </Text>
  //             <Text
  //               style={{
  //                 fontSize: 14,
  //                 fontFamily: 'Inter-Medium',
  //                 color: '#551613',
  //               }}>
  //               /Person
  //             </Text>
  //           </View>
  //         </View>
  //       </View>
  //       {/* <ImageBackground
  //         style={{
  //           height: 150,
  //           width: 150,
  //           borderRadius: 12,
  //         }}
  //         source={place.image}></ImageBackground> */}
  //     </TouchableOpacity>

  const PopularCard = ({ place }) => {
    const pic = JSON.parse(place.images);
    // console.log(typeof pic[0]);
    const filenames = pic.map(function (item) {
      return item.path; // or file.originalname
    });
    return (
      <TouchableOpacity>
        <ImageBackground
          style={{
            width: WDwidth - 40,
            height: 200,
            marginRight: 20,
            borderRadius: 10,
            overflow: 'hidden',
            padding: 5,
          }}
          source={{ uri: `${URL}/${filenames[2]}` }}
        // source={place.image}
        >
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              right: 5,
              borderRadius: 10,
              top: 5,
              flexDirection: 'row',
            }}>
            <Image
              style={{
                height: 20,
                width: 20,
                zIndex: 999,
                alignSelf: 'center',
                marginLeft: 5,
              }}
              source={icons.locationicon}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                padding: 5,
                fontFamily: 'Inter-SemiBold',
              }}>
              {place.Location.country}
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 100, backgroundColor: 'white' }}>
      {/* Header */}
      <View
        style={{
          flex: 20,
          elevation: 4,
          borderBottomEndRadius: 1,
          width: '100%',
          backgroundColor: '#1925C3',
        }}>
        {/* Infomation */}
        <View
          style={{
            flexDirection: 'row',
            top: 20,
            left: 20,
          }}>
          <Image
            style={{
              height: 50,
              width: 50,
              right: 0,
              borderColor: 'white',
              borderWidth: 2,
              borderRadius: 20,
            }}
            source={images.user}
          />
          <View
            style={{
              left: 10,
              right: 0,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
                color: 'white',
              }}>
              Hello, Dung
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontFamily: 'Inter-Light',
              }}>
              TP.HCM, VietNam
            </Text>
          </View>
        </View>
        {/* Search bar */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            top: 30,
          }}>
          <Image
            style={{
              height: 30,
              width: 30,
              position: 'absolute',
              alignItems: 'flex-start',
              zIndex: 10,
              left: 30,
            }}
            source={icons.searchicon}
          />
          <TextInput
            onPressIn={() => {
              navigation.navigate('Search');
            }}
            disableFullscreenUI={false}
            style={{
              backgroundColor: 'gray',
              borderRadius: 15,
              height: '90%',
              width: '90%',
              color: 'white',
              backgroundColor: '#EFEFEF',
              elevation: 5,
              paddingLeft: 55,
            }}
            placeholder="Search for place...."
            placeholderTextColor={appName == 'Redmi' ? '#A4D5DE' : '#7E6FAA'}
          />
        </View>
      </View>
      {/* Scroll */}
      <View style={{ flex: 75 }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 90 }}
          style={{ height: '100%', width: '100%' }}>
          {/* Categories */}
          <View
            style={{
              height: 100,
            }}>
            {/* text */}
            <View>
              <Text
                style={{
                  margin: 10,
                  left: 10,
                  fontSize: 16,
                  fontFamily: 'Inter-ExtraBold',
                  color: 'black',
                }}>
                Types of transport
              </Text>
            </View>
            {/* Type */}
            <ListCategories />
          </View>
          {/* Recommend */}
          <View
            style={{
              height: 250,
              flexDirection: 'column',
              // justifyContent: 'flex-start',
              marginVertical: 25,
              // backgroundColor: 'gray',
            }}>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#EBF0EF',
                top: 10,
                width: '80%',
                alignSelf: 'center',
              }}></View>
            <View style={{ margin: 20, left: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-ExtraBold',
                  color: 'black',
                }}>
                Recommend
              </Text>
            </View>
            <View>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 10 }}
                data={dataTour}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <Card place={item} />}
              />
            </View>
          </View>
          {/* popular */}
          <View
            style={{
              height: '35%',
              flexDirection: 'column',
              // backgroundColor: 'gray',
              top: -30,
            }}>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#EBF0EF',
                top: 10,
                width: '80%',
                alignSelf: 'center',
              }}></View>
            <View style={{ margin: 20, left: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-ExtraBold',
                  color: 'black',
                }}>
                Popular
              </Text>
            </View>
            <View>
              <FlatList
                snapToInterval={WDwidth - 20}
                contentContainerStyle={{ paddingLeft: 20 }}
                data={dataTour}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <PopularCard place={item} />}
              />
            </View>
          </View>
          <View style={{ height: '8%' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{
                  height: 220,
                  width: 220,
                }}
                source={icons.mapHomeicon}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
