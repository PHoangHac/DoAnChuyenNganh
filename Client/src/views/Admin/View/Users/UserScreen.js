import React, {useContext, useEffect, useState} from 'react';
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
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {AuthContext} from '../../../../context/AuthContext';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const renderItem = data => {
  return (
    <>
      {data.item.roleName === 'User' && (
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
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: '85%',
                  width: '80%',
                  borderRadius: 8,
                }}
                source={
                  data.item.images === undefined
                    ? images.NotFoundImg
                    : {uri: `${URL}/${data.item.image}`}
                }
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
                  // backgroundColor: 'orange',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    height: '50%',
                    width: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      paddingLeft: 10,
                      fontFamily: 'Inter-Bold',
                    }}>
                    {data.item.name}
                  </Text>
                </View>
                <View
                  style={{
                    height: '50%',
                    width: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: data.item.email.length >= 23 ? 12 : 14,
                      color: 'white',
                      paddingLeft: 10,
                      fontFamily: 'Inter-Bold',
                    }}>
                    {data.item.email}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: '40%',
                  width: '100%',
                  // backgroundColor: 'yellow',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      paddingLeft: 10,
                      fontFamily: 'Inter-Bold',
                    }}>
                    {data.item.phone}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    paddingRight: 10,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      paddingLeft: 10,
                      fontFamily: 'Inter-Bold',
                      paddingRight: 10,
                      backgroundColor: 'white',
                      borderRadius: 15,
                    }}>
                    {data.item.roleName}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      )}
    </>
  );
};

const UserScreen = ({navigation}) => {
  const [DataTest, setDataTest] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const {userInfo} = useContext(AuthContext);

  // console.log(userInfo.jwtToken);
  // console.log(DataTest);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    OKK();
    wait(1500).then(() => setRefreshing(false));
  }, []);

  const OKK = () => {
    axios
      .get(`${URL}/auth`, {
        headers: {
          Authorization: `Bearer ${userInfo.jwtToken}`,
        },
      })
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
    email: item.email,
    // password: item.password,
    name: item.name,
    phone: item.phone,
    image: item.image,
    roleName: item.roleName,
    id: item.id,
  }));

  // console.log(OK);

  const closeRow = (rowMap, rowKey) => {
    // console.log(rowMap);
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const DeleteUser = async id => {
    await axios.delete(`${URL}/auth/Delete/${id}`).then(res => {
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
                navigation.navigate('UpdateUserScreen', {
                  idUser: data.item.id,
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
            <TouchableOpacity onPress={() => DeleteUser(data.item.id)}>
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
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
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
              User Manager
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

export default UserScreen;
