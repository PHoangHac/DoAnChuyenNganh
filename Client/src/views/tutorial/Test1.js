import React from 'react';
import Search1 from './tabBottom/Search';
import Search2 from './tabBottom/Search1';
import Profile1 from './tabBottom/Profile';
import Home from './tabBottom/Home';
import Product from './tabBottom/Product';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {icons} from '../../constants';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTabs = () => {
  const Custom = () => {
    return (
      <TouchableOpacity
        style={{
          height: 70,
          width: 70,
          borderRadius: 80,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'orange',
          // bottom: 40,
          // borderWidth: 3,
          // borderColor: 'gray',
        }}>
        <Image
          style={{
            height: 40,
            width: 40,
          }}
          source={icons.searchicon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image style={{height: 32, width: 32}} source={icons.homeicon} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image style={{height: 32, width: 32}} source={icons.mapicon} />
          ),
        }}
        name="Product"
        component={Product}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => <Custom />,
        }}
        name="Search2"
        component={Search2}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image style={{height: 32, width: 32}} source={icons.profileicon} />
          ),
        }}
        name="Search1"
        component={Search1}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image
              style={{height: 32, width: 32}}
              source={icons.favoriteicon}
            />
          ),
        }}
        name="Profile1"
        component={Profile1}
      />
    </Tab.Navigator>
  );
};

const TestSSS = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="MyTabs" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    position: 'absolute',
    left: 5,
    right: 5,
    height: 90,
    bottom: 21,
    borderRadius: 12,
    backgroundColor: 'black',
  },
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default TestSSS;
