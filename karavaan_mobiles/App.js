import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Expo from 'expo';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './app/components/HomeScreen';
import ProfileScreen from './app/components/ProfileScreen';
import Main from './app/components/Main';
/*const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen},
},{
  navigationOptions:{
    headerStyle:{
      marginTop: Expo.Constants.statusBarHeight
    }
}
});*/





export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}


const styles = StyleSheet.create({
  container: {
   
  },
});






