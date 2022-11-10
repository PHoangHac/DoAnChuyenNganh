import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {View, Text} from 'react-native';

//-----------Screen----------//
import HomeScreen from '../Admin/View/Home/HomeScreen';
import TourScreen from './View/Tour/TourScreen';
import StateScreen from './View/StateTour/StateScreen';
import UserScreen from './View/Users/UserScreen';
//-----------Screen----------//

const Tab = createBottomTabNavigator();

const AdminDashBoard = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: '#CC0000',
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 15,
          fontFamily: 'Inter-Bold',
        },
        tabBarStyle: {
          position: 'absolute',
          height: 60,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'home' : 'home-work'}
              color={color}
              size={32}
            />
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon name={'animation'} color={color} size={32} />
          ),
        }}
        name="Tour"
        component={TourScreen}
      />
      <Tab.Screen
        name="Users"
        component={StateScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'person-outline' : 'person-add'}
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon name={'settings-applications'} size={32} color={color} />
          ),
        }}
        name="State"
        component={UserScreen}
      />
    </Tab.Navigator>
  );
};

export default AdminDashBoard;
