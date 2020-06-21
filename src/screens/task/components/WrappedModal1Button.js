import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
    Dimensions,
  StyleSheet
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const upadding = Math.round(SCREEN_WIDTH * 0.03);

export default class WrappedModalButton extends Component {
    render() {
        const { buttonTitle, onPress, completed, disabled } = this.props;
        return (
          <TouchableOpacity
                onPress={() => {
                    onPress();
                }}
                disabled={disabled || false}
            style={styles.touchopacityStyle}
            >
            <Text
                    style={{
                        fontSize: upadding * 1.2,
                        fontWeight: completed? 'bold' : 'normal',
                        color: completed === true ? 'black' : '#8D8D8C',
                    }}
                >
              {buttonTitle}
            </Text>
          </TouchableOpacity>
        );
  }
}

const styles = StyleSheet.create({
    touchopacityStyle: {
		width: SCREEN_WIDTH,
		marginLeft: upadding * 3,
		marginTop: upadding * 1.5
	},
});

