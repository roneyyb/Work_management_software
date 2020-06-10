import React, {Component} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class extends Component {
  render() {
    const {
      iconTitle,
      placeholder,
      value,
      onChangeText,
      autoCorrect,
      autoFocus,
      ref,
    } = this.props;
    return (
      <View style={styles.textInput}>
        <View style={styles.firstrcontainer}>
          <MaterialIcons name={iconTitle} size={18} width={1} color="black" />
        </View>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={text => {
            onChangeText(text);
          }}
          style={styles.textInputBox}
          autoCorrect={autoCorrect || false}
          autoFocus={autoFocus || false}
          multiline
          placeholderTextColor="#8D8D8C"
          ref={ref}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 24,
  },
  textInputBox: {
    flex: 9,
    fontSize: 14,
    color: '#8D8D8C',
  },
  deadlineText: {
    color: '#8D8D8C',
    flex: 18,
    fontSize: 24,
    fontWeight: 'bold',
  },
  firstrcontainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
