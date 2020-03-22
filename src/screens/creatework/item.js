import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);


class Item extends Component {
 
  onPresstop() {
    this.props.dataupdates(
      this.props.data,
      this.props.item.workid
    );
  }
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height:upadding * 4,
          marginTop:upadding/2,
          paddingRight: upadding * 5
            }}
      >
        <View
          style={{
            backgroundColor: this.props.item.work_selected === 1
              ? `${this.props.color}66`
              : 'white',
            flexDirection: 'row',
            flex: 1,
            borderTopRightRadius: upadding * 2,
            borderBottomRightRadius: upadding * 2
          }}
        >
          <View
            style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}
          >
            <View
                  style={{
                    height: upadding * 3,
                    width: upadding * 3,
                    borderRadius: upadding * 1.5,
                    backgroundColor: `${this.props.color}CC`,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
            >
                {this.props.item.work_title.length!==0?
               ( <Text style={{ color: 'white', fontSize: upadding * 1.5 }}>{`${
                    this.props.item.work_title[0]
    }`}</Text>):(
                  <View/>
    )}
                </View>
          </View>
          <View style={{ flex: 8, justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={this.onPresstop.bind(this)}
              style={{
                height: 30,
                marginLeft: 8
              }}
            >
              <Text
                style={{
                  fontSize: upadding * 1.2,
                  fontWeight: 'bold',
                  color: this.props.item.work_selected
                    ? `${this.props.color}`
                    : '#8D8D8C'
                }}
              >{`${this.props.item.work_title}`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Item;
