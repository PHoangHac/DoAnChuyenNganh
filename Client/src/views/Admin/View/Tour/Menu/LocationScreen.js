import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import {icons, images} from '../../../../../constants';
import axios from 'axios';
import {URL} from '../../../../../context/config';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-toast-message';

const NewLocationScreen = ({navigation}) => {
  const [NameCountry, setNameCountry] = useState(null);
  const [PlaceName, setPlaceName] = useState(null);
  const [Desc, setDesc] = useState(null);
  const [loading, setLoading] = useState(false);

  const CreateLocation = async () => {
    if (NameCountry === null || PlaceName === null || Desc === null) {
      Toast.show({
        type: 'error',
        text1: 'Status',
        text2: 'SOME FIELD EMPTY ! 👋',
        autoHide: true,
        visibilityTime: 1500,
      });
    } else {
      try {
        axios
          .post(`${URL}/location/Create`, {
            country: NameCountry,
            placeName: PlaceName,
            descLocation: Desc,
          })
          .then(res => {
            console.log(res.data);
            setLoading(true);
            setTimeout(() => {
              Toast.show({
                type: 'success',
                text1: 'Status',
                text2: 'CREATE SUCCESSFULLY ! 👋',
              });
            }, 2500);
          })
          .catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading === true) {
    setTimeout(() => {
      // console.log('Spinner stop running !');
      setLoading(false);
    }, 2500);
  }

  return (
    <View
      style={{
        flex: 100,
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      <Spinner visible={loading} />
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
              onPress={() => {
                navigation.goBack();
              }}
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
              Create Location
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
      <View
        style={{
          flex: 80,
          backgroundColor: 'white',
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: '100%',
            width: '100%',
          }}>
          {/* Country */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginTop: 10,
              marginBottom: 10,
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '30%',
                // backgroundColor: 'blue',
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Name Country:
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '70%',
                // backgroundColor: 'green',
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 10,
                }}
                value={NameCountry}
                onChangeText={text => setNameCountry(text)}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/* End Country */}

          {/* PlaceName */}
          <View
            style={{
              height: 100,
              width: '90%',
              //   backgroundColor: 'blue',
              marginTop: 10,
              marginBottom: 10,
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '30%',
                // backgroundColor: 'blue',
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Place Name:
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '70%',
                // backgroundColor: 'green',
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 10,
                }}
                value={PlaceName}
                onChangeText={text => setPlaceName(text)}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/* End PlaceName */}

          {/* descLocation */}
          <View
            style={{
              height: 300,
              width: '90%',
              //   backgroundColor: 'blue',
              marginTop: 10,
              marginBottom: 10,
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: '100%',
                height: '10%',
                // backgroundColor: 'blue',
                justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Description Location:
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '90%',
                // backgroundColor: 'green',
              }}>
              <TextInput
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingLeft: 10,
                  textAlignVertical: 'top',
                }}
                value={Desc}
                onChangeText={text => setDesc(text)}
                multiline={true}
                numberOfLines={5}
                maxLength={250}
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/* End descLocation */}
        </ScrollView>
      </View>

      <View
        style={{
          flex: 10,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={CreateLocation}
          style={{
            backgroundColor: 'blue',
            borderRadius: 12,
          }}>
          <Text
            style={{
              fontFamily: 'Inter-Bold',
              color: 'white',
              padding: 12,
              fontSize: 16,
            }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
      <Toast topOffset={10} />
    </View>
  );
};

export default NewLocationScreen;
