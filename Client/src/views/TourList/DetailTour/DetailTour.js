import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

import {images, icons} from '../../../constants/index';

import {FListData} from '../../../constants/dataDummy';

// import {MoreOrLess} from '@rntext/more-or-less';

const WIGHTDEVICE = Dimensions.get('window').width;
// const HEIGHTDEVICE = Dimensions.get('window').height;

// console.log(WIGHTDEVICE);
// console.log(HEIGHTDEVICE);

const DetailsScreen = ({navigation}) => {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

  // console.log(textShown);

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

  const StarIcons = [
    <Image style={{height: 20, width: 20}} source={icons.staricon} />,
    <Image style={{height: 20, width: 20}} source={icons.staricon} />,
    <Image style={{height: 20, width: 20}} source={icons.staricon} />,
    <Image style={{height: 20, width: 20}} source={icons.staricon} />,
    <Image style={{height: 20, width: 20}} source={icons.staricon} />,
  ];

  // const [heightText, setHeightText] = useState('15%');

  // console.log(heightText);

  const CardPicture = ({FListData}) => {
    return (
      <TouchableOpacity>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 15,
            marginHorizontal: 10,
          }}
          source={FListData.imageUrl}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 100, backgroundColor: 'white'}}>
      {/* Details */}
      <View style={{flex: 60}}>
        <ScrollView contentContainerStyle={{paddingBottom: WIGHTDEVICE / 1.1}}>
          {/* Pictures */}
          <View
            style={{
              height: '20%',
              width: '100%',
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('HomeTabs');
                }}
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  left: 10,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  top: 10,
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    margin: 5,
                  }}
                  source={icons.ArrowBackIcon}
                />
              </TouchableOpacity>
              <Image
                resizeMode="cover"
                style={{
                  height: 150,
                  width: '100%',
                }}
                source={images.onboardImage1}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  zIndex: 2,
                  tintColor: 'black',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  right: 10,
                  top: 10,
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    margin: 5,
                  }}
                  source={icons.favoriteicon}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Title */}
          <View
            style={{
              height: 120,
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                // alignItems: 'center',
                top: 10,
              }}>
              {/* Name tour */}
              <Text
                style={{
                  left: 30,
                  fontSize: 25,
                  alignSelf: 'flex-start',
                  color: 'black',
                }}>
                Thailand
              </Text>
              {/* star tour */}
              <View
                style={{
                  left: 30,
                  fontSize: 20,
                  alignSelf: 'flex-start',
                  color: 'black',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {StarIcons.map((icon, index) => (
                  <View style={{marginVertical: 5}} key={index}>
                    {icon}
                  </View>
                ))}
                <Text style={{fontSize: 20}}>(100)</Text>
              </View>
              {/* location tour */}
              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                  left: 30,
                }}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: 5,
                  }}
                  source={icons.locationicon}
                />
                <Text
                  style={{
                    // left: 50,
                    fontSize: 20,
                    // alignSelf: 'flex-start',
                    color: 'black',
                  }}>
                  BangKok, ThaiLand
                </Text>
              </View>
              <View
                style={{
                  height: 5,
                  width: '90%',
                  backgroundColor: '#DFE6E9',
                  alignSelf: 'center',
                  top: 20,
                }}></View>
            </View>
          </View>
          {/* Tour Infomation */}
          <View
            style={{
              height: '20%',
              width: '100%',
              marginTop: 20,
              // alignSelf: 'flex-start',
              // borderWidth: 0.5,
              // borderColor: 'black',
            }}>
            {/* title info */}
            <View>
              <Text
                style={{
                  left: 30,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Tour Infomation
              </Text>
            </View>
            {/* noi dung */}
            <View
              style={{
                flexDirection: 'column',
                // borderWidth: 0.5,
                // borderColor: 'yellow',
                height: '100%',
                width: '100%',
              }}>
              {/* up */}
              <View
                style={{
                  // borderWidth: 0.5,
                  // borderColor: 'blue',
                  height: '30%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                {/* tong thoi gian di */}
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}>
                  Total Time: 5 days
                </Text>
                {/* su dung loai phuong tien nao */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Transport:{' '}
                  </Text>
                  <Image
                    style={{
                      height: 22,
                      width: 22,
                    }}
                    source={icons.busicon}
                  />
                </View>
                {/* dich vu an uong */}
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      height: 25,
                      width: 25,
                      right: 5,
                    }}
                    source={icons.diningcon}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Dining{' '}
                  </Text>
                </View>
              </View>
              {/* down */}
              <View
                style={{
                  // borderWidth: 0.5,
                  // borderColor: 'red',
                  height: '30%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                {/* tong thoi gian di */}
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}>
                  Total Time: 5 days
                </Text>
                {/* su dung loai phuong tien nao */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Transport:{' '}
                  </Text>
                  <Image
                    style={{
                      height: 22,
                      width: 22,
                    }}
                    source={icons.busicon}
                  />
                </View>
                {/* dich vu an uong */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      height: 25,
                      width: 25,
                      right: 5,
                    }}
                    source={icons.diningcon}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                    }}>
                    Dining{' '}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 5,
                  width: '90%',
                  backgroundColor: '#DFE6E9',
                  alignSelf: 'center',
                  top: 10,
                }}
              />
            </View>
          </View>

          {/* Desc */}
          <View
            style={{
              height: textShown == true ? '30%' : '15%',
              marginBottom: 30,
            }}>
            <View style={{left: 30}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Descriptions
              </Text>
            </View>
            <View
              style={{
                left: 30,
                width: '80%',
                marginVertical: 15,
              }}>
              <Text
                style={{fontSize: 16, lineHeight: 21}}
                onTextLayout={onTextLayout}
                numberOfLines={numLines}
                ellipsizeMode="tail">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
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
          {/* Tour detail picture */}
          <View
            style={{
              height: '15%',
              marginVertical: 10,
            }}>
            <View>
              <FlatList
                contentContainerStyle={{paddingHorizontal: 5}}
                data={FListData}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <CardPicture FListData={item} />}
              />
            </View>
          </View>
          {/* Map */}
          <View
            style={{
              height: '35%',
              width: '100%',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: '95%', height: '100%'}}
                source={images.mapIconItem}
              />
            </View>
          </View>
          {/* Reviewer */}
          {/* <View style={{height: 200, borderWidth: 0.5, borderColor: 'black'}}>
            <Text>Reviewers</Text>
          </View> */}
        </ScrollView>
      </View>
      {/* Btn Booking */}
      <View
        style={{
          flex: 7,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: '#4682B4',
          flexDirection: 'row',
          // borderTopStartRadius: 20,
          // borderTopRightRadius: 20,
        }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
            }}>
            $ 200/person
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
          }}
          onPress={() => {
            navigation.navigate('Bookings');
          }}>
          <Text
            style={{
              fontSize: 24,
              padding: 13,
              color: '#4682B4',
              fontWeight: 'bold',
            }}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;
