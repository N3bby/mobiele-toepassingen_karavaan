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
    // - source (Map) : Reference to userMap object. Can't use a function here since values will only be updated upon re-creating the component then.
    // - observerFunc (function) : Function that registers a callback to the ObserverService. Takes one argument, (component)

    // - isPicker (bool) : If true, this component will act as a Picker
    // - pickerFunc (function) : Function to execute when a user has been clicked

    constructor(props) {
        super(props);
        this.props.observerFunc(this);
    }

    executePickerFunc(user) {
        this.props.pickerFunc(user);
    }

    render() {
        return (
            <Content>
                <List dataArray={Array.from(this.props.source.values())} renderRow={(user) =>
                    <ListItem key={user.userId} button={this.props.isPicker} onPress={() => this.executePickerFunc(user)} icon>
                        <Left>
                            <Icon style={{fontSize: 25}} name="person"/>
                        </Left>
                        <Body>
                        <Text style={{fontSize: 18}}>{user.name}</Text>
                        </Body>
                    </ListItem>
                }/>
            </Content>
        );
    }
}
