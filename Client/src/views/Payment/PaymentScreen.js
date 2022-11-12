// import React
import React, {useEffect, useState} from 'react';
import axios from 'axios';
//import core component
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
  Modal,
} from 'react-native';

//import icons,images
import {icons} from '../../constants/index';
import DeviceInfo from 'react-native-device-info';
import {URL} from '../../context/config';
import {useNavigationState} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {WebView} from 'react-native-webview';
import {AuthContext} from '../../context/AuthContext';

const PaymentScreen = ({navigation, route}) => {
  const {userInfo, access_TokenPaypal} = React.useContext(AuthContext);
  const [defaultPayment, setDefaultPayment] = useState(false); //Default Method
  const [choose, setChoose] = useState(false);
  const [choose2, setChoose2] = useState(false); //Online Method
  const [choose3, setChoose3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [access_Token, setAccess_Token] = useState(null);
  const [approvalUrl, setPayPalUrl] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const appName = DeviceInfo.getBrand();
  const routes = useNavigationState(state => state.routes);
  const previousRoute = routes[routes.length - 2].name;

  // console.log({
  //   access_token: access_Token,
  //   url: approvalUrl,
  //   paymentId: paymentId,
  // });

  // console.log(access_TokenPaypal);

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

  let id;
  let Price;
  //----check nameScreen props from anotherScreen--//
  if (previousRoute === 'Bookings') {
    // console.log('bookings di qua');
    const idBK = route.params.idBooking;
    const PriceBK = route.params.totalCost;
    id = idBK;
    Price = PriceBK;
  } else if (previousRoute === 'UnpaidScreen') {
    // console.log('UnpaidScreen di qua');
    const idPMS = route.params.bookingId;
    const PriceUS = route.params.totalCost;
    id = idPMS;
    Price = PriceUS;
  }
  //----check id props from anotherScreen--//
  // console.log(Price);

  const DefaultPayment = async () => {
    try {
      setTimeout(async () => {
        const res = await axios.put(`${URL}/booking/DefaultPayment/${id}`, {
          Status: 'Default',
        });
        const resBill = await axios.post(`${URL}/Bill/Create`, {
          idUser: userInfo.user.id,
          idBooking: id,
        });
        setTimeout(() => {
          navigation.navigate('BillScreen', {
            idBill: resBill.data.id,
          });
        }, 1500);
      }, 1500);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const OnlinePayment = async () => {
    setModalVisible(true);
  };

  useEffect(() => {
    const dataDetail = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'item',
                sku: 'item',
                price: Price,
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: Price,
          },
          description: 'This is the payment description.',
        },
      ],
    };

    axios
      .post(
        'https://api.sandbox.paypal.com/v1/oauth2/token',
        {grant_type: 'client_credentials'},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${access_TokenPaypal}`, // Your Authorization Value
          },
        },
      )
      .then(response => {
        // console.log(response.data.access_token);
        setAccess_Token(response.data.access_token);
        axios
          .post(
            'https://api.sandbox.paypal.com/v1/payments/payment',
            dataDetail, // you can get data details from https://developer.paypal.com/docs/api/payments/v1/
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${response.data.access_token}`,
              },
            },
          )
          .then(response => {
            const {id, links} = response.data;
            const approvalUrl = links.find(data => data.rel == 'approval_url');
            setPaymentId(id);
            setPayPalUrl(approvalUrl.href);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const ThisOnNavigationStateChange = async webViewState => {
    if (webViewState.url.includes('https://example.com/')) {
      setPayPalUrl(null);

      const {PayerID, paymentId} = webViewState.url;

      fetch(
        `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        {
          method: 'POST',
          body: {payer_id: PayerID},
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_Token}`,
          },
        },
      )
        .then(res => res.json())
        .then(response => {
          if (response.name == 'INVALID_RESOURCE_ID') {
            alert('Payment failed. Please Try Again');
            setPayPalUrl(null);
            navigation.goBack();
          }
          try {
            setTimeout(async () => {
              const res = await axios.put(
                `${URL}/booking/DefaultPayment/${id}`,
                {
                  Status: 'Default',
                },
              );
              const resBill = await axios.post(`${URL}/Bill/Create`, {
                idUser: userInfo.user.id,
                idBooking: id,
              });
              setTimeout(() => {
                navigation.navigate('BillScreen', {
                  idBill: resBill.data.id,
                });
              }, 1500);
            }, 1500);
            setLoading(true);
          } catch (error) {
            console.log(error);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: '#E2E9E8',
      }}>
      <Spinner visible={loading} />
      <Modal
        animationType="slide"
        visible={modalVisible}
        tartInLoadingState={false}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: '#F0FFFF',
            height: '100%',
            width: '100%',
          }}>
          <WebView
            onNavigationStateChange={ThisOnNavigationStateChange}
            startInLoadingState={false}
            source={{uri: approvalUrl}}
          />
        </View>
      </Modal>
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
                onPress={() => navigation.navigate('HomeTabs')}>
                <Image
                  style={{
                    height: 45,
                    width: 45,
                    tintColor: 'white',
                  }}
                  source={icons.homeicon}
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
                  // backgroundColor: 'gray',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    height: '30%',
                    width: '100%',
                    backgroundColor: '#E2E9E8',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderColor: '#0F4EA5',
                    opacity: 0.3,
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
                    source={icons.PayPalIcon}
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
              {/* END method */}
              <View
                style={{
                  height: '30%',
                  width: '95%',
                  alignItems: 'center',
                  paddingTop: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'Inter-Bold',
                  }}>
                  Attention: You can pay or not now ! Click button on top to
                  back.
                </Text>
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
            onPress={defaultPayment === true ? DefaultPayment : OnlinePayment}
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
