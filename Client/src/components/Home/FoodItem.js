import React from 'react';
import {View, Text, Image} from 'react-native';
import {icons} from '../../constants';

const FoodItems = props => {
  const {food} = props; // destructuring an object
  //   console.log(food.name);
  debugger;
  return (
    <View
      style={{
        height: 150,
        // backgroundColor: 'red',
        paddingTop: 20,
        paddingStart: 10,
        flexDirection: 'row',
      }}>
      <Image
        //   source={{uri: 'https://reactjs.org/logo-og.png'}}
        source={food.url}
        style={{
          width: 100,
          height: 100,
          resizeMode: 'cover',
          borderRadius: 10,
          marginRight: 15,
        }}
      />
      <View
        style={{
          // backgroundColor: 'green',
          flex: 1,
          marginRight: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          {food.name}
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: 'black',
          }}></View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
            }}>
            Status:
          </Text>
          <Text
            style={{
              color: 'rgb(221, 80, 54)',
              fontSize: 16,
            }}>
            {food.status}
          </Text>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
          }}>
          Price: {food.price}
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
          }}>
          Food type: Pizza
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
          }}>
          Website: {food.website}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image style={{height: 18, width: 18}} source={icons.facebookIcon2} />
          <Image style={{height: 18, width: 18}} source={icons.twitterIcon2} />
          <Image style={{height: 18, width: 18}} source={icons.instagramicon} />
        </View>
      </View>
    </View>
  );
};

export default FoodItems;
