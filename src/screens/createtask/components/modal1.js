import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Modal1 extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ backgroundColor: 'white' }}>
        <View
          style={styles.containerStyle}
        >
          <Text
            style={styles.textStyle}
          >
            {'Task'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (this.props.completed === false) {
                this.props.Makeremoterequest(
                  true,
                  this.props.workid,
                  this.props.sortBy
                );
              }
              this.props.onBackdropPress(false);
            }}
            style={styles.touchopacityStyle}
          >
            <Text
              style={{
                fontSize: upadding * 1.2,
                fontWeight: this.props.completed === true ? 'bold' : 'normal',
                color: this.props.completed === true ? 'black' : '#8D8D8C'
              }}
            >
              {'Completed'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.props.completed === true) {
                this.props.Makeremoterequest(
                  false,
                  this.props.workid,
                  this.props.sortBy
                );
              }
              this.props.onBackdropPress(false);
            }}
            style={styles.touchopacityStyle}
          >
            <Text
              style={{
                fontSize: upadding  * 1.2,
                color: this.props.completed === false ? 'black' : '#8D8D8C',
                fontWeight: this.props.completed === false ? 'bold' : 'normal'
              }}
            >
              {'Incompleted'}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={styles.containerStyle}
        >
          <Text
            style={styles.textStyle}
          >
            {'Sort By'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (this.props.sortBy === 'myOrder') {
                this.props.Makeremoterequest(
                  this.props.completed,
                  this.props.workid,
                  'desc'
                );
              }
              this.props.onBackdropPress(false);
            }}
            style={{ width: SCREEN_WIDTH, marginLeft: upadding * 3, marginTop: upadding * 1.5 }}
          >
            <Text
              style={{
                fontSize: upadding * 1.2,
                color: this.props.sortBy === 'desc' ? 'black' : '#8D8D8C',
                fontWeight: this.props.sortBy === 'desc' ? 'bold' : 'normal'
              }}
            >
              {'Date and Time'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (this.props.sortBy === 'desc') {
                this.props.Makeremoterequest(
                  this.props.completed,
                  this.props.workid,
                  'myOrder'
                );
              }
              this.props.onBackdropPress(false);
            }}
            style={styles.touchopacityStyle}
          >
            <Text
              style={{
                fontSize: upadding * 1.2,
                color: this.props.sortBy === 'myOrder' ? 'black' : '#8D8D8C',
                fontWeight: this.props.sortBy === 'myOrder' ? 'bold' : 'normal'
              }}
            >
              {'My order'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          underlayColor={'#8D8D8C'}
          style={{
            height: upadding * 5,
            flexDirection: 'row',
            width: SCREEN_WIDTH,
            alignItems: 'center'
          }}
          onPress={() => {
            this.props.navigation.navigate('creatework', {
              update: true,
              onNavigateBack: this.props.handleRefresh,
              work: this.props.title,
              workid: this.props.workid
            });
            this.props.onBackdropPress(false);
          }}
        >
          <MaterialIcons
            name='edit'
            size={upadding * 2}
            color='grey'
            style={{ marginLeft: upadding * 1.5 }}
            light
          />
          <Text style={{ marginLeft: upadding * 1.5, color: '#8D8D8C' }}>
            {'Rename Work'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          underlayColor={'#8D8D8C'}
          style={{
            height: upadding * 5,
            flexDirection: 'row',
            width: SCREEN_WIDTH,
            alignItems: 'center',
            backgroundColor:
              this.props.workidbackend === this.props.defaultworkid
                ? '#8D8D8C33'
                : 'white'
          }}
          onPress={() => {
            this.props.onBackdropPress(false);
            this.props.onCancelPressDeleteModal(1);
          }}
          disabled={this.props.workidbackend === this.props.defaultworkid}
        >
          <MaterialIcons
            name='delete'
            size={upadding * 2}
            color='grey'
            style={{ marginLeft: upadding * 1.5 }}
            light
          />
          <Text style={{ marginLeft: upadding * 1.5, color: '#8D8D8C' }}>
            {'Delete Work'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Modal1;

const styles = StyleSheet.create({
  containerStyle:{
    flexDirection: 'column',
    padding: upadding,
    width: SCREEN_WIDTH,
    borderTopLeftRadius:upadding,
    borderTopRightRadius:upadding,
    borderBottomWidth: upadding * 0.03,
    borderColor: 'grey'
  },
  textStyle:{
    marginLeft: upadding * 1.5,
    fontSize: upadding * 1.2,
    fontWeight: 'bold',
    marginTop: upadding * 1.5,
    color: '#8D8D8C'
  },
  touchopacityStyle:{
     width: SCREEN_WIDTH, 
     marginLeft: upadding  * 3,
      marginTop: upadding * 1.5
    },

  
});