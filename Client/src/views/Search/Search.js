import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';

import {icons} from '../../constants/index';

import {places} from '../../constants/dataDummy';

import DeviceInfo from 'react-native-device-info';

import FilterSearch from './ModelFilter';

const SearchScreen = ({navigation}) => {
  const appName = DeviceInfo.getBrand();

  //-------------
  const [modalVisible, setModalVisible] = useState(false);
  //-------------

  const [dataSource] = useState([
    'apple',
    'banana',
    'cow',
    'dex',
    'zee',
    'orange',
    'air',
    'bottle',
  ]);
  const [filtered, setFiltered] = useState(dataSource);
  const [searching, setSearching] = useState(false);

  const StarIcons = [
    <Image style={{height: 12, width: 12}} source={icons.staricon} />,
    <Image style={{height: 12, width: 12}} source={icons.staricon} />,
    <Image style={{height: 12, width: 12}} source={icons.staricon} />,
    <Image style={{height: 12, width: 12}} source={icons.staricon} />,
    <Image style={{height: 12, width: 12}} source={icons.staricon} />,
  ];

  const DropsearchDown = props => {
    const {dataSource} = props;
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={{
          width: '100%',
          zIndex: 9999,
          borderBottomWidth: 2,
          borderBottomColor: 'blue',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            paddingTop: 10,
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}>
          {dataSource.length ? (
            dataSource.map((item, index) => {
              return (
                <View
                  style={{
                    // marginHorizontal: '10%',
                    backgroundColor: 'white',
                    height: 40,
                    width: '100%',
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#CCCCCC',
                  }}
                  key={index}>
                  <Text
                    style={{
                      color: 'black',
                      paddingHorizontal: 20,
                      fontSize: 20,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            })
          ) : (
            <View
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                // margin: 20,
                height: 120,
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                No search items matched
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const onSearch = text => {
    if (text) {
      setSearching(true);
      const temp = text.toLowerCase();

      const tempList = dataSource.filter(item => {
        if (item.match(temp)) return item;
      });
      setFiltered(tempList);
    } else {
      setSearching(false);
      setFiltered(dataSource);
    }
  };

  const Card = ({place}) => {
    return (
      <TouchableOpacity
        style={{
          marginVertical: 10,
        }}>
        <ImageBackground
          style={{
            height: 180,
            borderRadius: 10,
            overflow: 'hidden',
            padding: 5,
          }}
          source={place.image}>
          {/* name tour */}
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              top: 10,
              left: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                padding: 5,
                fontSize: 16,
                fontFamily: 'Inter-ExtraBold',
                color: 'black',
              }}>
              {place.name}
            </Text>
          </View>
          {/* location */}
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              top: 55,
              left: 10,
              borderRadius: 5,
              flexDirection: 'row',
            }}>
            <Image
              style={{
                height: 26,
                width: 26,
                alignSelf: 'center',
              }}
              source={icons.pinlocationicon}
            />
            <Text
              style={{
                padding: 5,
                fontSize: 14,
                fontFamily: 'Inter-Bold',
                color: 'black',
              }}>
              {place.location}
            </Text>
          </View>
          {/* star */}
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              top: 100,
              left: 10,
              borderRadius: 5,
              flexDirection: 'row',
            }}>
            {StarIcons.map((icon, index) => (
              <View
                style={{
                  padding: 4,
                }}
                key={index}>
                {icon}
              </View>
            ))}
          </View>
          {/* price */}
          <View
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 9,
              right: 10,
              borderRadius: 5,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Bold',
                fontSize: 16,
                color: '#1925C3',
                paddingLeft: 10,
              }}>
              $ {place.price}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Inter-Black',
                fontSize: 14,
                paddingRight: 10,
                color: '#551613',
              }}>
              /Person
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
      {/* header */}
      <FilterSearch
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View
        style={{
          flex: 10,
          flexDirection: 'column',
          backgroundColor: 'white',
          zIndex: 9999,
          backgroundColor: '#191970',
          top: -30,
        }}>
        {/* container */}
        <View
          style={{
            height: '100%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            // borderColor: 'blue',
            // borderBottomWidth: 0.5,
          }}>
          {/* search bar */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.searchicon}
              style={{
                position: 'absolute',
                height: 30,
                width: 30,
                zIndex: 9999,
                left: 40,
              }}
            />
            <TextInput
              onChangeText={onSearch}
              placeholder="Search..."
              placeholderTextColor={appName == 'Redmi' ? '#343434' : '#7E6FAA'}
              style={{
                backgroundColor: 'white',
                height: '70%',
                width: '85%',
                borderRadius: 20,
                paddingLeft: 50,
                fontSize: 16,
                borderWidth: 1,

                // borderColor: '#FEDE00',
              }}
            />
          </View>
          {/* filter */}
          <View>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                source={icons.filtercon}
                style={{
                  height: 30,
                  width: 30,
                  marginRight: 30,
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* popup */}
        <View
          style={{
            position: 'absolute',
            height: 500,
            width: '100%',
            top: 78,
            zIndex: 999999,
          }}>
          {searching && (
            <DropsearchDown
              onPress={() => setSearching(false)}
              dataSource={filtered}
            />
          )}
        </View>
      </View>
      {/* show all */}
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
          // alignItems: 'center',
          // marginVertical: 10,
          marginTop: -10,
          marginLeft: 10,
          marginVertical: 10,
        }}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: 90,
            backgroundColor: 'blue',
            borderRadius: 5,

            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Inter-Bold',
              color: 'white',
              alignSelf: 'center',
            }}>
            Show all
          </Text>
        </TouchableOpacity>
      </View>
      {/* List tour */}
      <View style={{flex: 85}}>
        <View>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingBottom: 90,
            }}
            data={places}
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={places.length - 1}
            renderItem={({item}) => <Card place={item} />}
            horizontal={false}
          />
        </View>
      </View>
      {/* result */}
    </View>
  );
};

export default SearchScreen;
