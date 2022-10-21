/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import RootPage from './src';
import Navigation from './src';
import React from 'react';
// -----------------AuthContext----------------//
import {AuthProvider} from './src/context/AuthContext';
// -----------------AuthContext----------------//

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default App;
