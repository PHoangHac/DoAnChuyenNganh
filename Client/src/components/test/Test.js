import React from 'react';

import {ScrollView, Image, Text, Dimensions, TextInput} from 'react-native';
import {images} from '../../constants/index';

const WDheight = Dimensions.get('window').height;
const WDwidth = Dimensions.get('window').width;

const Test = () => {
  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      maximumZoomScale={3}
      minimumZoomScale={0.2}>
      <Image
        style={{
          width: WDheight,
          height: (WDheight * 3840) / 5760,
          marginTop: 0,
        }}
        source={images.images1}
      />
      <Text
        style={{
          fontSize: 20,
          padding: 15,
          color: 'white',
          textAlign: 'center',
          backgroundColor: 'green',
        }}>
        This is a text
      </Text>
      <TextInput
        style={{padding: 10, margin: 10, borderWidth: 1}}
        placeholder="enter text"></TextInput>
      <Image
        style={{
          width: WDheight,
          height: (WDheight * 3840) / 5760,
          marginTop: 0,
        }}
        source={images.images1}
      />
      <Image
        style={{
          width: WDheight,
          height: (WDheight * 3840) / 5760,
          marginTop: 0,
        }}
        source={images.images1}
      />
      <Image
        style={{
          width: WDheight,
          height: (WDheight * 3840) / 5760,
          marginTop: 0,
        }}
        source={images.images1}
      />
      <Image
        style={{
          width: WDheight,
          height: (WDheight * 3840) / 5760,
          marginTop: 0,
        }}
        source={images.images1}
      />
    </ScrollView>
  );
};

export default Test;
