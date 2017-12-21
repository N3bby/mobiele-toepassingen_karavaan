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

import '../ServiceWrapper.js';

export default class UserListComponent extends React.Component {

    constructor(navigation) {
        super();
    }
    
    deletePerson(userId)
    {
        try
        {
            global.service.removePersonById(userId);
            global.saveService();
            global.homeComponent.forceUpdate();
        }
        catch (error)
        {
            alert(error);
        }
    }

    render() {

        //TODO Fix the weird touch effect here.
        //Bug report of it can be found here: https://github.com/GeekyAnts/NativeBase/issues/1378
        //Apparently an issue with the last version of NativeBase. Might need to wait for a fix
        return (
            <Content>
                <List>
                    {global.service.persons.map((item, index) => (
                        <ListItem key={index} avatar>
                            <Left>
                                <Icon active name="person" />
                            </Left>
                            <Body>
                                <Text>{item.name}</Text>
                            </Body>
                            <Right>
                                <Button danger>
                                    <Icon name='trash' onPress={() => this.deletePerson(item.id) } />
                                </Button>
                            </Right>
                        </ListItem>
                    ))}
                </List>
            </Content>
        );
    }

}

