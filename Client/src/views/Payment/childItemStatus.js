import React, {memo} from 'react';
import {View, TouchableHighlight, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

const StatusCard = ({data, navigation}) => {
  //   console.log(data);

  return (
    <TouchableHighlight
      onPress={() => console.log('You touched me')}
      style={{
        height: 120,
        width: '100%',
        backgroundColor: '#483D8B',
        borderRadius: 8,
      }}
      underlayColor={'#AEAEAE'}>
      {/* Container */}
      <View
        style={{
          height: '100%',
          width: '100%',
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: '100%',
            width: '65%',
            // backgroundColor: 'gray',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            paddingLeft: 5,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Inter-Black',
              fontSize: 16,
              color: 'white',
            }}>
            {/* Visit 5 Days in Italy */}
            {data.item.NameTour}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-SemiBold',
              fontSize: 14,
              color: 'white',
            }}>
            $ {data.item.totalCost}
          </Text>
          <Text
            style={{
              fontFamily: 'Inter-Medium',
              fontSize: 12,
              color: 'white',
            }}>
            {/* 10:20 10/28/2022 */}
            {/* {item.TourInfo.createdAt} */}
            {moment(data.item.createdAt).format('LLL')}
          </Text>
        </View>

        <View
          style={{
            height: '100%',
            width: '35%',
            // backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              // paddingRight: 12,
              backgroundColor:
                data.item.Status === 'Default' || data.item.Status === 'Default'
                  ? '#008000'
                  : '#C70039',
              borderRadius: 15,
            }}
            onPress={() =>
              navigation.navigate('PaymentScreen', {
                bookingId: data.item.id,
                statusPayment: data.item.Status,
                totalCost: data.item.totalCost,
              })
            }
            disabled={
              data.item.Status === 'Default' || data.item.Status === 'Default'
                ? true
                : false
            }>
            <Text
              style={{
                fontFamily: 'Inter-ExtraBold',
                fontSize: 15,
                padding: 10,
                color: 'white',
              }}>
              {data.item.Status === 'Default' || data.item.Status === 'Default'
                ? 'Success !'
                : 'Pay now !'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default memo(StatusCard);
