import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {icons, images} from '../../constants/index';

// Vector-Icon
import Icon from 'react-native-vector-icons/FontAwesome5';

// components
import {UIBtn, UIBtnLogin} from './components';

const Welcome = props => {
  // state => when a state is changed => UI is reloaded
  // like getter/setter
  const [accountTypes, setAccountType] = React.useState([
    {
      name: 'Influencer',
      isSelected: true,
    },
    {
      name: 'Business',
      isSelected: false,
    },
    {
      name: 'Individual',
      isSelected: false,
    },
  ]);

  return (
    <View style={{flex: 100, backgroundColor: 'white'}}>
      <ImageBackground
        source={images.backgourndSigIn2}
        style={{flex: 100}}
        resizeMode="cover">
        <View
          style={{
            flex: 20,
            borderWidth: 1,
            borderColor: 'black',
          }}>
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: 30,
                width: 30,
                marginStart: 5,
                marginEnd: 5,
              }}
              source={icons.fireicon}
            />
            <Text style={{color: 'white'}}>YOURCOMPANY.COM</Text>
            <View style={{flex: 1}} />
            <Image
              style={{
                height: 20,
                width: 20,
                tintColor: 'white',
                marginEnd: 10,
              }}
              source={require('./assets/question.png')}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'black',
            flex: 20,
            width: '100%',
          }}>
          <Text style={{marginBottom: 7, color: 'white'}}>Welcome to</Text>
          <Text style={{marginBottom: 7, color: 'white'}}>YOURCOMPANY.CO</Text>
          <Text style={{marginBottom: 7, color: 'white'}}>
            Please select your account
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flex: 40,
            // width: '100%',
          }}>
          {accountTypes.map(accountType => (
            <UIBtn
              onPress={() => {
                let newAcccountType = accountTypes.map(eachAcccountType => {
                  return {
                    ...eachAcccountType,
                    isSelected: eachAcccountType.name == accountType.name,
                  };
                });

                setAccountType(newAcccountType);
              }}
              title={accountType.name}
              isSelected={accountType.isSelected}
            />
          ))}
        </View>
        <View style={{borderWidth: 1, borderColor: 'black', flex: 20}}>
          <UIBtnLogin screenName="LoginScreen" title={'login'.toUpperCase()} />
          <Text
            style={{
              color: 'white',
              fontSize: 14,
              alignSelf: 'center',
            }}>
            Want to register new Account ?
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                alignSelf: 'center',
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                paddingTop: 10,
              }}>
              Register?
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;
