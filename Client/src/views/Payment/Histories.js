import React, {useEffect, useState, useContext, useRef} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {icons} from '../../constants/index';
import {AuthContext} from '../../context/AuthContext';
import moment from 'moment';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {URL} from '../../context/config';

const HistoriesScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userInfo} = useContext(AuthContext);
  const [showDetails, setShowDetails] = useState(false);
  const [checkId, setCheckId] = useState(0);
  // const [showDetails2, setShowDetails2] = useState(false);

  // const GetData = data.map(item => {
  //   return item.id;
  // });

  // console.log(checkId);
  // console.log(GetData.includes(checkId));

  const ShowDetailsEVent = () => {
    setShowDetails(true);
    ChangeSize();
  };
  const ShowDetailsEVentOut = () => {
    setShowDetails(false);
    ChangeSizePre();
  };

  useEffect(() => {
    fetch(`${URL}/booking/PaymentSuccess/${userInfo.user.id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.error(err))
      .finally(() => setLoading(true));
  }, []);

  // console.log(data);

  const animation = useSharedValue({marginTop: 0, opacity: 0, height: 150});

  const animationStyle = useAnimatedStyle(() => {
    return {
      marginTop: withTiming(animation.value.marginTop, {
        duration: 1000,
      }),
      opacity: withTiming(animation.value.opacity, {
        duration: 1500,
      }),
    };
  });

  const animationStyleContainer = useAnimatedStyle(() => {
    return {
      height: withTiming(animation.value.height, {
        duration: 1000,
      }),
    };
  });

  const ChangeSize = () => {
    animation.value = {marginTop: 125, opacity: 1, height: 280};
  };

  const ChangeSizePre = () => {
    animation.value = {marginTop: -10, opacity: 0, height: 150};
  };

  useEffect(() => {
    animationStyle;
    animationStyleContainer;
  }, []);

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: 'white',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      {/* header */}
      <View
        style={{
          flex: 12,
          backgroundColor: '#191970',
        }}>
        {/* header container */}
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* icons */}
          <View
            style={{
              // backgroundColor: 'blue',
              marginLeft: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 20,
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  tintColor: 'white',
                }}
                source={icons.ArrowBackIcon}
              />
            </TouchableOpacity>
          </View>
          {/* title */}
          <View
            style={{
              // backgroundColor: 'orange',
              marginRight: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Inter-Black',
                color: 'white',
              }}>
              Histories
            </Text>
          </View>
        </View>
      </View>
      {/* body */}
      <View
        style={{
          flex: 88,
          backgroundColor: 'white',
        }}>
        {/* Scroll view */}
        <ScrollView
          style={{
            height: '100%',
            width: '100%',
            marginTop: 10,
          }}>
          {data.map((item, index) => {
            // console.log(typeof item.TourInfo.images);
            let picture = JSON.parse(item.TourInfo.images);
            // console.log(picture[0]);

            // console.log(item.id);
            return (
              <Animated.View
                style={[
                  {
                    height: 150,
                    // height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    // borderColor: 'red',
                    // borderWidth: 1,
                  },
                  checkId == item.id && animationStyleContainer,
                ]}
                key={index}>
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: '90%',
                    backgroundColor:
                      (showDetails == true) & (checkId == item.id)
                        ? '#F28C28'
                        : '#1E90FF',
                    borderRadius: 15,
                    // marginBottom: 15,
                    elevation: 5,
                    marginTop: 3,
                    zIndex: 999,
                    flexDirection: 'row',
                    // transform: [{scaleY: 2}],
                  }}
                  // onLongPress={() => console.log(index)}
                  onPressIn={() => setCheckId(item.id)}
                  onPress={
                    showDetails == false
                      ? ShowDetailsEVent
                      : ShowDetailsEVentOut
                  }>
                  {/* 3 row */}
                  {/* image */}
                  <View
                    style={{
                      height: '100%',
                      width: '35%',
                      // backgroundColor: 'yellow',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 12,
                      }}
                      source={{uri: `${URL}/${picture[0]}`}}
                    />
                  </View>
                  {/* body */}
                  <View
                    style={{
                      height: '100%',
                      width: '65%',
                      // backgroundColor: 'green',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                      paddingLeft: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Image
                        style={{
                          height: 22,
                          width: 22,
                          marginRight: 3,
                        }}
                        source={icons.SignPostIcon}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                          fontFamily: 'Inter-Black',
                        }}>
                        {item.TourInfo.NameTour}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <Image
                        style={{
                          height: 22,
                          width: 22,
                          marginRight: 3,
                        }}
                        source={icons.locationicon}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 12,
                          fontFamily: 'Inter-Regular',
                          alignSelf: 'center',
                        }}>
                        {item.TourInfo.Location.placeName}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontFamily: 'Inter-Medium',
                      }}>
                      $ {item.TourInfo.PricePerson} /{' '}
                      {moment(item.createdAt).startOf('hour').fromNow()}
                    </Text>
                  </View>
                  {/* btn */}
                  {/* <View
                    style={{
                      height: '100%',
                      width: '25%',
                      // backgroundColor: 'red',
                    }}></View> */}
                </TouchableOpacity>
                {checkId == item.id && (
                  <Animated.View
                    style={[
                      {
                        position: 'absolute',
                        height: 150,
                        width: '90%',
                        backgroundColor: '#F88379',
                        borderRadius: 15,
                        marginBottom: 15,
                      },
                      checkId == item.id && animationStyle,
                    ]}></Animated.View>
                )}
              </Animated.View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default HistoriesScreen;

// HistoriesScreen
