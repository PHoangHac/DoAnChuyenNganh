// import React
import React, {useState} from 'react';

//import core component
import {View, Text, Image, TouchableOpacity} from 'react-native';

//import icons,images
import {icons} from '../../constants/index';

import DeviceInfo from 'react-native-device-info';

const PaymentScreen = ({navigation}) => {
  const [defaultPayment, setDefaultPayment] = useState(false);
  const [choose, setChoose] = useState(false);
  const [choose2, setChoose2] = useState(false);
  const [choose3, setChoose3] = useState(false);

  const HasChooseDP = () => {
    setDefaultPayment(true);
    setChoose(false);
    setChoose2(false);
    setChoose3(false);
  };

  const HasChoose = () => {
    setDefaultPayment(false);
    setChoose(true);
    setChoose2(false);
    setChoose3(false);
  };

  const HasChoose2 = () => {
    setDefaultPayment(false);
    setChoose(false);
    setChoose2(true);
    setChoose3(false);
  };

  const HasChoose3 = () => {
    setDefaultPayment(false);
    setChoose(false);
    setChoose2(false);
    setChoose3(true);
  };

  const appName = DeviceInfo.getBrand();

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: '#E2E9E8',
      }}>
      {/* Header */}
      <View
        style={{
          flex: 25,
          //   borderWidth: 1,
          //   borderColor: 'black',
          backgroundColor: '#0000FF',
          borderBottomEndRadius: 80,
          borderBottomLeftRadius: 80,
        }}>
        {/* Container */}
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
          }}>
          {/* title */}
          <View
            style={{
              height: '40%',
              width: '100%',
              //   borderWidth: 1,
              //   borderColor: 'red',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingTop: 20,
            }}>
            {/* icon back */}
            <View
              style={{
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 12,
                }}
                onPress={() => navigation.goBack()}>
                <Image
                  style={{
                    height: 45,
                    width: 45,
                    tintColor: 'white',
                  }}
                  source={icons.ArrowBackIcon}
                />
              </TouchableOpacity>
            </View>
            {/* title */}
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Bold',
                  fontSize: 24,
                  color: '#ffffff',
                }}>
                Payment Method
              </Text>
            </View>
          </View>
          {/* default method */}
          <View
            style={{
              height: '60%',
              width: '100%',
              //   borderWidth: 1,
              //   borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* container */}
            <TouchableOpacity
              style={{
                height: '80%',
                width: '90%',
                backgroundColor: '#ffffff',
                marginTop: 50,
                flexDirection: 'row',
                borderRadius: 10,
                elevation: 5,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                // borderColor: '#006400',
                // borderWidth: 3,
                borderColor: '#7CFC00',
                borderWidth: defaultPayment == true ? 2 : null,
              }}
              onPress={HasChooseDP}>
              {/* icons */}
              <View>
                <Image
                  style={{
                    height: 80,
                    width: 80,
                  }}
                  source={icons.moneyicon}
                />
              </View>
              {/* title */}
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Inter-Bold',
                    color: 'black',
                  }}>
                  Cash
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#2B3E6D',
                    fontFamily: 'Inter-Medium',
                  }}>
                  Default Payment Method
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* END Header */}
      {/* CONTENT */}
      <View
        style={{
          flex: 65,
          //   borderWidth: 1,
          //   borderColor: 'black',
          marginTop: 30,
        }}>
        {/* Container */}
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* semi container */}
          <View
            style={{
              //   borderWidth: 1,
              //   borderColor: 'red',
              width: '90%',
              height: '90%',
              top: -28,
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* content */}
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'blue',
                height: '95%',
                width: '95%',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              {/* title */}
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontFamily: 'Inter-Bold',
                  alignSelf: 'flex-start',
                  marginLeft: 10,
                  marginBottom: 10,
                }}>
                CREDIT CARD
              </Text>
              {/* Method */}
              <View
                style={{
                  height: '50%',
                  width: '95%',
                  flexDirection: 'column',
                  //   backgroundColor: 'gray',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={{
                    height: '30%',
                    width: '100%',
                    backgroundColor: '#E2E9E8',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderColor: '#0F4EA5',
                    // borderWidth: choose == true ? 2 : null,
                  }}
                  onPress={HasChoose}>
                  <Image
                    style={{
                      height: 45,
                      width: 45,
                      marginLeft: 10,
                    }}
                    source={icons.momoicon}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Inter-SemiBold',
                      paddingRight:
                        choose == true
                          ? appName == 'Redmi'
                            ? 90
                            : 110
                          : appName == 'Redmi'
                          ? 140
                          : 160,
                    }}>
                    ******3818
                  </Text>
                  {choose == true && (
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                      }}
                      source={icons.check1icon}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: '30%',
                    width: '100%',
                    backgroundColor: '#E2E9E8',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderColor: '#0F4EA5',
                    // borderWidth: 2,
                  }}
                  onPress={HasChoose2}>
                  <Image
                    style={{
                      height: 45,
                      width: 45,
                      marginLeft: 10,
                    }}
                    source={icons.visaicon}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Inter-SemiBold',
                      paddingRight:
                        choose2 == true
                          ? appName == 'Redmi'
                            ? 5
                            : 40
                          : appName == 'Redmi'
                          ? 55
                          : 95,
                    }}>
                    **** **** **** 9999
                  </Text>
                  {choose2 == true && (
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                      }}
                      source={icons.check1icon}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    height: '30%',
                    width: '100%',
                    backgroundColor: '#E2E9E8',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderColor: '#0F4EA5',
                    // borderWidth: 2,
                  }}
                  onPress={HasChoose3}>
                  <Image
                    style={{
                      height: 45,
                      width: 45,
                      marginLeft: 10,
                    }}
                    source={icons.creditcardicon}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                      fontFamily: 'Inter-SemiBold',
                      paddingRight:
                        choose3 == true
                          ? appName == 'Redmi'
                            ? 5
                            : 40
                          : appName == 'Redmi'
                          ? 55
                          : 95,
                    }}>
                    **** **** **** 9999
                  </Text>
                  {choose3 == true && (
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        marginRight: 10,
                      }}
                      source={icons.check1icon}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* END CONTENT */}

      {/* btn done */}
      <View
        style={{
          flex: 10,
          // borderWidth: 1,
          // borderColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('BillScreen')}
            style={{
              backgroundColor:
                (defaultPayment || choose || choose2 || choose3) == true
                  ? '#0000FF'
                  : '#C1C1C1',
              borderRadius: 12,
              width: '90%',
              height: '100%',
              // opacity:
              //   (defaultPayment || choose || choose2 || choose3) == true
              //     ? 1
              //     : 0.5,
            }}
            disabled={
              (defaultPayment || choose || choose2 || choose3) == true
                ? false
                : true
            }>
            <Text
              style={{
                color: '#fff',
                padding: 16,
                fontSize: 24,
                alignSelf: 'center',
                fontFamily: 'Inter-ExtraBold',
                height: '100%',
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* END btn done */}
    </View>
  );
};

export default PaymentScreen;
