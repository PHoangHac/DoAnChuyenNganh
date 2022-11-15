import React, {useEffect, useState, useContext, useCallback} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
} from 'react-native';

import {icons, images} from '../../constants/index';
import {URL} from '../../context/config';
import {AuthContext} from '../../context/AuthContext';
// import moment from 'moment';
import {SwipeListView} from 'react-native-swipe-list-view';
import axios from 'axios';
import StatusCard from './childItemStatus';
import Toast from 'react-native-toast-message';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const UnpaidScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userInfo} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    OKK();
    wait(1500).then(() => setRefreshing(false));
  }, []);

  const OKK = () => {
    axios
      .get(`${URL}/booking/GetAllBookingUser/${userInfo.user.id}`)
      .then(res => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch(e => {
        console.log('Error ', e);
      });
  };

  const OK = data.map((item, index) => ({
    key: `${index}`,
    NameTour: item.TourInfo.NameTour,
    totalCost: item.totalCost,
    createdAt: item.createdAt,
    Status: item.Status,
    id: item.id,
  }));

  useEffect(() => {
    OKK();
    const focusHandler = navigation.addListener('focus', () => {
      OKK();
    });
    return focusHandler;
  }, [navigation]);

  const closeRow = (rowMap, rowKey) => {
    // console.log(rowMap);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderItem = data => <StatusCard data={data} navigation={navigation} />;

  const DeleteTour = async id => {
    await axios
      .delete(`${URL}/booking/DeleteByUser/${id}/${userInfo.user.id}`)
      .then(res => {
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
              width:
                data.item.Status === 'Default' || data.item.Status === 'Online'
                  ? '50%'
                  : '33.3%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => closeRow(rowMap, data.item.key)}>
              <Image
                style={{
                  height:
                    data.item.Status === 'Default' ||
                    data.item.Status === 'Online'
                      ? 48.5
                      : 39.3,
                  width:
                    data.item.Status === 'Default' ||
                    data.item.Status === 'Online'
                      ? '65.5%'
                      : '80%',
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
              width: data.item.Status === 'Default' ? '50%' : '33.3%',
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <Image
                style={{
                  height:
                    data.item.Status === 'Default' ||
                    data.item.Status === 'Online'
                      ? 48.5
                      : 39.3,
                  width:
                    data.item.Status === 'Default' ||
                    data.item.Status === 'Online'
                      ? '65.5%'
                      : '80%',
                  alignSelf: 'center',
                }}
                source={icons.EditIcon}
              />
            </TouchableOpacity>
          </View>
          {data.item.Status === 'Default' || data.item.Status === 'Online' ? (
            <View></View>
          ) : (
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
          )}
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
          backgroundColor: '#0096FF',
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
                  height: 50,
                  width: 50,
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
              Status your booking
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
      <Toast topOffset={10} />
    </View>
  );
};

export default UnpaidScreen;
