import React, {useState} from 'react';

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {icons} from '../../constants';

import {isValidEmail, isValidPassword} from './utilities/Validations';

const RegisterScreen = () => {
  const [keyboardIsShow, setKeyboardIsShow] = React.useState(false);

  // states for validating
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  // states to store email/password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidationOK = () =>
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) == true &&
    isValidPassword(password) == true;

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShow(false);
    });
  });

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={{flex: 100, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 25,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            width: '50%',
          }}>
          Already have a Account?
        </Text>
        <Image
          source={icons.computericon}
          style={{height: 120, width: 120, alignSelf: 'center'}}
        />
      </View>
      <View style={{flex: 60}}>
        <View style={{marginHorizontal: 15}}>
          <Text style={{color: '#F56F63'}}>Email:</Text>
          <TextInput
            onChangeText={text => {
              // if(isValidEmail(text) == false){
              //   setErrorEmail('Email not in correct format !')
              // }else{
              //   setErrorEmail('')
              // }

              setErrorEmail(
                isValidEmail(text) == true
                  ? ''
                  : 'Email not in correct format !',
              );
              setEmail(text);
            }}
            style={{color: 'black'}}
            placeholder="example@gmail.com"
            placeholderTextColor="gray"
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#F56F63',
              width: '100%',
              marginBottom: 5,
              marginHorizontal: 15,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: 'red',
              fontSize: 14,
              marginBottom: 15,
            }}>
            {errorEmail}
          </Text>
        </View>
        <View style={{marginHorizontal: 15}}>
          <Text style={{color: '#F56F63'}}>Password:</Text>
          <TextInput
            onChangeText={text => {
              setErrorPassword(
                isValidPassword(text) == true
                  ? ''
                  : 'Password must be at least 3 characters !',
              );
              setPassword(text);
            }}
            secureTextEntry={true}
            style={{color: 'black'}}
            placeholder="Enter your password"
            placeholderTextColor="gray"
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#F56F63',
              width: '100%',
              marginBottom: 15,
              marginHorizontal: 15,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: 'red',
              fontSize: 14,
              marginBottom: 15,
            }}>
            {errorPassword}
          </Text>
        </View>
        <View style={{marginHorizontal: 15}}>
          <Text style={{color: '#F56F63'}}>Password:</Text>
          <TextInput
            onChangeText={text => {
              setErrorPassword(
                isValidPassword(text) == true
                  ? ''
                  : 'Password must be at least 3 characters !',
              );
              setPassword(text);
            }}
            secureTextEntry={true}
            style={{color: 'black'}}
            placeholder="Re-Enter your password"
            placeholderTextColor="gray"
          />
          <View
            style={{
              height: 1,
              backgroundColor: '#F56F63',
              width: '100%',
              marginBottom: 15,
              marginHorizontal: 15,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: 'red',
              fontSize: 14,
              marginBottom: 15,
            }}>
            {errorPassword}
          </Text>
        </View>
        <TouchableOpacity
          disabled={isValidationOK() == false}
          onPress={() => {
            alert(`Email = ${email}, password = ${password}`);
          }}
          style={{
            backgroundColor:
              isValidationOK() == true ? '#F56F63' : 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            // marginHorizontal: 30,
            width: '50%',
            alignSelf: 'center',
            borderRadius: 18,
          }}>
          <Text
            style={{
              color: 'white',
              padding: 8,
              fontSize: 15,
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
      {keyboardIsShow == false && <View style={{flex: 20}}></View>}
      {keyboardIsShow == false && (
        <View style={{flex: 30}}>
          <View
            style={{
              height: 40,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 10,
            }}>
            <Text style={{height: 1, backgroundColor: 'black', flex: 1}} />
            <Text
              style={{
                padding: 8,
                fontSize: 14,
                color: 'black',
                alignSelf: 'center',
                marginHorizontal: 10,
              }}>
              User other methods ?
            </Text>
            <Text style={{height: 1, backgroundColor: 'black', flex: 1}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              style={{height: 35, width: 35}}
              source={icons.facebookIcon2}
            />
            <View style={{width: 15}} />
            <Image style={{height: 35, width: 35}} source={icons.googleIcon2} />
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
