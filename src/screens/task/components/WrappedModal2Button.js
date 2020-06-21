import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const upadding = Math.round(SCREEN_WIDTH * 0.03);

export default class WrappedModalButton extends Component {
  render() {
    const {iconTitle, onPress, buttonText, disabled, style} = this.props;
    return (
      <TouchableOpacity
        underlayColor={'#8D8D8C'}
        activeOpacity={0.8}
        style={[styles.container,{backgroundColor:style.backgroundColor || 'white', borderBottomWidth: style.borderBottomWidth || 0.4}]}
        onPress={() => {
          onPress();
        }}
        disabled={disabled||false}
      >
        <MaterialIcons
          name={iconTitle}
          size={style.iconSize || upadding * 2.5}
          width={0}
          color="grey"
          style={{marginLeft: upadding * 1.5}}
          light
        /> 
        <Text style={[styles.buttonText,{fontSize:style.fontSize || upadding*1.2}]}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: upadding * 6,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    marginLeft: upadding * 1.5,
    color: '#8D8D8C',
    fontSize: upadding * 1.2,
  },
});
