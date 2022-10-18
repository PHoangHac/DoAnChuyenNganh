import React from 'react';

import {ScrollView, Text, View, Dimensions} from 'react-native';
import Test from './Test';

const WDheight = Dimensions.get('window').height;
const WDwidth = Dimensions.get('window').width;

const Test2 = () => {
  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      //   hien thanh o duoi
      showsVerticalScrollIndicator={true}
      // ko chay tren android
      //   scrollIndicatorInsets={{top: 10, left: 10, bottom: 10, right: 10}}
      //khi cham vuot thi se thuc thi cau lenh nay
      //   onMomentumScrollBegin={() => {
      //     alert('Begin scrolling');
      //   }}
    >
      <View
        style={{
          backgroundColor: '#5f9ea0',
          flex: 1,
          marginTop: 20,
          width: WDwidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            padding: 15,
            color: 'white',
            textAlign: 'center',
          }}>
          Screen 1
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'gray',
          flex: 1,
          marginTop: 20,
          width: WDwidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            padding: 15,
            color: 'white',
            textAlign: 'center',
          }}>
          Screen 2
        </Text>
      </View>
      <View
        style={{
          backgroundColor: 'blue',
          flex: 1,
          marginTop: 20,
          width: WDwidth,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 20,
            padding: 15,
            color: 'white',
            textAlign: 'center',
          }}>
          Screen 3
        </Text>
      </View>
    </ScrollView>
  );
};

export default Test2;
