import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {images} from '../../constants/index';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// useDispatch : GỌI HÀNH ĐỘNG
// useSelector: LẤY THÔNG TIN
import {useDispatch, useSelector} from 'react-redux';

import {updateEmail} from '../../redux/actions/updateAction';

// variable API
const CallAPI = () => {
  return new Promise((resolve, reject) => {
    // TRONG KHOẢNG 2S LẤY RA DỮU LIỆU
    setTimeout(() => {
      resolve({data: 'data'});
      console.log('Da tra ve DATA');
    }, 2000);
  });
};

const getData = async setData => {
  let data = await CallAPI();
  setData(data);
};

const ForgotPass = () => {
  const [data, setData] = useState({data: null});
  const info = useSelector(state => state.personalInfo);
  const [email, onchangeEmail] = useState('');

  const dispatch = useDispatch();
  // LIFECYCLE
  useEffect(() => {
    console.log('Sign In screen');
    // GỌI
    // getData(setData);

    console.log(info);

    // NGẮT LẮNG NGHE
    return () => {
      console.log('Sign In screen out');
    };
  }, []);

  useEffect(() => {
    // console.log('Data da lang nghe:', data);
  });

  return (
    <ImageBackground
      style={{
        height: '100%',
        width: '100%',
        flex: 100,
      }}
      resizeMode="stretch"
      source={images.backgourndSigIn2}>
      {/* title */}
      <View style={[styles.container]}>
        <TextInput placeholder="Label" style={styles.inputStyle}></TextInput>
        <TouchableOpacity>
          <Icon name="eye" style={styles.iconStyle}></Icon>
        </TouchableOpacity>
      </View>

      {/* Test */}
      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <Text>address: {info.address}</Text>
        <Text>email: {info.email}</Text>
        <Text>id: {info.id}</Text>
        <Text>score: {info.score}</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'black',
            width: '50%',
          }}
          onChangeText={onchangeEmail}
          value={email}
        />
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
          }}
          onPress={() => {
            console.log('EMAIL:' + email);
            dispatch(updateEmail(email));
          }}>
          <Text
            style={{
              padding: 10,
              color: 'white',
            }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
      {/* END Test */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#D9D5DC',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStyle: {
    color: '#000',
    paddingRight: 16,
    fontSize: 16,
    alignSelf: 'stretch',
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  iconStyle: {
    color: '#616161',
    fontSize: 24,
    paddingRight: 8,
  },
});

export default ForgotPass;
