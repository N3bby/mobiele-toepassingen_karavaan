import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput, 
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import  Trip  from './CreateATrip';
export default class Main extends React.Component {
  
  constructor(props){
      super(props);
        this.state = {
            tripArray: [],
            tripText: '',
            amount: '',
            person: '',
        }
    }
  
    static navigationOptions= {
    title: 'Karavaan App',
  }
  render() {
      let trips = this.state.tripArray.map((val,key)=>{
       return <Trip key={key} keyval={key} val={val}
          deleteMethod={ ()=> this.deleteTrip(key)}/>
      });
    return (
      <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>Karavaan App</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
      {trips}
      </ScrollView>
      <View style={styles.footer}>

        <TextInput 
        style={styles.textInput}
        onChangeText={(tripText)=>this.setState({tripText})} //Del
        value={this.state.tripText} //del
        placeholder='onderwerp:cocktail'
        placeholderTextColor='white'
        underlineColorAndroid='transparent'>
        </TextInput>
        <TextInput 
        style={styles.textInput}
        onChangeText={(amount)=>this.setState({amount})} //Del
        value={this.state.amount} //del
        placeholder='€ '
        placeholderTextColor='white'
        underlineColorAndroid='transparent'>
        </TextInput>
        <TextInput 
        style={styles.textInput}
        onChangeText={(person)=>this.setState({person})} //Del
        value={this.state.person} //del
        placeholder='Surendra '
        placeholderTextColor='white'
        underlineColorAndroid='transparent'>
        </TextInput>
      </View>
      
      <TouchableOpacity onPress={this.addTrip.bind(this)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Create Trip</Text>

      </TouchableOpacity>
      
      </View>
    );
  }
  addTrip(){
    if(this.state.tripText){
        var d = new Date();
        this.state.tripArray.push({
            'date':d.getFullYear()+
            "/"+(d.getMonth()+1)+
            "/"+d.getDate(),
            'trip': this.state.tripText,
            'amount':this.state.amount,
            'person':this.state.person,
        });
        this.setState({ tripArray:this.state.tripArray })
        this.setState({ tripText: ''});
        this.setState({ trip:''});
        this.setState({ amount:''});
        this.setState({person:''});
    }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
      backgroundColor:'#CC6600',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 10,
      borderBottomColor: '#ddd',
  },
  headerText: {
      color: '#E6E6DC',
      fontSize: 24,
      padding: 30,
  },
  scrollContainer: {
      flex: 1,
      marginBottom: 100,
  },
  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex:10,
  },
  textInput: {
      alignSelf: 'stretch',
      color: '#fff',
      padding: 20,
      backgroundColor: '#252525',
  },
  addButton: {
      position: 'absolute',
      zIndex: 20, //11
      right: 120, //20
      bottom: 70, //90
      justifyContent: 'center',      
      backgroundColor: '#CC6600',
      width: 100,
      height: 30,
      borderRadius: 0,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
  },
  addButtonText: {
      color: '#E6E6DC',
      fontSize: 18,
  },
});





