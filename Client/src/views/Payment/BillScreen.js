// import React
import React, {useState, useEffect} from 'react';

// import core component
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';

//import icons
import {icons} from '../../constants/index';

import {URL} from '../../context/config';

import axios from 'axios';

const HEIGHTDEVICE = Dimensions.get('window').height;
const WidthDevice = Dimensions.get('window').width;

const BillScreen = ({navigation, route}) => {
  const [data, setData] = useState([]);
  setTimeout(() => {
    navigation.navigate('HomeTabs');
  }, 10000);

  //-------GET ID WITH ROUTE.PARAMS-----///
  const idParams = route.params.data;
  console.log('ID Bill: ' + idParams.id);
  //-------GET ID WITH ROUTE.PARAMS-----///

  //-----CREATE VARIABLE----//
  let User, Booking, DatePayment, TimePayment, Code;
  //-----CREATE VARIABLE----//

  //-----CHECK DATA EMPTY----//
  if (data.length === 0) {
    console.log('Data empty');
  } else {
    const hello = Object.keys(data).map(k => data[k]);
    Code = hello[0];
    TimePayment = hello[2];
    DatePayment = hello[1];
    User = hello[5];
    Booking = hello[6];
    // console.log(Booking.TourInfo.Location.country);
  }
  //-----CHECK DATA EMPTY----//

  useEffect(() => {
    axios
      .get(`${URL}/Bill/GetOneBill/${idParams.id}`)
      .then(res => {
        // console.log(res);
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [idParams.id]);

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: '#0E6AF6',
        alignItems: 'center',
      }}>
      {/* Header */}
      <View
        style={{
          flex: 10,
          //   borderWidth: 1,
          //   borderColor: 'black',
          justifyContent: 'center',
        }}>
        {/* Container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'center',
            // backgroundColor: 'gray',
            height: '100%',
            width: '100%',
          }}>
          {/* Text */}
          <View
            style={{
              justifyContent: 'center',
              //   backgroundColor: 'blue',
              width: '80%',
              height: '100%',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Inter-Bold',
                color: '#fff',
                paddingLeft: 100,
              }}>
              Result Payment
            </Text>
          </View>
          {/* Icons */}
          <View
            style={{
              justifyContent: 'center',
              width: '20%',
              height: '100%',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  alignSelf: 'flex-end',
                  marginRight: 20,
                  tintColor: 'white',
                }}
                source={icons.homeicon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* END Header */}
      {/* Success icon */}
      <View
        style={{
          flex: 10,
          //   borderWidth: 1,
          //   borderColor: 'black',
          alignItems: 'center',
          zIndex: 99,
        }}>
        {/* container */}
        <View
          style={{
            // borderWidth: 1,
            backgroundColor: 'white',
            borderColor: '#fff',
            elevation: 3,
            borderRadius: 50,
          }}>
          <Image
            style={{
              height: 80,
              width: 80,
              margin: 10,
            }}
            source={icons.check1icon}
          />
        </View>
      </View>
      {/* Content */}
      {/* Page1 */}
      <View
        style={{
          flex: 12,
          //   borderWidth: 1,
          //   borderColor: 'black',
          //   alignItems: 'center',
          backgroundColor: '#fff',
          width: WidthDevice / 1.115,
          justifyContent: 'center',
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
          borderRadius: 15,
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            // borderWidth: 1,
            // borderColor: 'black',
            height: '80%',
            justifyContent: 'space-evenly',
          }}>
          <View
            style={
              {
                //   backgroundColor: 'yellow',
              }
            }>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
                color: 'black',
              }}>
              Payment Success
            </Text>
          </View>
          <View
            style={
              {
                //   backgroundColor: 'yellow',
              }
            }>
            {data.length === 0 ? (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-ExtraBold',
                  color: 'black',
                }}>
                NaN $
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Inter-ExtraBold',
                  color: 'black',
                }}>
                {Booking.totalCost} $
              </Text>
            )}
          </View>
        </View>
      </View>
      {/* END Page1 */}
      {/* Line Dash */}
      <View
        style={{
          flex: 0.02,
          //   borderWidth: 1,
          //   borderColor: 'black',
          //   backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          width: WidthDevice / 1.115,
          zIndex: 99,
        }}>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 1.5,
            // borderRadius: 1,
            color: 'black',
            width: '90%',
            height: '100%',
            marginTop: 1,
          }}></View>
      </View>
      <View
        style={{
          flex: 60,
          //   borderWidth: 1,
          //   borderColor: 'black',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          backgroundColor: '#fff',
          //   height: HEIGHTDEVICE / 10,
          width: WidthDevice / 1.115,
          borderRadius: 15,
          borderTopStartRadius: 15,
          borderTopRightRadius: 15,
        }}>
        {/* Container */}
        <View
          style={{
            height: '100%',
            width: '100%',
          }}>
          {/* Line 1 */}
          <View
            style={{
              height: '20%',
              width: '100%',
              //   borderWidth: 1,
              //   borderColor: 'black',
              paddingTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
                height: '100%',
                width: '100%',
              }}>
              {/* Line 1 -1  */}
              <View
                style={{
                  height: '40%',
                  width: '100%',
                  //   backgroundColor: 'blue',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Inter-Bold',
                    color: '#838383',
                  }}>
                  Time for Payment
                </Text>
                {data.length === 0 ? (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Inter-light',
                      color: 'black',
                    }}>
                    NaN
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Inter-light',
                      color: 'black',
                    }}>
                    {TimePayment} - {DatePayment}
                  </Text>
                )}
              </View>
              {/* Line 1 -2  */}
              <View
                style={{
                  height: '40%',
                  width: '100%',
                  //   backgroundColor: 'green',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Inter-Bold',
                    color: '#838383',
                  }}>
                  Code
                </Text>
                {data.length === 0 ? (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Inter-light',
                      color: '#7F0F77',
                    }}>
                    NaN
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Inter-light',
                      color: '#7F0F77',
                    }}>
                    {Code}
                  </Text>
                )}
              </View>
            </View>
          </View>
          {/* Line 2 */}
          <View
            style={{
              height: '80%',
              width: '100%',
              //   borderWidth: 1,
              //   borderColor: 'black',
              flexDirection: 'column',
            }}>
            {/* Line 2 -1 */}
            <View
              style={{
                height: '10%',
                width: '100%',
                // backgroundColor: 'gray',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Inter-Bold',
                  color: 'black',
                  paddingLeft: 10,
                }}>
                Receipt
              </Text>
            </View>
            {/* Line 2 -2 */}
            <View
              style={{
                height: '30%',
                width: '100%',
                // backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* container */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  width: '95%',
                  height: '90%',
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '50%',
                    // backgroundColor: 'blue',
                    justifyContent: 'center',
                    paddingLeft: 10,
                  }}>
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                    }}
                    source={icons.moneyicon}
                  />
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '50%',
                    // backgroundColor: 'red',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingRight: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Inter-Medium',
                      color: '#7F0F77',
                    }}>
                    Total Money
                  </Text>
                  {data.length === 0 ? (
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Inter-ExtraBold',
                        color: 'black',
                      }}>
                      NaN $
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'Inter-ExtraBold',
                        color: 'black',
                      }}>
                      {Booking.totalCost} $
                    </Text>
                  )}
                </View>
              </View>
            </View>
            {/* Line 2 -3 */}
            <View
              style={{
                height: '60%',
                width: '100%',
                // backgroundColor: 'green',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* container */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  width: '95%',
                  height: '90%',
                  borderRadius: 10,
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}>
                {/* line 1 */}
                <View
                  style={{
                    flexDirection: 'row',
                    // borderWidth: 1,
                    // borderColor: 'red',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#838383',
                      fontFamily: 'Inter-Bold',
                    }}>
                    User
                  </Text>
                  {data.length === 0 ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      NaN
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      {User.name}
                    </Text>
                  )}
                </View>
                {/* line 2 */}
                <View
                  style={{
                    flexDirection: 'row',
                    // borderWidth: 1,
                    // borderColor: 'red',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#838383',
                      fontFamily: 'Inter-Bold',
                    }}>
                    Phone
                  </Text>
                  {data.length === 0 ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      NaN
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      {User.phone}
                    </Text>
                  )}
                </View>
                {/* line 3 */}
                <View
                  style={{
                    flexDirection: 'row',
                    // borderWidth: 1,
                    // borderColor: 'red',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#838383',
                      fontFamily: 'Inter-Bold',
                    }}>
                    Location
                  </Text>
                  {data.length === 0 ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      NaN
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      {Booking.TourInfo.Location.placeName},{' '}
                      {Booking.TourInfo.Location.country}
                    </Text>
                  )}
                </View>
                {/* line 4 */}
                <View
                  style={{
                    flexDirection: 'row',
                    // borderWidth: 1,
                    // borderColor: 'red',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#838383',
                      fontFamily: 'Inter-Bold',
                    }}>
                    Tour Name
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'black',
                      fontFamily: 'Inter-SemiBold',
                    }}>
                    Visit 3 days BangKok
                  </Text>
                  {/* Nếu mà nhiều ký tự hơn thì check điều kiện cho kích thước chữ nhỏ */}
                </View>
                {/* line 5 */}
                <View
                  style={{
                    flexDirection: 'row',
                    // borderWidth: 1,
                    // borderColor: 'red',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#838383',
                      fontFamily: 'Inter-Bold',
                    }}>
                    Total guest
                  </Text>
                  {data.length === 0 ? (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      NaN
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Inter-SemiBold',
                      }}>
                      {Booking.totalGuest}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
          {/* Line 3
          <View
            style={{
              height: '30%',
              width: '100%',
              backgroundColor: 'green',
            }}></View> */}
        </View>
      </View>

      <View
        style={{
          flex: 8,
          //   borderWidth: 1,
          //   borderColor: 'black',
          //   justifyContent: 'center',
          //   alignItems: 'center',
          //   backgroundColor: '#fff',
          width: WidthDevice / 1.115,
        }}></View>
      {/* END Content */}
    </View>
  );
};

export default BillScreen;
