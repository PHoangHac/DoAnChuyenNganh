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
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const Register = (email, password, name, roleName) => {
    setIsLoading(true);
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
          setIsLoading(false);
          setCheck(true);
        }, 2000);
      })
      .catch(e => {
        console.log(`Register error ${e}`);
        setIsLoading(false);
      });
  };

  const Login = async (email, password) => {
    setIsLoading(true);
    setUserInfo({});
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
          setIsLoading(false);
          // console.log(userInfo);
          // navigation.navigate('HomeTabs');
        }, 2000);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const RemoveAccStorage = () => {
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
  };

  const Logout = (email, password) => {
    setIsLoading(true);

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
          setIsLoading(false);
          // console.log(userInfo);
          // navigation.navigate('HomeTabs');
        }, 2000);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
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
        check,
        setCheck,
        isLoading,
        userInfo,
        splashLoading,
        Register,
        Login,
        Logout,
        isLoggedIn,
        RemoveAccStorage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
