/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { colorArray as COLORS } from '../../constants/Color';
import EachWork from './EachWork';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Tasklist extends Component {

  render() {
    return (
      <View style={{ flexDirection: 'column' }}>
        <View style={{ paddingBottom: upadding }}>
          <FlatList
            data={this.props.data}
            renderItem={({ item, index }) => (
              <EachWork
                item={item}
                color={COLORS[index % COLORS.length]}
                data={this.props.data}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={(item,index) => (index.toString()) }
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.worklist.state.data,
  };
};

export default connect(
  mapStateToProps,
  {}
)(Tasklist);
