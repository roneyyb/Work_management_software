import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, TouchableHighlight, View} from 'react-native';

export default class extends Component {
    render() {
        const { iconTitle, onPress } = this.props;
        return (
            <View style={styles.Container1style}>
                <TouchableHighlight
                    style={styles.touchstyle}
                    underlayColor={'#8D8D8C33'}
                    onPress={() => { onPress() }}
                >
                    <MaterialIcons
                        name={iconTitle}
                        size={upadding * 2.2}
                        color='#2B65EC'
                    />
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container1style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchstyle: {
        height: upadding * 3,
        width: upadding * 3,
        borderRadius: upadding * 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
});