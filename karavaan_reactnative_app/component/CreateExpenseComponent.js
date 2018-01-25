import React, {Component} from 'react';
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
} from 'native-base';
import {ExpenseType} from '../domain/ExpenseType';
import '../ServiceWrapper.js';
import {EvenExpense} from '../domain/EvenExpense';
import {BillExpense} from "../domain/BillExpense";
import * as ExpenseType_1 from "../domain/ExpenseType";
import CurrencyInputComponent from "./currency/TripCurrencyPickerComponent";

export default class CreateExpenseComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expenseDescription: "",
            expenseCategory: "",
            expenseType: "EvenExpense"
        };
    }

    addExpense(tripId: number) {
        try {
            // Check if the expense description is not too long
            //if (this.state.expenseDescription.length == 0 || this.state.expenseDescription.length > 100)
              //  throw "Expense description should be between 1 and 100 characters.";

            // Check if the category is not too long
            //if (this.state.expenseCategory.length == 0 || this.state.expenseCategory.length > 50)
              //  throw "Expense category should be between 1 and 50 characters.";

            let expenseType;
            switch(this.state.expenseType) {
                case "EvenExpense":
                    expenseType = ExpenseType_1.ExpenseType.EvenExpense;
                    break;
                case "ShareExpense":
                    expenseType = ExpenseType_1.ExpenseType.ShareExpense;
                    break;
                case "BillExpense":
                    expenseType = ExpenseType_1.ExpenseType.BillExpense;
                    break;
                default:
                    throw "Problem creating expense: Invalid Type";
            }

            //TODO Might have to add currency selection here
            global.service.addNewExpenseByTripId(tripId, expenseType, this.state.expenseDescription, this.state.expenseCategory);

            global.saveService();
            this.props.navigation.goBack();
        }
        catch (error) {
            alert(error);
        }
    }

    onDescriptionChange(value) {
        this.setState({expenseDescription: value});
    }

    onCategoryChange(value) {
        this.setState({expenseCategory: value});
    }

    onTypeChange(value) {
        this.setState({expenseType: value});

    }

    render() {

        let tripId = this.props.navigation.state.params.tripId;

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
                    <Right/>
                </Header>

                <Content>

                    <Form>

                        <Picker iosHeader="Select one"
                                mode="dropdown"
                                placeholder="select the type of expense"
                                selectedValue={this.state.expenseType}
                                onValueChange={this.onTypeChange.bind(this)}
                        >
                            {Object.keys(ExpenseType).map((item, index) => (

                                <Item key={{item}} label={ExpenseType[item]} value={item}/>

                            ))}
                        </Picker>

                    </Form>

                    <Item regular>
                        <Input placeholder='Expense Description'
                               value={this.state.expenseDescription}
                               onChangeText={this.onDescriptionChange.bind(this)} maxLength={100} 
                        />
                    </Item>

                    <Item regular>
                        <Input placeholder='Expense category'
                               value={this.state.expenseCategory}
                               onChangeText={this.onCategoryChange.bind(this)} maxLength={50} 
                        />
                    </Item>

                    <Button success style={{alignSelf: "center", margin: 10}} onPress={() => this.addExpense(tripId)}>
                        <Text>Create</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}