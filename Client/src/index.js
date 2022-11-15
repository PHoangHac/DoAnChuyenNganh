// library
import React, {useContext} from 'react';
// import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
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
import FavoritesScreen from './views/Favorites/Favorites';
// import DetailsScreen from './views/TourList/DetailTour/DetailTour';
import DetailsScreen2 from './views/TourList/DetailTour/DetailTour2';
import ProfileDetail from './views/Profile/ProfileDetail';
// import {icons} from './constants/index';
// import Bookings from './views/Bookings/Bookings';
import Bookings2 from './views/Bookings/Bookings1';
import PaymentScreen from './views/Payment/PaymentScreen';
import BillScreen from './views/Payment/BillScreen';
import SplashLoadingScreen from './views/splashScreen/SplashScreen';
import UnpaidScreen from './views/Payment/Unpaid';
import HistoriesScreen from './views/Payment/Histories';
import PayPalScreen from './views/Payment/PayPal';
import ListItemSearch from './views/Search/SearchFix';
import AdminDashBoard from './views/Admin';
import UpdateTourScreen from './views/Admin/View/Tour/UpdateTourScreen';
import UpdateUserScreen from './views/Admin/View/Users/UpdateUserScreen';
import MapScreen from './views/Map/MapScreen';
import ReviewByTourScreen from './views/ReviewByTour/ReviewByTourScreen';
import ReviewByUserScreen from './views/ReviewByTour/ReviewByUserScreen';
import {AuthContext} from './context/AuthContext';

// variable
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

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
            <Icon
              name={focused ? 'search' : 'search-off'}
              color={color}
              size={32}
            />
          ),
        }}
        name="Search"
        component={ListItemSearch}
      />
      <Tab.Screen
        name="Discover"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({color, focused}) => (
            <Icon
              name={focused ? 'rate-review' : 'preview'}
              color={color}
              size={32}
            />
          ),
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

// function DrawerCustom() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="FilterSearch" component={FilterSearch} />
//     </Drawer.Navigator>
//   );
// }

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);

  // console.log(splashLoading);
  // if (userInfo) {
  //   console.log('true');
  // } else {
  //   console.log('false');
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoarding"
        screenOptions={{headerShown: false}}>
        {splashLoading ? (
          <Stack.Screen
            name="SplashLoadingScreen"
            component={SplashLoadingScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.jwtToken ? (
          <>
            {userInfo.user.roleName === 'Admin' && (
              <>
                <Stack.Screen
                  name="AdminDashBoard"
                  component={AdminDashBoard}
                />
                <Stack.Screen
                  name="UpdateTourScreen"
                  component={UpdateTourScreen}
                />
                <Stack.Screen
                  name="UpdateUserScreen"
                  component={UpdateUserScreen}
                />
              </>
            )}
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="DetailsScreen2" component={DetailsScreen2} />
            <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
            <Stack.Screen name="Bookings" component={Bookings2} />
            <Stack.Screen name="PayPalScreen" component={PayPalScreen} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
            <Stack.Screen name="BillScreen" component={BillScreen} />
            <Stack.Screen name="UnpaidScreen" component={UnpaidScreen} />
            <Stack.Screen name="HistoriesScreen" component={HistoriesScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen
              name="ReviewByTourScreen"
              component={ReviewByTourScreen}
            />
            <Stack.Screen
              name="ReviewByUserScreen"
              component={ReviewByUserScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
