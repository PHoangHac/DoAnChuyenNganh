import React, {useState, createContext} from 'react';
import axios from 'axios';
import {BASE_URL} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

// function SomeComponent() {
//   // We can access navigation object via context
// }

export const AuthProvider = ({children, navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  // console.log(userInfo);
  const [isLoading, setIsloading] = useState(false);
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
          console.log(userInfo);
        }, 2000);
      })
      .catch(e => {
        console.log(`Register error ${e}`);
        setIsloading(false);
      });
  };

  const Login = (email, password) => {
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
          // console.log(userInfo);
          // navigation.navigate('HomeTabs');
        }, 2000);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsloading(false);
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
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        Register,
        Login,
        Logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
