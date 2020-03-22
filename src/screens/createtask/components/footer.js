import React, { Component } from 'react';
import { View, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = { pointer: false};
  }

  setpointer = (value) => {
   this.setState({pointer:value});
  }

  render() {
    return (
      <View 
      >
        <View
          style={[
            styles.backgroundContainer,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: upadding * 1.5,
              paddingLeft: upadding * 1.5
            }
          ]}
        >
          <TouchableHighlight
            style={{ height: upadding * 4, width: upadding * 4, borderRadius: upadding * 2, alignItems: 'center', justifyContent: 'center' }}
            underlayColor={'#8D8D8C66'}
            onPress={() => {
              this.props.onBackdropPress(1);
            }}
            disabled={this.state.pointer}
          >
            <MaterialIcons
              name='list'
              size={upadding *2}
              color='grey'
              light
            />
          </TouchableHighlight>
          <TouchableHighlight
           style={{ height: upadding * 4, width: upadding * 4, borderRadius: upadding * 2, alignItems: 'center', justifyContent: 'center' }}
           underlayColor={'#8D8D8C33'}
            onPress={() => {
              this.props.onBackdropPress(2);
            }}
            disabled={this.state.pointer}
          >
            <MaterialIcons
              name='more-vert'
              size={upadding *2}
              color='grey'
              light
            />
          </TouchableHighlight>
        </View>
        {this.props.completed ? <View/>:
        (<View>
        <View style={styles.curve}>
          <TouchableHighlight
          underlayColor={null}
            style={{ flex: 1 }}
            onPress={() => {
              this.props.navigation.navigate('createtask', {
                callUndo: this.props.callUndo,
                onNavigateBack: this.props.navigation.getParam('onNavigateBack')
              })
            }
            }
            
            disabled={this.state.pointer}
          >
            <View
              style={{
                backgroundColor: 'white',
                elevation: 1,
                height: upadding * 5,
                width: upadding * 5,
                flex: 1,
                borderRadius:upadding * 2.5,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MaterialIcons
                name='add'
                size={upadding * 3.5}
                color='#8D8D8C'
              />
            </View>
          </TouchableHighlight>
        </View>
        </View>)}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    height: upadding * 5,
    width: SCREEN_WIDTH,
    elevation: 10,
    bottom: 0,
    backgroundColor: 'white'
  },

  appMenu: {
    backgroundColor: '#8D8D8C66',
    height: upadding * 5,
    width: upadding * 5,
    elevation: 10,
    borderRadius:upadding * 2.5,
    position: 'absolute',
    bottom: upadding * 2,
    marginLeft: SCREEN_WIDTH / 2 - upadding *2
  },

  curve: {
    position: 'absolute',
    height: upadding * 5,
    width: upadding * 5,
    elevation:15 ,
    borderRadius: upadding * 2.5,
    backgroundColor: 'white',
    bottom: upadding * 2.5,
    marginLeft: SCREEN_WIDTH / 2 - upadding * 2
  }
});

export default Footer;
