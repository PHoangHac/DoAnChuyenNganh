import React, {useState, useContext} from 'react';
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
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {URL} from '../../context/config';
import Toast from 'react-native-toast-message';

const ReviewByUserScreen = ({navigation, route}) => {
  const [textReview, setTextReview] = useState('');
  const [RatingStar, setRatingStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const {userInfo} = useContext(AuthContext);

  const ratingCompleted = rating => {
    // console.log('Rating is: ' + rating);
    setRatingStar(rating);
  };

  // console.log(userInfo.user.id);

  const Review = async () => {
    try {
      if (RatingStar === 0) {
        Toast.show({
          type: 'error',
          text1: 'Status',
          text2: 'YOU HAVE`T PICK START ! 👋',
          autoHide: true,
          visibilityTime: 1500,
        });
      } else {
        await axios
          .post(`${URL}/Review/Create`, {
            Comment: textReview,
            Rating: RatingStar,
            idUser: userInfo.user.id,
            idTourInfo: route.params.idTour,
          })
          .then(res => {
            // console.log(res.data);
            setLoading(true);
            setTimeout(() => {
              navigation.goBack();
            }, 2500);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading === true) {
    setTimeout(() => {
      console.log('Spinner stop running !');
      setLoading(false);
    }, 2500);
  }

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
      <Spinner visible={loading} />
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
                  height: 40,
                  width: 40,
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
          startingValue={0}
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
            maxLength={200}
            onChangeText={text => setTextReview(text)}
            value={textReview}
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
            onPress={Review}
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
      <Toast topOffset={10} />
    </View>
  );
};

export default ReviewByUserScreen;
