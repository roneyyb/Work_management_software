import React, { Component } from 'react';
import { View, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WrappedButton from './WrappedButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = { pointer: false };
    }

    setpointer = (value) => {
        this.setState({ pointer: value });
    }

    render() {
        return (
                <View
                    style={styles.backgroundContainer}
                >
                    <View>
                        <WrappedButton
                            iconTitle={'list'}
                            onPress={() => {
                                this.props.onBackdropPress(1);
                            }}
                            disabled={this.state.pointer}
                        />
                    </View>
                    <View>
                        <WrappedButton
                            iconTitle={'more-vert'}
                            onPress={() => {
                                this.props.onBackdropPress(2);
                            }}
                            disabled={this.state.pointer}
                        />
                    </View>
                {this.props.completed ? <View style={{position:'absolute'}}/> :
                        (
                            <View style={styles.curve}>
                                <WrappedButton
                                    onPress={() => {
                                        this.props.navigation.navigate('createtask', {
                                            callUndo: this.props.callUndo,
                                            onNavigateBack: this.props.navigation.getParam('onNavigateBack')
                                        })
                                    }
                                    }
                                    touchSize={upadding*5}
                                    iconSize={upadding*3.5}
                                    disabled={this.state.pointer}
                                    iconTitle={'add'}
                                />
                            </View>
                        )}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        height: upadding * 5,
        elevation: 5,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: upadding * 1.5,
        paddingLeft: upadding * 1.5
    },
    curve: {
        position: 'absolute',
        height: upadding * 5,
        width: upadding * 5,
        elevation: 5,
        borderRadius: upadding * 2.5,
        backgroundColor: 'white',
        bottom: upadding * 2.5,
        left:'45%',
        alignItems: 'center',
        justifyContent:'center'
    }
});

export default Footer;
