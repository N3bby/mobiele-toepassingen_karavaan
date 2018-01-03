import React from "react";
import {PaymentListComponent} from "./PaymentListComponent";
import {
    Body, Button, Container, Fab, Footer, H3, Header, Icon, Left, Right, Subtitle, Tab, Tabs, Text,
    Title, View
} from "native-base";
import * as ExpenseType_1 from "../../domain/ExpenseType";
import {BillItemListComponent} from "./BillItemListComponent";
import UserListComponent from "../UserListComponent";

export class ExpenseOverviewComponent extends React.Component {

    // Properties
    // - tripId (via navigation)
    // - expenseId (via navigation)

    constructor(props) {
        super(props);
    }

    navigateParticipantAdd() {
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;

        let returnUser = (user) => {
            global.service.addParticipantToExpenseById(tripId, expenseId, user.id);
            global.saveService();
        };

        this.props.navigation.navigate("TripUserPicker", {
            tripId: tripId,
            returnUser: returnUser.bind(this)
        });
    }

    navigateAddPayment() {
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;

        this.props.navigation.navigate("AddPayment", {
            tripId: tripId,
            expenseId: expenseId
        });
    }

    render() {

        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;
        let expense = global.service.getExpenseById(tripId, expenseId);

        return (

            <Container>

                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{expense.description}</Title>
                    <Subtitle>{expense.category}</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon active name="trash"/>
                        </Button>
                    </Right>
                </Header>

                <Tabs>
                    <Tab heading="Overview">
                        <H3>Total: {expense.expenseAmount}</H3>
                        <H3>Payments</H3>
                        <PaymentListComponent tripId={tripId} expenseId={expenseId}/>
                        {expense.expenseType === ExpenseType_1.ExpenseType.BillExpense && <BillItemListComponent/>}
                        <View style={{flexDirection: "row", padding: 10}}>
                            <Left>
                                <Button onPress={() => this.navigateAddPayment()}><Text>Add Payment</Text></Button>
                            </Left>
                            <Right>
                                {expense.expenseType === ExpenseType_1.ExpenseType.BillExpense &&
                                <Button><Text>Add BillItem</Text></Button>}
                            </Right>
                        </View>
                    </Tab>

                    <Tab heading="Debts">

                    </Tab>

                    <Tab heading="Participants">
                        <UserListComponent
                            sourceFunc={() => global.service.getParticipantsByExpenseId(tripId, expenseId)}
                            observerFunc={(component) => global.observerService.addExpenseParticipantMapCallback(tripId, expenseId, () => component.forceUpdate())}
                        />
                        {expense.expenseType === ExpenseType_1.ExpenseType.EvenExpense &&
                        <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}}
                             onPress={() => this.navigateParticipantAdd()}>
                            <Icon name="md-add"/>
                        </Fab>}
                    </Tab>
                </Tabs>

            </Container>

        );
    }


}