import React, {useEffect, useState, useContext} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

import {icons} from '../../constants/index';
import {URL} from '../../context/config';
import {AuthContext} from '../../context/AuthContext';
import moment from 'moment';

const UnpaidScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userInfo} = useContext(AuthContext);

  useEffect(() => {
    fetch(`${URL}/booking/GetAllBookingUser/${userInfo.user.id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.error(err))
      .finally(() => setLoading(true));
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
        {/* Scroll view */}
        <ScrollView
          style={{
            height: '100%',
            width: '100%',
            marginTop: 20,
          }}>
          {/* container */}
          <View
            style={{
              height: '100%',
              width: '100%',
              alignItems: 'center',
            }}>
            {/* Each of item */}
            {data.map((item, index) => {
              // item.Status == 1 ? console.log('true') : console.log('false');
              // console.log(item.Status);
              return (
                <View
                  style={{
                    height: 120,
                    width: '90%',
                    backgroundColor: '#F0F8FF',
                    borderRadius: 15,
                    marginBottom: 15,
                    elevation: 5,
                  }}
                  key={index}>
                  {/* Container */}
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '100%',
                      width: '100%',
                    }}>
                    {/* title */}
                    <View
                      style={{
                        height: '100%',
                        width: '65%',
                        // backgroundColor: 'red',
                        // borderWidth: 1,
                        // borderColor: 'black',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        // alignItems:"center"
                        paddingLeft: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Inter-Black',
                          fontSize: 16,
                          color: 'black',
                        }}>
                        {/* Visit 5 Days in Italy */}
                        {item.TourInfo.NameTour}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-SemiBold',
                          fontSize: 14,
                          color: 'black',
                        }}>
                        $ {item.totalCost}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Inter-Medium',
                          fontSize: 13,
                          color: 'black',
                        }}>
                        {/* 10:20 10/28/2022 */}
                        {/* {item.TourInfo.createdAt} */}
                        {moment(item.createdAt).format('LLL')}
                      </Text>
                    </View>
                    {/* btn pay or not */}
                    <View
                      style={{
                        height: '100%',
                        width: '35%',
                        // backgroundColor: 'yellow',
                        // borderWidth: 1,
                        // borderColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {item.Status == 1 ? (
                        <TouchableOpacity
                          style={{
                            // paddingRight: 12,
                            backgroundColor: '#008000',
                            borderRadius: 15,
                          }}
                          disabled={true}>
                          <Text
                            style={{
                              fontFamily: 'Inter-ExtraBold',
                              fontSize: 15,
                              padding: 10,
                              color: 'white',
                            }}>
                            Success !
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            // paddingRight: 12,
                            backgroundColor: '#C70039',
                            borderRadius: 15,
                          }}
                          onPress={() =>
                            navigation.navigate('PaymentScreen', {
                              bookingId: item.id,
                              statusPayment: item.Status,
                            })
                          }>
                          <Text
                            style={{
                              fontFamily: 'Inter-ExtraBold',
                              fontSize: 15,
                              padding: 10,
                              color: 'white',
                            }}>
                            Pay now !
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}

            {/* End */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default UnpaidScreen;
