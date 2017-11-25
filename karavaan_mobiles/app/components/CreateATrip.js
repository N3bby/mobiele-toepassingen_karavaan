import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class CrateATrip extends React.Component {
  static navigationOptions= {
    title: 'Create A Trip',
  }
  render() {
    return (
     <View key={this.props.keyval} style={styles.trip}>
     <Text style={styles.tripText}>Datum:{this.props.val.date}</Text>
     <Text style={styles.tripText}>Onderwerp:{this.props.val.trip}</Text>
     <Text style={styles.tripText}>Bedrag:{this.props.val.amount}</Text> 
     <Text style={styles.tripText}>Betaald door:{this.props.val.person}</Text>
     <TouchableOpacity onPress={this.props.deleteMethod} style={styles.tripDelete}>
     <Text style={styles.tripDeleteText}>D</Text>
     </TouchableOpacity>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  trip: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  tripText: {
    paddingLeft: 20,
    borderLeftWidth: 10,
    borderLeftColor: '#E91E63',
  },
  tripDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
  },
  tripDeleteText: {
    color: 'white',
  }
});


