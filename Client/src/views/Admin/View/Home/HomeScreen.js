import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {icons, images} from '../../../../constants/index';
import {LineChart} from 'react-native-chart-kit';
import axios from 'axios';
import {URL} from '../../../../context/config';

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/auth`).then(res => {
      setData(res.data);
    });

    axios.get(`${URL}/tour/GetAll`).then(res => {
      setData2(res.data);
    });

    axios.get(`${URL}/booking/AllWithSuccess`).then(res => {
      setData3(res.data);
    });
  }, []);

  const okk = data3.map(item => {
    return item.totalCost;
  });

  const TotalCost = okk.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  // console.log(TotalCost);

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
          marginBottom: 10,
        }}>
        {/* Container */}
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
              width: '33.3%',
              // borderWidth: 1,
              // borderColor: 'green',
              // justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('HomeTabs');
              }}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  tintColor: 'white',
                }}
                source={icons.ArrowBackIcon}
              />
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Inter-Regular',
                  fontSize: 10,
                }}>
                User Screen
              </Text>
            </TouchableOpacity>
          </View>
          {/* 2 */}
          <View
            style={{
              height: '100%',
              width: '33.3%',
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
              DashBoard
            </Text>
          </View>
          {/* 3 */}
          <View
            style={{
              height: '100%',
              width: '33.3%',
              // borderWidth: 1,
              // borderColor: 'red',
            }}>
            <View
              style={{
                height: '100%',
                width: '95%',
                justifyContent: 'center',
                alignItems: 'flex-end',
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: '100%',
            width: '100%',
          }}>
          {/* Container */}
          <View
            style={{
              height: '100%',
              width: '100%',
              backgroundColor: 'white',
            }}>
            {/* Status */}
            <View
              style={{
                height: 350,
                width: '100%',
                // backgroundColor: 'blue',
                // marginBottom: 10,
                flexDirection: 'column',
              }}>
              {/* Line 1 */}
              <View
                style={{
                  height: '50%',
                  width: '100%',
                  flexDirection: 'row',
                  // borderColor: 'white',
                  // borderWidth: 1,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '50%',
                    backgroundColor: '#8B0000',
                    borderColor: 'white',
                    borderWidth: 3,
                    borderRadius: 12,
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      height: '60%',
                      width: '100%',
                      // backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Black',
                        color: 'white',
                        fontSize: 24,
                      }}>
                      {data.length > 0 ? data.length : 'NaN'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      Users
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '40%',
                      width: '100%',
                      // backgroundColor: 'orange',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Users');
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                      }}>
                      <Text
                        style={{
                          padding: 8,
                          color: 'black',
                          fontFamily: 'Inter-ExtraBold',
                        }}>
                        Manager
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '50%',
                    backgroundColor: '#8B0000',
                    borderColor: 'white',
                    borderWidth: 3,
                    borderRadius: 12,
                  }}>
                  <View
                    style={{
                      height: '60%',
                      width: '100%',
                      // backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Black',
                        color: 'white',
                        fontSize: 24,
                      }}>
                      {data2.length > 0 ? data2.length : 'NaN'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      Tour
                    </Text>
                  </View>
                  <View
                    style={{
                      height: '40%',
                      width: '100%',
                      // backgroundColor: 'orange',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Tour');
                      }}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                      }}>
                      <Text
                        style={{
                          padding: 8,
                          color: 'black',
                          fontFamily: 'Inter-ExtraBold',
                        }}>
                        Manager
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* Line 2 */}
              <View
                style={{
                  height: '50%',
                  width: '100%',
                  flexDirection: 'row',
                  // borderColor: 'white',
                  // borderWidth: 1,
                }}>
                <View
                  style={{
                    height: '100%',
                    width: '50%',
                    backgroundColor: '#8B0000',
                    borderColor: 'white',
                    borderWidth: 3,
                    borderRadius: 12,
                  }}>
                  <View
                    style={{
                      height: '100%',
                      width: '100%',
                      // backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Black',
                        color: 'white',
                        fontSize: 24,
                      }}>
                      $ {isNaN(TotalCost) ? 'NaN' : TotalCost}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      Total Cost
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    height: '100%',
                    width: '50%',
                    backgroundColor: '#8B0000',
                    borderColor: 'white',
                    borderWidth: 3,
                    borderRadius: 12,
                  }}>
                  <View
                    style={{
                      height: '60%',
                      width: '100%',
                      // backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Inter-Black',
                        color: 'white',
                        fontSize: 24,
                      }}>
                      NaN
                    </Text>
                    {/* <Text
                      style={{
                        fontFamily: 'Inter-Bold',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      Users
                    </Text> */}
                  </View>
                  <View
                    style={{
                      height: '40%',
                      width: '100%',
                      // backgroundColor: 'orange',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                      }}>
                      <Text
                        style={{
                          padding: 8,
                          color: 'black',
                          fontFamily: 'Inter-ExtraBold',
                        }}>
                        Manager
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </View>
              </View>
            </View>
            {/* End */}

            <View
              style={{
                height: 450,
                width: '100%',
                // backgroundColor: 'blue',
                marginTop: 10,
              }}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  alignItems: 'center',
                }}>
                <LineChart
                  data={{
                    labels: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                    ],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ],
                      },
                    ],
                  }}
                  width={Dimensions.get('window').width / 1.05} // from react-native
                  height={220}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    // backgroundColor: '#e26a00',
                    // backgroundGradientFrom: '#fb8c00',
                    // backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '6',
                      strokeWidth: '2',
                      stroke: '#ffa726',
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* End Body */}
    </View>
  );
};

export default HomeScreen;
