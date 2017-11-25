import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput, 
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
export default class ProfileScreen extends React.Component {
  static navigationOptions= {
    title: 'Profile',
  }
  render() {
    return (
      <View style={styles.container}>
      <Text onPress = {()=> navigate('Home')}>Navigate to HomeScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});





