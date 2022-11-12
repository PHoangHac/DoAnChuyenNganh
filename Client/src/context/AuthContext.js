import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import {BASE_URL} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import querystring from 'querystring';
export const AuthContext = createContext();

// function SomeComponent() {
//   // We can access navigation object via context
// }

export const AuthProvider = ({children, navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  // console.log(userInfo);
  const [isLoading, setIsloading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [access_TokenPaypal, setAccess_TokenPaypal] = useState('');

  const Register = (email, password, name, roleName) => {
    setIsloading(true);
    axios
      .post(`${BASE_URL}/SignUp`, {
        email,
        password,
        name,
        roleName,
      })
      .then(res => {
        setTimeout(() => {
          let userInfo = res.data;
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsloading(false);
          // console.log(userInfo);
        }, 2000);
      })
      .catch(e => {
        console.log(`Register error ${e}`);
        setIsloading(false);
      });
  };

  const Login = async (email, password) => {
    setIsloading(true);

    axios
      .post(`${BASE_URL}/SignIn`, {
        email,
        password,
      })
      .then(res => {
        setTimeout(() => {
          let userInfo = res.data;
          setUserInfo(userInfo);
          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
          setIsloading(false);
          console.log(userInfo);
          // navigation.navigate('HomeTabs');
        }, 2000);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsloading(false);
      });

    await axios
      .post(
        'https://api.sandbox.paypal.com/v1/oauth2/token',
        querystring.stringify({grant_type: 'client_credentials'}),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username:
              'AZAOI_MOCJiD_nI0YnQ-4knNWAizfuCkIPfLlD8xeq3MmQSFLJ6R9nFOrC5mJFEd_Mm6_3SWql68wdF5',
            password:
              'EK--oBhD3Zvz4FURSnS2NISIR-rX_AG2SDhnnMQLbhm1JPY16_PJr1_NtZ0ToiF3BRp0E1tXSSPn8sE2',
          },
        },
      )
      .then(response => {
        // console.log('response', response.data);
        setAccess_TokenPaypal(response.data.access_token);
      })
      .catch(err => {
        // console.log('error', { ...err });
        console.log('error', err);
      });
  };

  const Logout = (email, password) => {
    setIsloading(true);

    axios
      .post(
        `${BASE_URL}/LogOut`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.jwtToken}`},
        },
      )
      .then(res => {
        setTimeout(() => {
          console.log(res.data);
          AsyncStorage.removeItem('userInfo');
          setUserInfo({});
          setIsloading(false);
          // console.log(userInfo);
          // navigation.navigate('HomeTabs');
        }, 2000);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsloading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    } catch (error) {
      setSplashLoading(false);
      console.log(`Logged err ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        access_TokenPaypal,
        Register,
        Login,
        Logout,
        isLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
