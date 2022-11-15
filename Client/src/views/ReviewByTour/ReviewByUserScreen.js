import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {icons} from '../../constants/index';
import {Rating, AirbnbRating} from 'react-native-ratings';

const ReviewByUserScreen = ({navigation}) => {
  const [textReview, setTextReview] = useState('');
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
  };

  //   console.log(textReview.length);

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
              width: '30%',
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
              width: '70%',
              justifyContent: 'center',
              //   alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Inter-Bold',
                fontSize: 18,
              }}>
              Write Your Review
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 15,
          width: '90%',
          //   borderWidth: 2,
          //   borderColor: '#B0C4DE',
          borderBottomColor: '#B0C4DE',
          borderBottomWidth: 2,
        }}>
        <Rating
          showRating={true}
          fractions={2}
          ratingTextColor="teal"
          style={{
            height: '100%',
            width: '100%',
          }}
          // eslint-disable-next-line no-console
          //   onStartRating={() => console.log('started rating')}
          onFinishRating={ratingCompleted}
        />
      </View>

      <View
        style={{
          flex: 5,
          width: '100%',
          //   borderWidth: 2,
          //   borderColor: '#B0C4DE',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '100%',
            width: '90%',
            // backgroundColor: 'gray',
            justifyContent: 'center',
            borderBottomColor: '#B0C4DE',
            borderBottomWidth: 2,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'Inter-Bold',
              fontSize: 16,
            }}>
            Your Review
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 50,
          width: '90%',
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            // backgroundColor: 'orange',
          }}>
          <TextInput
            multiline={true}
            numberOfLines={10}
            onChangeText={text => setTextReview(text)}
            value={textReview}
            maxLength={200}
            style={{
              height: 200,
              textAlignVertical: 'top',
              //   borderWidth: 1,
              //   borderColor: 'black',
            }}
            placeholder="Write here....."
          />
        </View>
      </View>

      <View
        style={{
          flex: 10,
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0000CD',
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: 'white',
                padding: 10,
                fontSize: 16,
                fontFamily: 'Inter-Bold',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReviewByUserScreen;
