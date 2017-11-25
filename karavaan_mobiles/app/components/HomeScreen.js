import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput, 
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage} from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class HomeScreen extends React.Component {
  static navigationOptions= {
    title: 'Karavaan App',
  }
  render() {
    return (
      <View style={styles.container}>
      <Text onPress = {()=> navigate('Profile')}>Navigate to Profile</Text>
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





