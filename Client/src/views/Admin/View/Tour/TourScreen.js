import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {icons, images} from '../../../../constants/index';
import {URL} from '../../../../context/config';
import moment from 'moment';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const renderItem = data => {
  const pic = JSON.parse(data.item.images);
  return (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={{
        height: 120,
        width: '100%',
        backgroundColor: 'indigo',
        borderRadius: 8,
      }}
      underlayColor={'#AEAEAE'}>
      {/* Container */}
      <View
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'row',
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
              borderRadius: 8,
            }}
            source={{uri: `${URL}/${pic[0]}`}}
          />
        </View>
        <View
          style={{
            height: '100%',
            width: '65%',
            // backgroundColor: 'blue',
            flexDirection: 'column',
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
              }}>
              <Text
                style={{
                  color: 'white',
                  paddingLeft: 10,
                  fontFamily: 'Inter-Medium',
                }}>
                {moment(data.item.createdAt).format('MMM Do YY')}
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                // backgroundColor: 'yellow',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  paddingLeft: 10,
                  fontFamily: 'Inter-Bold',
                }}>
                {data.item.NameTour} {''}
                {data.item.abbreviation}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: '40%',
              width: '75%',
              // backgroundColor: 'blue',
              justifyContent: 'center',
              paddingLeft: 5,
            }}>
            <Text
              style={{
                color: 'black',
                paddingLeft: 10,
                fontFamily: 'Inter-Bold',
                backgroundColor: 'white',
                borderRadius: 15,
              }}>
              {data.item.PricePerson} / Person
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const TourScreen = ({navigation}) => {
  const [DataTest, setDataTest] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    OKK();
    wait(1500).then(() => setRefreshing(false));
  }, []);

  const OKK = () => {
    axios
      .get(`${URL}/tour/GetAll`)
      .then(res => {
        setDataTest(res.data);
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

  const OK = DataTest.map((item, index) => ({
    key: `${index}`,
    NameTour: item.NameTour,
    abbreviation: item.abbreviation,
    PricePerson: item.PricePerson,
    images: item.images,
    createdAt: item.createdAt,
    id: item.id,
  }));

  // console.log(OK);

  const closeRow = (rowMap, rowKey) => {
    // console.log(rowMap);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const DeleteTour = async id => {
    await axios.delete(`${URL}/tour/DeleteTour/${id}`).then(res => {
      console.log(res.data);
      Toast.show({
        type: 'success',
        text1: 'Status',
        text2: 'DELETE SUCCESSFULLY ! 👋',
        autoHide: true,
        visibilityTime: 1500,
      });
      OKK();
    });
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
            width: '58%',
          }}>
          {/* <Text>Left</Text> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            // borderColor: 'black',
            // borderWidth: 1,
            height: '100%',
            width: '42%',
            justifyContent: 'space-between',
            // backgroundColor: 'gray',
          }}>
          <View
            style={{
              // backgroundColor: 'yellow',
              width: '33.3%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => closeRow(rowMap, data.item.key)}>
              <Image
                style={{
                  height: 39.3,
                  width: '80%',
                  alignSelf: 'center',
                }}
                source={icons.CancelIcon}
              />
            </TouchableOpacity>
            {/* <Text>Close</Text> */}
          </View>
          <View
            style={{
              // backgroundColor: 'green',
              width: '33.3%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('UpdateTourScreen', {
                  idTour: data.item.id,
                })
              }>
              <Image
                style={{
                  height: 39.3,
                  width: '80%',
                  alignSelf: 'center',
                }}
                source={icons.EditIcon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              // backgroundColor: '#8B0000',
              width: '33.3%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => DeleteTour(data.item.id)}>
              <Image
                style={{
                  height: 39.3,
                  width: '80%',
                  alignSelf: 'center',
                }}
                source={icons.TrashIcon}
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
              }}>
              <Image
                style={{
                  height: 35,
                  width: 35,
                  // tintColor: 'white',
                }}
                source={icons.AddIcon}
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
              Tour Manager
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

      {/* Body */}
      <View
        style={{
          flex: 90,
          // backgroundColor: 'green',
        }}>
        {/* Container */}
        <View
          style={{
            height: '100%',
            width: '90%',
            paddingBottom: 65,
            alignSelf: 'center',
          }}>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={OK}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            // leftOpenValue={75}
            rightOpenValue={-150}
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
      {/* End Body */}
      <Toast topOffset={10} />
    </View>
  );
};

export default TourScreen;
