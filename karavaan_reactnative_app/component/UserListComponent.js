import React from 'react';
import {
    Container,
    Tab,
    List,
    ListItem,
    Content,
    Left,
    Body,
    Icon,
    Text,
    Thumbnail,
    SwipeRow,
    Button,
    View,
    Right
}from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Person} from "../domain/Person";

export default class UserListComponent extends React.Component {

    constructor(navigation) {
        super();
        //Some test data
        global.service.addNewPerson("surendra","sapkota");
        global.service.addNewPerson("Levi","Vandenbempt");
        global.service.addNewPerson("Artus","Vranken");
        global.service.addNewPerson("Tim", "Vangilbergen");
    }

    deleteUser(id){
        alert("DELETE METHOD NOT FOUND IN KARAVAANSERVICE\n idnr: "+id);
    }

    render() {

        //TODO Fix the weird touch effect here.
        //Bug report of it can be found here: https://github.com/GeekyAnts/NativeBase/issues/1378
        //Apparently an issue with the last version of NativeBase. Might need to wait for a fix
        return (
            <Content>
                <List>
                    {global.service.persons.map((item, index) => (
                        <ListItem key={index} button={true} onPress={() => this.props.navigation.navigate("UserOverview", { groupId: item.id })} avatar>
                            <Body>
                            <Grid>
                            <Col>
                            <Text>
                            <Icon active name="person" style={{padding:5}}/>
                            {item.firstName} {item.lastName}
                            </Text>
                            </Col>
                            <Col style={{width:50}}> 
                            <Right>
                            <Button small danger onPress={() => this.deleteUser(item.id)}>
                            <Icon active name="trash" />
                            </Button>
                            </Right>
                            </Col>
                            </Grid>
                            </Body>
                        </ListItem>
                    ))}
                </List>
            </Content>
        );
    }

}

