import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

const PayPalScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Modal
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Text>Hello</Text>
          <WebView source={{uri: 'http://192.168.1.8:9090/PayPal/home'}} />
        </Modal>
      </View>
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
          }}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text
            style={{
              color: 'white',
              padding: 10,
            }}>
            Touch here !
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PayPalScreen;
