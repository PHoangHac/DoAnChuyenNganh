import React from 'react';

import {TouchableOpacity, Image, Text} from 'react-native';
import {icons, COLORS} from '../../../constants';

const UIBtn = props => {
  const {onPress, title, isSelected} = props;
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
        backgroundColor: isSelected == true ? 'white' : null,
      }}
      onPress={onPress}>
      {/* Icon vector */}
      {isSelected == true && (
        <Image
          source={icons.checkicon}
          style={{
            height: 20,
            width: 20,
            position: 'absolute',
            left: 10,
            top: 10,
          }}
        />
      )}

      <Text
        style={{
          // color: '#ED6263',
          color: isSelected == true ? '#ED6263' : COLORS.white,
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

export default UIBtn;
