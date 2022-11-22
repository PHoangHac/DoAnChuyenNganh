import React, {useContext, useState, useCallback, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {icons, images} from '../../constants/index';
import {URL} from '../../context/config';
//------AuthContext-----//
import {AuthContext} from '../../context/AuthContext';
//------AuthContext-----//
import Spinner from 'react-native-loading-spinner-overlay';

const Onboarding = ({navigation}) => {
  const [image, setImage] = useState('');
  const {isLoading, Logout, userInfo} = useContext(AuthContext);
  // console.log(image);

  const getByIdUser = useCallback(async () => {
    const getData = await axios.get(`${URL}/auth/GetOne/${userInfo.user.id}`);
    setImage(getData.data.image);
  }, [userInfo.user.id]);

  useEffect(() => {
    getByIdUser();
  }, [getByIdUser]);

  return (
    <View style={{flex: 100, backgroundColor: 'white'}}>
      <Spinner visible={isLoading} />
      {/* Header */}
      <View style={{flex: 20}}>
        {/* 50% backg */}
        <View
          style={{
            height: '50%',
            width: '100%',
            backgroundColor: '#23ABF2',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              left: 10,
            }}>
            <Image
              style={{
                height: 30,
                width: 30,
                margin: 2,
              }}
              source={icons.ArrowBackIcon}
            />
          </TouchableOpacity>
          <Image
            style={{
              top: 50,
              borderWidth: 5,
              borderColor: 'white',
              borderRadius: 55,
              height: 120,
              width: 120,
            }}
            source={{uri: `${URL}/${image}`}}
          />
          <TouchableOpacity
            style={{
              // backgroundColor: 'white',
              borderRadius: 20,
              right: 10,
            }}>
            <Image
              style={{
                height: 30,
                width: 30,
                margin: 2,
              }}
              // source={icons.bellicon}
            />
          </TouchableOpacity>
        </View>
        {/* 50% backg */}
      </View>
      {/* Header */}
      <View style={{flex: 5, top: 8}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileDetail')}
            style={{
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              width: '30%',
              height: 30,
              borderRadius: 6,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inter-Bold',
                padding: 2,
              }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Headline */}
      <View style={{flex: 15, marginBottom: 20, marginTop: 10}}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          {/* title */}
          <View
            style={{
              backgroundColor: '#D7EFFC',
            }}>
            <Text
              style={{
                fontSize: 16,
                left: 15,
              }}>
              Payment Status
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UnpaidScreen');
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                right: 15,
              }}>
              <Text
                style={{
                  left: 30,
                  fontSize: 18,
                  color: 'black',
                }}>
                Status
              </Text>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  right: 20,
                }}
                source={icons.rightarrowicon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HistoriesScreen');
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                right: 15,
              }}>
              <Text
                style={{
                  left: 30,
                  fontSize: 18,
                  color: 'black',
                }}>
                Histories Payment
              </Text>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  right: 20,
                }}
                source={icons.rightarrowicon}
              />
            </TouchableOpacity>
          </View>
          {userInfo.user.roleName === 'Admin' && (
            <View
              style={{
                marginVertical: 5,
                backgroundColor: 'gray',
                marginBottom: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AdminDashBoard');
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  right: 15,
                }}>
                <Text
                  style={{
                    left: 30,
                    fontSize: 18,
                    color: 'white',
                  }}>
                  Admin DashBoard
                </Text>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    right: 20,
                    tintColor: 'white',
                  }}
                  source={icons.rightarrowicon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {/* Content */}
      <View style={{flex: 10, marginBottom: 30}}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          {/* title */}
          <View
            style={{
              backgroundColor: '#D7EFFC',
            }}>
            <Text
              style={{
                fontSize: 16,
                left: 15,
              }}>
              Content
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

                right: 15,
              }}>
              <Text
                style={{
                  left: 30,
                  fontSize: 18,
                  color: 'black',
                }}>
                Favourite
              </Text>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  right: 20,
                }}
                source={icons.rightarrowicon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

                right: 15,
              }}>
              <Text
                style={{
                  left: 30,
                  fontSize: 18,
                  color: 'black',
                }}>
                Download
              </Text>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  right: 20,
                }}
                source={icons.rightarrowicon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Header */}
      <View style={{flex: 35}}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          {/* title */}
          <View
            style={{
              backgroundColor: '#D7EFFC',
            }}>
            <Text
              style={{
                left: 15,
                fontSize: 16,
              }}>
              Preferences
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

                right: 15,
              }}>
              <Text
                style={{
                  left: 30,
                  fontSize: 18,
                  color: 'black',
                }}>
                Language
              </Text>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  right: 20,
                }}
                source={icons.rightarrowicon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',

                right: 15,
              }}>
              <Text
                style={{
                  left: 30,
                  fontSize: 18,
                  color: 'black',
                }}>
                Darkmode
              </Text>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  right: 20,
                }}
                source={icons.rightarrowicon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                right: 15,
              }}>
              <Text
                style={{
                  left: 30,
                  fontSize: 18,
                  color: 'black',
                }}>
                Only Download
              </Text>
              <Image
                style={{
                  height: 15,
                  width: 15,
                  right: 20,
                }}
                source={icons.rightarrowicon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1925C3',
                // paddingRight: 15,
              }}
              onPress={Logout}>
              <Text
                style={{
                  // left: 30,
                  fontSize: 20,
                  color: 'white',
                  fontFamily: 'Inter-Bold',
                  // paddingRight: 15,
                  paddingLeft: 15,
                }}>
                LOGOUT
              </Text>
              <Image
                style={{
                  height: 18,
                  width: 18,
                  tintColor: 'white',
                  marginRight: 35,
                }}
                source={icons.rightarrowicon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text>Onboarding screen</Text>
    </View>
  );
};

export default Onboarding;
