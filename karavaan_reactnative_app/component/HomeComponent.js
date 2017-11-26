import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Tabs,
    Tab,
    Content,
    FooterTab,
    Footer
}from 'native-base';

export default class HomeComponent extends Component<{}> {
    render() {
        return (
            <Container>

                <Header hasTabs>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Karavaan App</Title>
                    </Body>
                    <Right/>

                </Header>

                <Tabs>
                <Tab heading="Trips">
                <Container>
                <Header>
                <Text>SubHead1 | SubHead2 | SubHead3</Text> 
                </Header>
                <Text>Trips</Text>                        
                <Content />
                <Footer>
                <FooterTab>
                <Button block primary full>
                <Text style={styles.CreateATrip}>Create a Trip</Text>
                </Button>
                </FooterTab>
                </Footer>
                </Container>
            </Tab>
            <Tab heading="Users">
                <Text>Users</Text>
            </Tab>
            <Tab heading="Activity">
                <Text>Activity</Text>
            </Tab>
        </Tabs>                
    </Container>
);
}
}

const styles = StyleSheet.create({
CreateATrip: {
color: 'white',
fontSize: 17,
},
});
