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
import {icons, images} from '../../../../../constants/index';
import DocumentPicker from 'react-native-document-picker';

const NewTransPortScreen = ({navigation}) => {
  const [singleFile, setSingleFile] = useState([]);

  const OKK = singleFile[0];

  const SelectedSingleFile = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSingleFile(results);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('User cancel select file!');
      } else {
        console.log(JSON.stringify(err));
        throw err;
      }
    }
  };

  const RemoveFile = () => {
    setSingleFile([]);
  };

  return (
    <View
      style={{
        flex: 100,
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
              Create TransPort
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
                Name Type Of TransPort:
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
                placeholder="Enter here......"
                placeholderTextColor={'black'}
              />
            </View>
          </View>
          {/* End Country */}

          {/* Images */}
          <View
            style={{
              height: 400,
              width: '90%',
              //   backgroundColor: 'blue',
              alignSelf: 'center',
              flexDirection: 'column',
            }}>
            <View
              style={{
                height: '8%',
                width: '100%',
                justifyContent: 'center',
                // backgroundColor: 'blue',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Black',
                  color: 'black',
                }}>
                Images:
              </Text>
            </View>
            <View
              style={{
                height: '92%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '35%',
                  //   backgroundColor: 'blue',
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    height: '40%',
                    width: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={SelectedSingleFile}
                    style={{
                      backgroundColor: 'blue',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        padding: 8,
                      }}>
                      Choose Files
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={RemoveFile}
                    style={{
                      backgroundColor: 'blue',
                      borderRadius: 8,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        padding: 8,
                      }}>
                      Remove Files
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: '60%',
                    width: '100%',
                    // backgroundColor: 'yellow',
                  }}></View>
              </View>

              <View
                style={{
                  height: '100%',
                  width: '60%',
                  //   backgroundColor: 'blue',
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 150, width: 150, borderRadius: 12}}
                  source={singleFile.length > 0 ? OKK : images.NotFoundImg}
                />
              </View>
            </View>
          </View>
          {/* End Images */}
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
    </View>
  );
};

export default NewTransPortScreen;
