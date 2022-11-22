import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';

import {icons, images} from '../../constants/index';
import {URL} from '../../context/config';
import {places} from '../../constants/dataDummy';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Favorites = ({navigation}) => {
  const [data, setData] = useState([]);
  const {userInfo} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const AllFar = () => {
    axios
      .get(`${URL}/Favorite/GetAllByUser/${userInfo.user.id}`)
      .then(res => {
        setData(res.data);
        // console.log(res.data);
      })
      .catch(e => {
        console.log('Error ', e);
      });
  };

  const FavoriteDis = async id => {
    setTimeout(() => {
      onRefresh();
    }, 500);
    await axios
      .post(`${URL}/Favorite/DisFAR/${userInfo.user.id}/${id}`, {
        Status: 0,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    AllFar();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    AllFar();
    wait(1500).then(() => setRefreshing(false));
  }, []);

  // console.log(data);

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
  const Card = ({data}) => {
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
                  height: 120,
                  width: 180,
                  borderRadius: 10,
                }}
                source={images.NotFoundImg}
              />
              <TouchableOpacity
                onPress={() => FavoriteDis(data.TourInfo.id)}
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
                  fontSize: 14,
                  color: 'black',
                  fontFamily: 'Inter-Bold',
                }}>
                {data.TourInfo.NameTour}
                {/* {place.name} */}
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
                  fontSize: 14,
                  color: 'black',
                  fontFamily: 'Inter-ExtraBold',
                }}>
                $ {data.TourInfo.PricePerson} USD
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
          backgroundColor: '#00008B',
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
                  tintColor: 'white',
                }}
                source={icons.ArrowBackIcon}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'white',
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
                // tintColor: 'white',
                padding: 5,
                backgroundColor: 'white',
                borderRadius: 12,
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{paddingBottom: HEIGHT / 2.5}}
            data={data}
            renderItem={({item}) => <Card data={item} />}
            keyExtractor={item => item.id}
            numColumns={numColumns}
          />
        </View>
      </View>
    </View>
  );
};

export default Favorites;
