import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {WebView} from 'react-native-webview';
import axios from 'axios';

const PayPalScreen = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  //---------state-------//
  const [access_Token, setAccess_Token] = useState(null);
  const [approvalUrl, setPayPalUrl] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  //---------state-------//

  console.log({
    access_token: access_Token,
    url: approvalUrl,
    paymentId: paymentId,
  });

  // console.log(approvalUrl.href);

  //---------PayPal---------//

  useEffect(() => {
    const price = route.params.totalCost;
    console.log(price);
    const dataDetail = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: 'item',
                sku: 'item',
                price: price,
                currency: 'USD',
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: 'USD',
            total: price,
          },
          description: 'This is the payment description.',
        },
      ],
    };

    axios
      .post(
        'https://api.sandbox.paypal.com/v1/oauth2/token',
        {grant_type: 'client_credentials'},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer A21AAJn4rqpthDPTOqVRdnHDqp4gzee-qxObLLdB_LOK5oTjxzfceKvNlK57667FAbTNVq-uszdzgWoIdsndFLCK7pqeO_Sdg`, // Your Authorization Value
          },
        },
      )
      .then(response => {
        // console.log(response.data.access_token);
        setAccess_Token(response.data.access_token);
        axios
          .post(
            'https://api.sandbox.paypal.com/v1/payments/payment',
            dataDetail, // you can get data details from https://developer.paypal.com/docs/api/payments/v1/
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${response.data.access_token}`,
              },
            },
          )
          .then(response => {
            // console.log(response);
            const {id, links} = response.data;
            const approvalUrl = links.find(data => data.rel == 'approval_url');
            setPaymentId(id);
            setPayPalUrl(approvalUrl.href);
            // console.log(id);
            // console.log(approvalUrl);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  // //---------PayPal---------//

  const ThisOnNavigationStateChange = webViewState => {
    if (webViewState.url.includes('https://example.com/')) {
      setPayPalUrl(null);

      const {PayerID, paymentId} = webViewState.url;

      fetch(
        `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
        {
          method: 'POST',
          body: {payer_id: PayerID},
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_Token}`,
          },
        },
      )
        .then(res => res.json())
        .then(response => {
          // console.log('res:', response);
          if (response.name == 'INVALID_RESOURCE_ID') {
            alert('Payment failed. Please Try Again');
            setPayPalUrl(null);
          }
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <View
      style={{
        flex: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* WEBVIEW */}
      <View>
        {approvalUrl ? (
          <Modal
            animationType="slide"
            visible={modalVisible}
            tartInLoadingState={false}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                backgroundColor: '#F0FFFF',
                height: '100%',
                width: '100%',
              }}>
              <WebView
                onNavigationStateChange={ThisOnNavigationStateChange}
                startInLoadingState={false}
                source={{uri: approvalUrl}}
              />
            </View>
          </Modal>
        ) : (
          <View>
            <ActivityIndicator />
          </View>
        )}
      </View>
      {/* END WEBVIEW */}

      {/* BTN PAYMENT */}
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
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            marginTop: 10,
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
      {/* END BTN PAYMENT */}
    </View>
  );
};

export default PayPalScreen;
