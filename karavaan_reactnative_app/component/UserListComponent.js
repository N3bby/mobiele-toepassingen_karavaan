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
    Thumbnail
}from 'native-base';
import {Person} from "../domain/Person";

export default class UserListComponent extends React.Component {

    constructor(navigation) {
        super();
        //Some test data
        //global.service.addNewTrip("SomeTrip", "Some description for the trip");
        global.service.addNewPerson("surendra","sapkota");
        
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
                            <Left>
                                <Thumbnail small source={require('../images/house.jpg')}/>
                            </Left>
                            <Body>
                            <Text>{item.firstName}</Text>
                            <Text note>{item.lastName}</Text>
                            </Body>
                        </ListItem>
                    ))}
                </List>
            </Content>
        );
    }

}
