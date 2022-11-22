import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import {icons, images} from '../../../../constants/index';
import {URL} from '../../../../context/config';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

const UpdateTourScreen = ({navigation, route}) => {
  const [NameTour, setNameTour] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [Description, setDescription] = useState('');
  const [PricePerson, setPricePerson] = useState('');
  const [abb, setAbb] = useState('');
  const [loading, setLoading] = useState(false);

  // console.log(route.params.idTour);

  const getByIdTour = useCallback(async () => {
    const getData = await axios.get(
      `${URL}/tour/GetIdTour2/${route.params.idTour}`,
    );
    setNameTour(getData.data.NameTour);
    setTotalTime(getData.data.totalTime);
    setDescription(getData.data.Description);
    setPricePerson(getData.data.PricePerson);
    setAbb(getData.data.abbreviation);
  }, []);

  const Update = async () => {
    await axios
      .post(`${URL}/tour/UpdateTour/${route.params.idTour}`, {
        NameTour: NameTour,
        abbreviation: abb,
        totalTime: totalTime,
        Description: Description,
        PricePerson: PricePerson,
      })
      .then(res => {
        // console.log(typeof res.data);
        setLoading(true);
        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Status',
            text2: 'UPDATE SUCCESSFULLY ! 👋',
          });
        }, 2500);
      })
      .catch(err => console.log(err));
  };

  if (loading === true) {
    setTimeout(() => {
      // console.log('Spinner stop running !');
      setLoading(false);
    }, 2500);
  }

  useEffect(() => {
    getByIdTour();
  }, [getByIdTour]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Status',
      text2: 'UPDATE SUCCESSFULLY ! 👋',
    });
  };
  return (
    <View
      style={{
        flex: 100,
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <Spinner visible={loading} />
      <View
        style={{
          flex: 10,
          backgroundColor: '#000080',
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
                }}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  style={{
                    height: 35,
                    width: 35,
                    tintColor: 'white',
                  }}
                  source={icons.ArrowBackIcon}
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
                Edit Tour
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
                <TouchableOpacity onPress={showToast}>
                  <Image
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    source={images.user}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* End Header */}
      </View>
      <View
        style={{
          flex: 90,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
          }}>
          <View
            style={{
              height: '15%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: '40%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'gray',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Name tour:
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                // justifyContent: 'center',
                paddingRight: 10,
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                value={NameTour}
                onChangeText={text => setNameTour(text)}
                // placeholder="here...."
                // placeholderTextColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              height: '15%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: '40%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'gray',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Abbreviation:
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                // justifyContent: 'center',
                paddingRight: 10,
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                value={abb}
                onChangeText={text => setAbb(text)}
                // placeholder="here...."
                // placeholderTextColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              height: '15%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: '40%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'gray',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                TotalTime:
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                // justifyContent: 'center',
                paddingRight: 10,
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                value={totalTime}
                onChangeText={text => setTotalTime(text)}
                // placeholder="here...."
                // placeholderTextColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              height: '15%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: '40%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'gray',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                PricePerson:
              </Text>
            </View>
            <View
              style={{
                height: '60%',
                width: '100%',
                // justifyContent: 'center',
                paddingRight: 10,
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                value={PricePerson.toString()}
                onChangeText={text => setPricePerson(text)}
                // placeholder="here...."
                // placeholderTextColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              height: '30%',
              width: '90%',
              // borderColor: 'black',
              // borderWidth: 1,
              flexDirection: 'column',
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: '10%',
                width: '100%',
                // justifyContent: 'center',
              }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Description:
              </Text>
            </View>
            <View
              style={{
                height: '90%',
                width: '100%',
                justifyContent: 'center',
                paddingRight: 10,
                // paddingBottom: 10,
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                value={Description}
                multiline={true}
                onChangeText={text => setDescription(text)}
                // placeholder="here...."
                // placeholderTextColor={'black'}
              />
            </View>
          </View>
          <View
            style={{
              height: '10%',
              width: '100%',
              // borderColor: 'black',
              // borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#00008B',
                borderRadius: 12,
              }}
              onPress={Update}>
              <Text
                style={{
                  color: 'white',
                  padding: 10,
                  fontFamily: 'Inter-Bold',
                  fontSize: 16,
                }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast topOffset={10} />
    </View>
  );
};

export default UpdateTourScreen;
