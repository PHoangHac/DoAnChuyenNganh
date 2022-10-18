import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {icons} from '../../../constants';

const SocialCPNS = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.SocialLogin}>
        {/* google login */}
        <TouchableOpacity style={[styles.btnSocial]}>
          <Image source={icons.googleIcon2} />
        </TouchableOpacity>
        {/* twitter login */}
        <TouchableOpacity style={styles.btnSocial}>
          <Image source={icons.twitterIcon2} />
        </TouchableOpacity>
        {/* facebook login */}
        <TouchableOpacity style={styles.btnSocial}>
          <Image source={icons.facebookIcon2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: 80,
    // backgroundColor: 'gray',
    // borderWidth: 1,
    // borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SocialLogin: {
    width: '80%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'white',
    marginTop: 17,
  },
  btnSocial: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 9,
    // opacity: 0.7,
    elevation: 5,
  },
});

export default SocialCPNS;
