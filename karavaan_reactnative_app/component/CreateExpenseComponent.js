import React, {Component} from 'react';
import { Platform } from "react-native";
import {
    Container,
    Tab,
    List,
    ListItem,
    Content,
    Title,
    Header,
    Body,
    Button,
    Left,
    Right,
    Icon,
    Item,
    Input,
    Subtitle,
    Text,
    Form,
    Picker
}from 'native-base';
import { ExpenseType } from '../domain/ExpenseType';
import '../ServiceWrapper.js';

export default class CreateExpenseComponent extends React.Component {

    constructor(props) {
      super(props);
        this.state = {
          expenseDescription: "",
          expenseCategory: "",
          expenseAmount: "",
          selectedExpenseType: ExpenseType.EvenExpense
        };
      }

    addExpense(tripId: number)
    {
        try
        {
            // Check if the expense description is not too long
            if (this.state.expenseDescription.length == 0 || this.state.expenseDescription.length > 50)
                throw new Error("Expense Description should be between 1 and 50 characters.");
            
            // Check if the category is not too long
            if (this.state.expenseCategory.length == 0 || this.state.expenseCategory.length > 50) 
                throw new Error("Expense Category should be between 1 and 50 characters.");
            
            let expenseAmount = parseFloat(this.state.expenseAmount);
            if (expenseAmount <= 0)
                throw new Error("Expense cost should be higher than 0.");
            
            global.service.addNewExpenseByTripId(tripId, ExpenseType.EvenExpense, this.state.expenseAmount, this.state.expenseDescription, this.state.expenseCategory);
            global.saveService();
            this.props.navigation.goBack();
            global.homeComponent.forceUpdate();
        }
        catch (error)
        {
            alert(error);
        }
    }
    
    onDescriptionChange(value)
    {
        this.setState({ expenseDescription: value });
    }
    
    onCategoryChange(value)
    {
        this.setState({ expenseCategory : value});
    }
    
    onAmountChange(value)
    {
        this.setState({ expenseAmount : value });
    }
    
    onTypeChange(value)
    {
        this.setState({ expenseType : value });
    }

    render() {
        
        var tripId = this.props.navigation.state.params.tripId;
        
        return (
            
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>New Expense</Title> 
                    </Body>
                </Header>
                
                <Content>
                            
                    <Form>
                    
                        <Picker iosHeader="Select one"
                         mode="dropdown"
                         selectedValue={this.state.expenseType}
                         onValueChange={this.onTypeChange.bind(this)}
                        >
                            {Object.keys(ExpenseType).map((item, index) => (
                             
                             <Item key={{item}} label={ExpenseType[item]} value={item} />
                             
                             ))}
                        </Picker>
                            
                    </Form>
                    
                    <Item regular>
                        <Input placeholder='Expense Description' 
                         value={this.state.expenseDescription}
                         onChangeText={this.onDescriptionChange.bind(this)}
                        />
                    </Item>

                    <Item regular>
                        <Input placeholder='Expense category' 
                               value={this.state.expenseCategory}r
                               onChangeText={this.onCategoryChange.bind(this)} 
                        />
                    </Item>

                    <Item regular>
                        <Input placeholder='Expense cost' 
                               value={this.state.expenseAmount} 
                               onChangeText={this.onAmountChange.bind(this)} />
                    </Item>

                    <Button success style={{ alignSelf: "center", margin:10 }} onPress={() => this.addExpense(tripId)} >
                        <Text>Create</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}