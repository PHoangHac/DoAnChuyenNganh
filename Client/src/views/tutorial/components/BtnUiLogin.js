import React from 'react';

import {TouchableOpacity, Image, Text} from 'react-native';
import {icons} from '../../../constants';

import {useNavigation, NavigationContainer} from '@react-navigation/native';

const UIBtnLogin = props => {
  const {onPress, title, screenName} = props;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: 'white',
        height: 40,
        borderRadius: 5,
        // width: '80%',
        marginHorizontal: 20,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: null,
      }}
      onPress={() => navigation.navigate(screenName)}>
      {/* Icon vector */}
      <Text
        style={{
          // color: '#ED6263',
          color: 'white',
          fontWeight: 'bold',
          // elevation: 5,
          textShadowColor: 'rgba(29, 34, 43, 1)',
          shadowOffset: {height: 1, width: -1},
          shadowRadius: 10,
        }}>
        {title}
        {/* Influencer */}
      </Text>
    </TouchableOpacity>
  );
};

export default UIBtnLogin;
