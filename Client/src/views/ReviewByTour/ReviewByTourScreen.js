import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {icons, images} from '../../constants/index';
import {Review} from '../../constants/dataDummy';

const Item = ({data}) => {
  // const pic = JSON.parse(data.images);

  // console.log(data.NameTour.length);

  // // 275
  // const check =
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit';
  // // 200
  // const check2 =
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque';
  // // 150
  // const check3 =
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium';
  // //100
  // const check4 =
  //   'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';
  // //50
  // const check5 = 'Lorem ipsum dolor sit amet, consectetur adipiscing';

  // console.log(check5.length);
  // if(data.descripton.length )
  // console.log(data.descripton);

  return (
    <View
      style={{
        height: 220,
        width: '95%',
        alignSelf: 'center',
        borderBottomColor: '#B0C4DE',
        borderBottomWidth: 0.5,
        // marginVertical: 10,
        // backgroundColor: 'blue',
        // marginTop: 10,
      }}>
      {/* Container */}
      <View
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'column',
        }}>
        {/* header */}
        <View
          style={{
            height: '30%',
            width: '100%',
            // borderWidth: 1,
            // borderColor: 'black',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: '100%',
              width: '70%',
              flexDirection: 'row',
              // backgroundColor: 'gray',
            }}>
            <View
              style={{
                height: '100%',
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 55,
                  width: 55,
                }}
                source={images.user}
              />
            </View>
            <View
              style={{
                height: '100%',
                width: '70%',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-Medium',
                  color: 'black',
                  fontSize: 14,
                }}>
                User name
              </Text>
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  color: 'black',
                  fontSize: 12,
                }}>
                A hour ago
              </Text>
            </View>
          </View>
          <View
            style={{
              height: '100%',
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'black',
                flexDirection: 'row',
                borderRadius: 8,
                padding: 4,
              }}>
              <Text
                style={{
                  color: 'white',
                  paddingRight: 10,
                  paddingLeft: 10,
                  fontSize: 14,
                }}>
                4.0
              </Text>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  tintColor: 'white',
                  marginRight: 5,
                  alignSelf: 'center',
                }}
                source={icons.Start2Icon}
              />
            </View>
          </View>
        </View>
        {/* body */}
        {/* 120 - 200 , 100 - 150, 80 - 100*/}
        <View
          style={{
            height:
              data.descripton.length == 200
                ? 120
                : data.descripton.length <= 100
                ? 80
                : data.descripton.length <= 150
                ? 100
                : 120,
            width: '100%',
            // borderWidth: 1,
            // borderColor: 'black',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '100%',
              width: '95%',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Light',
                color: 'black',
                fontSize: 13,
                lineHeight: 18,
              }}>
              {data.descripton}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ReviewByTourScreen = ({navigation}) => {
  const renderItem = ({item}) => <Item navigation={navigation} data={item} />;
  return (
    <View
      style={{
        flex: 100,
      }}>
      <View
        style={{
          flex: 10,
          //   backgroundColor: 'blue',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#00008B',
          }}>
          <View
            style={{
              height: '100%',
              width: '20%',
              //   backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
              }}>
              <Image
                style={{
                  height: 45,
                  width: 45,
                }}
                source={icons.ArrowBackIcon}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '100%',
              width: '80%',
              justifyContent: 'center',
              paddingLeft: 40,
              //   alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inter-Bold',
                fontSize: 18,
              }}>
              Guest Review
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 12,
          width: '100%',
          //   borderWidth: 2,
          //   borderColor: '#B0C4DE',
          borderBottomColor: '#B0C4DE',
          borderBottomWidth: 3,
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
          }}>
          <View
            style={{
              height: '50%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                color: 'black',
                fontSize: 16,
              }}>
              4.5/5 - Good
            </Text>
          </View>
          <View
            style={{
              height: '50%',
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                color: 'black',
                fontSize: 12,
              }}>
              Total 2000 Reviews
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 93,
          // backgroundColor: 'orange',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
          }}>
          <FlatList
            // style={{
            //   height: '100%',
            //   width: '100%',
            // }}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            // contentContainerStyle={{paddingBottom: 60}}
            data={Review}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewByTourScreen;
