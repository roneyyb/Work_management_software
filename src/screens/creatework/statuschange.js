import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Worklist from './worklist';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Title extends Component {
  render() {
    return (
      <Text style={{ fontSize: upadding*1.5, fontWeight: 'bold', color: '#8D8D8C' }}>
        {'WORK LIST'}
      </Text>
    );
  }
}
class Icons extends Component {
  render() {
    return (
      <View style={{ marginRight: upadding * 1.5 }}>
        <TouchableHighlight
            style={ {
              height: upadding * 4,
              width: upadding * 4,
              borderRadius: upadding * 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            underlayColor={'#8D8D8C33'}
            onPress={() => {
            this.props.navigation.navigate('creatework', {
                onNavigateBack: this.props.navigation.state.params.onNavigateBack
              });
            }}
          >
          <Icon
              name='add'
              size={upadding * 3}
              color='#8D8D8C'
            />
          </TouchableHighlight>
      </View>
    );
  }
}

export default class Statuschange extends Component {
  static navigationOptions = ({ navigation }) => ( 
    {
      headerTitle:() => <Title navigation={navigation} />,
      headerRight:() =>  <Icons navigation={navigation} />,
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

