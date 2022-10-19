// library
import React from 'react';
// import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screen view
import OnBoarding from './views/OnBoarding/OnBoarding';
// import SignIn from './views/Authentication/SignIn';
import SignInScreen from './views/Authentication/SignInScreen';
import SignUpScreen from './views/Authentication/SignUpScreen';
// import SignUp from './views/Authentication/SignUp';
import ForgotPass from './views/Authentication/ForgotPass';
import HomeScreen from './views/Home/HomeScreen';
// import MapScreen from './views/Map/MapScreen';
import ProfileScreen from './views/Profile/Profile';
import FavoritesScreen from './views/Favorites/Favories';
import SearchScreen from './views/Search/Search';
// import DetailsScreen from './views/TourList/DetailTour/DetailTour';
import DetailsScreen2 from './views/TourList/DetailTour/DetailTour2';
import ProfileDetail from './views/Profile/ProfileDetail';
// import {icons} from './constants/index';
// import Bookings from './views/Bookings/Bookings';
import Bookings2 from './views/Bookings/Bookings1';
import PaymentScreen from './views/Payment/PaymentScreen';
import BillScreen from './views/Payment/BillScreen';

import {Provider} from 'react-redux';
import {store} from './redux/store';

// variable
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
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
          // backgroundColor: '#1847A2',
          // backgroundColor: '#D7EFFC',
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
      {/* <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image
              source={icons.mapicon}
              style={{width: 30, height: 30, marginTop: 5}}
              resizeMode="stretch"
            />
          ),
        }}
        name="Map"
        component={MapScreen}
      /> */}
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'search' : 'search-off'}
              color={color}
              size={32}
            />
          ),
        }}
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        name="Favories"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'favorite' : 'favorite-outline'}
              color={color}
              size={32}
            />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              size={32}
              color={color}
            />
          ),
        }}
        name="Setting"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

const RootPage = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="OnBoarding"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPass" component={ForgotPass} />
          <Stack.Screen name="DetailsScreen2" component={DetailsScreen2} />
          <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="Bookings" component={Bookings2} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="BillScreen" component={BillScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default RootPage;
