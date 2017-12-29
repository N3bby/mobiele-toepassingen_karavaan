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
} from 'native-base';

import '../ServiceWrapper.js';

export default class UserListComponent extends React.Component {

    //Properties
    // - navigation (object) : Navigation object
    // - sourceFunc (function) : A function that will fetch the array of users
    // - observerFunc (function) : Function that registers a callback to the ObserverService. Takes one argument, (component)

    // - isPicker (bool) : If true, this component will act as a Picker
    // - pickerFunc (function) : Function to execute when a user has been clicked

    constructor(props) {
        super(props);
        this.props.observerFunc(this);
    }

    executePickerFunc(user) {
        if(this.props.isPicker) this.props.pickerFunc(user);
    }
    
    removeUser(userId)
    {
        try
        {
            this.props.removeUserFunc(userId);
        }
        catch (error)
        {
            alert(error);
        }
    }

    render() {

        return (
            <Content>
                <List dataArray={this.props.sourceFunc()} renderRow={(user) =>
                    <ListItem key={user.userId} button={this.props.isPicker} onPress={() => this.executePickerFunc(user)} icon>
                        <Left>
                            <Icon style={{fontSize: 25}} name="person"/>
                        </Left>
                        <Body>
                        <Text style={{fontSize: 18}}>{user.name}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.removeUser(user.id)}>
                                <Icon name="trash"/>
                            </Button>
                        </Right>
                    </ListItem>
                }/>
            </Content>
        );
    }
}
