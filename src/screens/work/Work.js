import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import WrappedButton from '../task/components/WrappedButton';
import Worklist from './WorkList';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Title extends Component {
    render() {
        return (
            <Text style={{ fontSize: upadding * 1.5, fontWeight: 'bold', color: '#8D8D8C' }}>
                {'WORK LIST'}
            </Text>
        );
    }
}
class Icons extends Component {
    render() {
        return (
            <View style={{ marginRight: upadding * 1.5 }}>                
                <WrappedButton
                    onPress={() => {
                        this.props.navigation.navigate('creatework');
                    }}
                    iconTitle={'add'}
                />
            </View>
        );
    }
}

export default class Work extends Component {
    static navigationOptions = ({ navigation }) => (
        {
            headerTitle: () => <Title navigation={navigation} />,
            headerRight: () => <Icons navigation={navigation} />,
            headerTintColor: '#8D8D8C'
        }
    );

    render() {
        return (
            <View
                style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white' }}
            >
                <Worklist navigation={this.props.navigation} />
            </View>
        );
    }
}

