import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Button,
} from 'react-native';

import {icons} from '../../constants/index';

const CheckImage = () => {
  // const [Pic, setPic] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // const URL = `http://192.168.1.13:9090/get-crud`;

  const URLS = `http://192.168.1.13:9090/getAllSpeciatly`;

  const URLIMG = `http://192.168.1.13:9090`;

  // const GetAPIURL = () => {
  //   console.log('GET API RUN....');
  //   fetch(`${URL}`)
  //     .then(res => res.json())
  //     .then(async res => {
  //       console.log('RESPONE:', res);
  //     })
  //     .catch(err => console.log('ERROR:', err));
  // };

  useEffect(() => {
    setTimeout(() => {
      fetch(`${URLS}`, {
        method: 'GET',
      })
        .then(response => response.json())
        .then(json => setData(json))
        .catch(err => console.error(err))
        .finally(() => setLoading(true));
    }, 2000);
  }, []);

  // console.log(data);
  // console.log(loading);

  return (
    <View style={{flex: 100}}>
      <View
        style={{
          flex: 30,
          borderWidth: 1,
          borderColor: 'black',
        }}>
        {!loading ? (
          <Image
            style={{
              height: 200,
              width: 200,
            }}
            source={{
              uri: 'https://wallpaperaccess.com/full/317501.jpg',
            }}
            alt="Alternate Text"
          />
        ) : (
          data.map((post, index) => {
            const pic = post.image;
            const pics = JSON.parse(post.image);
            {
              /* console.log(JSON.parse(pic)); */
            }
            console.log(pics[0]);

            {
              /* pic.map(function (item) {
              console.log(item);
            }); */
            }
            {
              /* console.log(typeof post.image); */
            }

            return (
              <View key={index}>
                <Text>{post.name}</Text>
                <Image
                  style={{
                    height: 200,
                    width: 200,
                  }}
                  // source={{
                  //   uri: 'https://wallpaperaccess.com/full/317501.jpg',
                  // }}
                  source={{uri: `${URLIMG}/${pics[0]}`}}
                />
              </View>
            );
          })
        )}
      </View>
      <View
        style={{
          flex: 70,
          borderWidth: 1,
          borderColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            borderRadius: 10,
          }}>
          <Text
            style={{
              padding: 12,
              color: 'white',
            }}>
            getAPI
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              padding: 12,
              color: 'white',
            }}>
            Upload
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text
            style={{
              padding: 12,
              color: 'white',
            }}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckImage;
