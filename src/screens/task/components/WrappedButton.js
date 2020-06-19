import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, TouchableHighlight, View} from 'react-native';

export default class extends Component {
    render() {
        const { iconTitle, onPress, iconColor } = this.props;
        return (
            <View style={styles.Container1style}>
                <TouchableHighlight
                    style={styles.touchstyle}
                    underlayColor={'#8D8D8C33'}
                    onPress={() => { onPress() }}
                >
                    <MaterialIcons
                        name={iconTitle}
                        size={24}
                        color={iconColor || '#8D8D8C'}
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
        height: 36,
        width: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
});