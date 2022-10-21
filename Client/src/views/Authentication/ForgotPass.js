import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import {images} from '../../constants/index';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// useDispatch : GỌI HÀNH ĐỘNG
// useSelector: LẤY THÔNG TIN

// import {updateEmail} from '../../redux/actions/updateAction';

// const URL = `http://localhost:16225/api/v1/ViewTour`;

// variable API
// const CallAPI = () => {
//   return new Promise((resolve, reject) => {
//     // TRONG KHOẢNG 2S LẤY RA DỮU LIỆU
//     setTimeout(() => {
//       resolve({data: 'data'});
//       console.log('Da tra ve DATA');
//     }, 2000);
//   });
// };

// const getData = async setData => {
//   let data = await CallAPI();
//   setData(data);
// };

const ForgotPass = ({navigation}) => {
  // const [data, setData] = useState({data: null});
  // const [email, onchangeEmail] = useState('');

  // check video 1
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // // check video 1

  // // LIFECYCLE
  // useEffect(() => {
  //   console.log('VO MAN HINH');
  //   // GỌI
  //   // getData(setData);

  //   // console.log(info);

  //   // NGẮT LẮNG NGHE
  //   return () => {
  //     console.log('THOAT KHOI MAN HINH');
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log('Data da lang nghe:', data);
  // });

  // const URL = `https://jsonplaceholder.typicode.com/users`;

  // // const test = () => {};

  // useEffect(() => {
  //   fetch(`http://localhost:9090/get-crud`, {
  //     method: 'GET',
  //   })
  //     .then(response => response.json())
  //     .then(json => setData(json))
  //     .catch(err => console.error(err))
  //     .finally(() => setLoading(false));
  // }, []);

  // const CallGETUrl = async () => {
  //   try {
  //     const url = `http://192.168.249.122:9090/get-crud`;
  //     const response = await fetch(url, {
  //       method: 'GET',
  //     })
  //       .then(response => response.json())
  //       .then(responseJson => console.log(responseJson));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(data);

  // CALL API
  // const CallGETUrl = () => {
  //   console.log('GET API RUN....');
  //   fetch(`${URL}`)
  //     .then(res => res.json())
  //     .then(async res => {
  //       console.log('RESPONE:', res);
  //     })
  //     .catch(err => console.log('ERROR:', err));
  // };

  // const CallGETUrl = () => {
  //   console.log('GET API RUN ....');
  // };

  // CALL API WITH ID
  // const CallGETUrlID = () => {
  //   console.log('GET API RUN WITH ID....');
  // };

  // // CALL API
  // const CallPOSTUrl = () => {
  //   console.log('POST API RUN....');
  // };

  // // CALL API
  // const CallQUERYUrl = () => {
  //   console.log('QUERY API RUN....');
  // };

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

      {/*  */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              padding: 10,
            }}>
            GET
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              padding: 10,
            }}>
            GET ID
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              padding: 10,
            }}>
            POST
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              padding: 10,
            }}>
            QUERY
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          backgroundColor: '#A4D5DE',
        }}>
        <View
          style={{
            // height: 300,
            // width: '100%',
            backgroundColor: '#FEDE00',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text numberOfLines={0}>Nam ho mang tinh</Text>
        </View>
      </ScrollView>
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
