import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

import {icons} from '../../constants/index';

import {places} from '../../constants/dataDummy';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const Favories = ({navigation}) => {
  // khoi tao state

  // Khoi tao du lieu gia
  // const data = [
  //   {id: 'a', value: 'A'},
  //   {id: 'b', value: 'B'},
  //   {id: 'c', value: 'C'},
  //   {id: 'd', value: 'D'},
  //   {id: 'e', value: 'E'},
  //   {id: 'f', value: 'F'},
  // ];

  const StarIcons = [
    <Image style={{height: 14, width: 14}} source={icons.staricon} />,
    <Image style={{height: 14, width: 14}} source={icons.staricon} />,
    <Image style={{height: 14, width: 14}} source={icons.staricon} />,
    <Image style={{height: 14, width: 14}} source={icons.staricon} />,
    <Image style={{height: 14, width: 14}} source={icons.staricon} />,
  ];

  // So luong columns hien thi
  const numColumns = 2;

  // Component
  const Card = ({place}) => {
    return (
      <TouchableOpacity
        style={{
          height: '100%',
          width: WIDTH / numColumns,
        }}
        // onPress={() => console.log('item')}
      >
        {/* Container */}
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'gray',
            alignItems: 'center',
            marginTop: 20,
          }}>
          {/* Iteam container */}
          <View>
            {/* picture */}
            <View>
              <Image
                style={{
                  height: 130,
                  width: 190,
                  borderRadius: 10,
                }}
                source={place.image}
              />
              <TouchableOpacity
                // onPress={() => console.log('favouries')}
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  borderColor: 'white',
                  borderWidth: 3,
                  borderRadius: 20,
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                  }}
                  source={icons.favourite2icon}
                />
              </TouchableOpacity>
            </View>
            {/* title */}
            <View
              style={{
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Inter-Bold',
                }}>
                {place.name}
              </Text>
            </View>
            {/* Star */}
            <View
              style={{
                color: 'black',
                flexDirection: 'row',
                alignSelf: 'flex-start',
                marginBottom: 5,
              }}>
              {StarIcons.map((icon, index) => (
                <View style={{marginVertical: 5}} key={index}>
                  {icon}
                </View>
              ))}
              <Text
                style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  fontFamily: 'Inter-Medium',
                  color: '#551613',
                }}>
                (100)
              </Text>
            </View>
            {/* show price tour */}
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontFamily: 'Inter-ExtraBold',
                }}>
                $ {place.price} USD
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 100, backgroundColor: 'white'}}>
      {/* Header */}
      <View
        style={{
          flex: 10,
        }}>
        {/* Container */}
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* Left Container */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 15,
              }}
              onPress={() => navigation.goBack()}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  borderWidth: 1,
                  borderColor: '#838383',
                  borderRadius: 10,
                }}
                source={icons.ArrowBackIcon}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Favourites
            </Text>
          </View>
          {/* Right Container */}
          <View>
            <Image
              style={{
                height: 40,
                width: 40,
                marginRight: 15,
              }}
              source={icons.cartTouricon}
            />
          </View>
        </View>
      </View>
      {/* Tours */}
      <View
        style={{
          flex: 90,
        }}>
        <View>
          <FlatList
            contentContainerStyle={{paddingBottom: HEIGHT / 2.5}}
            data={places}
            renderItem={({item}) => <Card place={item} />}
            keyExtractor={item => item.id}
            numColumns={numColumns}
          />
        </View>
      </View>
    </View>
  );
};

export default Favories;
