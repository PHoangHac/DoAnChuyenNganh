import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {icons, images} from '../../constants/index';
import {Review} from '../../constants/dataDummy';
import axios from 'axios';
import {URL} from '../../context/config';
import moment from 'moment';

const Item = ({data}) => {
  return (
    <View
      style={{
        height: 220,
        width: '95%',
        alignSelf: 'center',
        borderBottomColor: '#B0C4DE',
        borderBottomWidth: 0.5,
        // marginVertical: 10,
        // backgroundColor: 'blue',
        // marginTop: 10,
      }}>
      {/* Container */}
      <View
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'column',
        }}>
        {/* header */}
        <View
          style={{
            height: '30%',
            width: '100%',
            // borderWidth: 1,
            // borderColor: 'black',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: '70%',
              flexDirection: 'row',
              // backgroundColor: 'gray',
            }}>
            <View
              style={{
                height: '100%',
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 55,
                  width: 55,
                }}
                source={images.user}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '70%',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  color: 'black',
                  fontSize: 14,
                }}>
                {/* User name */}
                {data.User.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  color: 'black',
                  fontSize: 12,
                }}>
                {/* A hour ago */}
                {moment(data.createdAt).startOf('hour').fromNow()}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: '100%',
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'black',
                flexDirection: 'row',
                borderRadius: 8,
                padding: 4,
              }}>
              <Text
                style={{
                  color: 'white',
                  paddingRight: 10,
                  paddingLeft: 10,
                  fontSize: 14,
                }}>
                {data.Rating.toFixed(1)}
              </Text>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  tintColor: 'white',
                  marginRight: 5,
                  alignSelf: 'center',
                }}
                source={icons.Start2Icon}
              />
            </View>
          </View>
        </View>
        {/* body */}
        {/* 120 - 200 , 100 - 150, 80 - 100*/}
        <View
          style={{
            height:
              data.Comment.length == 200
                ? 120
                : data.Comment.length <= 100
                ? 80
                : data.Comment.length <= 150
                ? 100
                : 120,
            // 120,
            width: '100%',
            // borderWidth: 1,
            // borderColor: 'black',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '100%',
              width: '95%',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Light',
                color: 'black',
                fontSize: 13,
                lineHeight: 18,
              }}>
              {/* {data.descripton} */}
              {data.Comment}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ReviewByTourScreen = ({navigation, route}) => {
  const [Data, setData] = useState([]);
  let StateRating;
  const renderItem = ({item}) => <Item navigation={navigation} data={item} />;

  const OKK = () => {
    axios
      .get(`${URL}/Review/GetAllByTour/${route.params.idTour}`)
      .then(res => {
        setData(res.data);
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

  const okk = Data.map(item => {
    return item.Rating;
  });

  const averageStar =
    okk.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0) / Data.length;

  switch (true) {
    case averageStar == 5:
      StateRating = 'Great !';
      break;
    case averageStar >= 4:
      StateRating = 'Good !';
      break;
    case averageStar >= 3:
      StateRating = 'Okay !';
      break;
    case averageStar >= 2:
      StateRating = 'Not Bad !';
      break;
    case averageStar >= 1:
      StateRating = 'bad !';
      break;
    case averageStar <= 1:
      StateRating = 'Terrible !';
      break;
    default:
      StateRating = 'No Review !';
      break;
  }

  // if (isNaN(averageStar)) {
  //   console.log('true');
  // } else {
  //   console.log('false');
  // }

  // console.log(isNaN(averageStar));

  return (
    <View
      style={{
        flex: 100,
      }}>
      <View
        style={{
          flex: 10,
          //   backgroundColor: 'blue',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#00008B',
          }}>
          <View
            style={{
              height: '100%',
              width: '20%',
              //   backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                }}
                source={icons.ArrowBackIcon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '100%',
              width: '60%',
              justifyContent: 'center',
              paddingLeft: 40,
              //   alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inter-Bold',
                fontSize: 18,
              }}>
              Guest Review
            </Text>
          </View>
          <View
            style={{
              height: '100%',
              width: '20%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ReviewByUserScreen', {
                  idTour: route.params.idTour,
                });
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                }}
                source={icons.AddIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 12,
          width: '100%',
          //   borderWidth: 2,
          //   borderColor: '#B0C4DE',
          borderBottomColor: '#B0C4DE',
          borderBottomWidth: 3,
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
          }}>
          <View
            style={{
              height: '50%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                color: 'black',
                fontSize: 16,
              }}>
              {isNaN(averageStar) ? 0 : averageStar.toFixed(1)}/5 -{' '}
              {StateRating}
            </Text>
          </View>
          <View
            style={{
              height: '50%',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                color: 'black',
                fontSize: 12,
              }}>
              Total {Data.length} Reviews
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 93,
          // backgroundColor: 'orange',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
          }}>
          <FlatList
            // style={{
            //   height: '100%',
            //   width: '100%',
            // }}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            // contentContainerStyle={{paddingBottom: 60}}
            data={Data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewByTourScreen;
