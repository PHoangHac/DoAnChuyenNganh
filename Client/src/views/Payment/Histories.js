import React, {useEffect, useState, useContext, useCallback} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  TouchableHighlight,
  Animated,
} from 'react-native';

import {icons, images} from '../../constants/index';
import {AuthContext} from '../../context/AuthContext';
import {URL} from '../../context/config';
import {SwipeListView} from 'react-native-swipe-list-view';
import axios from 'axios';
import moment from 'moment';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HistoriesScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [checkId, setCheckId] = useState(null);

  // console.log(showDetails);
  // console.log(checkId);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    OKK();
    wait(1500).then(() => setRefreshing(false));
  }, []);

  const OKK = () => {
    axios
      .get(`${URL}/booking/PaymentSuccess/${userInfo.user.id}`)
      .then(res => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch(e => {
        console.log('Error ', e);
      });
  };

  useEffect(() => {
    OKK();
    const focusHandler = navigation.addListener('focus', () => {
      OKK();
    });
    return focusHandler;
  }, [navigation]);

  const OK = data.map((item, index) => ({
    key: `${index}`,
    TourInfo: item.TourInfo,
    totalCost: item.totalCost,
    createdAt: item.createdAt,
    AdultTotalCost: item.AdultTotalCost,
    ChildrenTotalCost: item.ChildrenTotalCost,
    totalGuest: item.totalGuest,
    Adult: item.Adult,
    Children: item.Children,
    id: item.id,
  }));

  // image NameTour Location.placeName totalCost createdAt

  const closeRow = (rowMap, rowKey) => {
    // console.log(rowMap);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = data => {
    const pic = JSON.parse(data.item.TourInfo.images);
    // console.log(data);
    return (
      <View
        // onPress={showDetails == false ? ShowDetailsEVent : ShowDetailsEVentOut}
        style={{
          height: checkId === data.item.id ? 300 : 120,
          width: '100%',
          marginBottom: 2,
          flexDirection: 'column',
          // backgroundColor: 'gray',
          borderRadius: 9.5,
          borderColor: 'blue',
          borderWidth: 1,
        }}
        underlayColor={'#AEAEAE'}>
        {/* Container */}
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={
            checkId === null
              ? () => setCheckId(data.item.id)
              : () => setCheckId(null)
          }
          style={{
            height: checkId === data.item.id ? 120 : '100%',
            width: '100%',
            flexDirection: 'row',
            backgroundColor: 'indigo',
            borderRadius: 8,
            zIndex: 10,
          }}>
          <View
            style={{
              height: '100%',
              width: '35%',
              // backgroundColor: 'gray',
            }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 7,
                borderColor: 'black',
                borderWidth: 1,
              }}
              source={
                pic.length === 0
                  ? images.NotFoundImg
                  : {uri: `${URL}/${pic[0]}`}
              }
            />
          </View>
          <View
            style={{
              height: '100%',
              width: '65%',
              // backgroundColor: 'blue',
              flexDirection: 'column',
              paddingLeft: 5,
            }}>
            <View
              style={{
                height: '60%',
                width: '100%',
                // backgroundColor: 'gray',
                flexDirection: 'column',
              }}>
              <View
                style={{
                  height: '40%',
                  width: '100%',
                  // backgroundColor: 'gray',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
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
                  numberOfLines={1}
                  // ellipsizeMode="tail"
                  style={{
                    color: 'white',
                    // marginLeft: -10,
                    fontSize: 14,
                    fontFamily: 'Inter-Bold',
                  }}>
                  {data.item.TourInfo.NameTour}
                </Text>
              </View>
              <View
                style={{
                  height: '60%',
                  width: '100%',
                  // backgroundColor: 'yellow',
                  // justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
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
                    // paddingLeft: 10,
                    fontFamily: 'Inter-Bold',
                  }}>
                  {data.item.TourInfo.Location.placeName}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: '40%',
                width: '95%',
                // backgroundColor: 'blue',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  paddingLeft: 10,
                  fontFamily: 'Inter-Bold',
                  backgroundColor: 'white',
                  borderRadius: 15,
                }}>
                $ {data.item.totalCost} / {''}
                {moment(data.item.createdAt).format('MMM Do YY')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            height: 178,
            width: '100%',
            marginTop: checkId === data.item.id ? 120 : null,
            // opacity: checkId === data.item.id ? 0 : 1,
            zIndex: 1,
            // backgroundColor: 'gray',
            flexDirection: 'row',
            display: checkId === data.item.id ? 'flex' : 'none',
          }}>
          <View
            style={{
              height: '100%',
              width: '55%',
              // backgroundColor: 'blue',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              paddingLeft: 5,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  fontSize: 12,
                }}>
                Number Adult: {data.item.Adult}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  fontSize: 12,
                }}>
                Number Children: {data.item.Children}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  fontSize: 12,
                }}>
                Adult Cost: $ {data.item.AdultTotalCost}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  fontSize: 12,
                }}>
                Children Cost: $ {data.item.ChildrenTotalCost}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  fontSize: 12,
                }}>
                Total Guest: {data.item.totalGuest}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: '100%',
              width: 2,
              // backgroundColor: 'black',
              borderStyle: 'dotted',
              borderWidth: 1.5,
              // borderRadius: 1,
              color: 'black',
            }}></View>
          <View
            style={{
              height: '100%',
              width: '45%',
              // backgroundColor: 'green',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              paddingLeft: 8,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  fontSize: 12,
                }}>
                Times: {data.item.TourInfo.totalTime}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  fontSize: 12,
                }}>
                Country: {data.item.TourInfo.Location.country}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  fontSize: 12,
                }}>
                TransPort: {data.item.TourInfo.TypeOfTransport.nameTransport}
              </Text>
              {/* <Image
                style={{
                  height: 25,
                  width: 25,
                }}
                source={{
                  uri: `${URL}/${data.item.TourInfo.TypeOfTransport.image}`,
                }}
              /> */}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    // console.log(data.item.id);

    return (
      <View
        style={{
          height: 120,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // borderColor: 'black',
          // borderWidth: 1,
          backgroundColor: 'white',
          borderRadius: 8,
        }}>
        <View
          style={{
            height: '100%',
            width: '80%',
          }}>
          {/* <Text>Left</Text> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            // borderColor: 'black',
            // borderWidth: 1,
            height: '100%',
            width: '20%',
            justifyContent: 'space-between',
            // backgroundColor: 'gray',
          }}>
          <View
            style={{
              // backgroundColor: 'yellow',
              width: '100%',
              justifyContent: 'center',
              // alignSelf: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => closeRow(rowMap, data.item.key)}>
              <Image
                style={{
                  height: 50,
                  width: '71%',
                  alignSelf: 'center',
                }}
                source={icons.CancelIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

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
        <View
          style={{
            height: '100%',
            width: '90%',
            // paddingBottom: 65,
            alignSelf: 'center',
          }}>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={OK}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            initialNumToRender={5}
            removeClippedSubviews={false}
            // leftOpenValue={75}
            rightOpenValue={-75}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            // onRowDidOpen={onRowDidOpen}
            swipeRowStyle={{
              marginTop: 5,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default HistoriesScreen;

// HistoriesScreen
