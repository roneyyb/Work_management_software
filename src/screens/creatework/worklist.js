/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import {
  worklistfetch,
  worklistclearall,
  dataupdates
} from '../../actions/worklistaction';
import Items from './item';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);
const COLORS = [
  '#65b237', // green
  '#346ca5', // blue
  '#a0a0a0', // light grey
  '#ffc508', // yellow
  '#217983', // cobolt
  '#435056', // grey
  '#b23751', // red
  '#333333', // dark
  '#ff6821', // orange
  '#e3a09e', // pink
  '#1abc9c', // turquoise
  '#302614' // brown
];

class Tasklist extends Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.selected) {
      this.props.navigation.state.params.onNavigateBack(1);
      this.props.navigation.navigate('task');
      return false;
    }
    console.log(true);
    return true;
  }

  componentWillUnmount() {
    this.props.worklistclearall();
  }

  render() {
    return (
      <View style={{ flexDirection: 'column'}}>
        <View style={{ paddingBottom: upadding }}>
          <FlatList
            data={this.props.data}
            renderItem={({ item, index }) => (
            <Items
                item={item}
                color={COLORS[index % COLORS.length]}
                userid={this.props.userid}
                data={this.props.data}
                navigation={this.props.navigation}
                dataupdates={this.props.dataupdates}
            />
            )}
            keyExtractor={item => item.workid}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  let userid = '';
  if (state.signup.signup) {
    userid = state.signup.id;
  } else {
    userid = state.auth.id;
  }
  return {
    data: state.worklist.data,
    userid,
    selected: state.worklist.selected,
    errorfetch: state.worklist.errorfetch,
    errorupdate: state.worklist.errorupdate
  };
};

export default connect(
  mapStateToProps,
  {
    dataupdates,
    worklistclearall,
    worklistfetch
  }
)(Tasklist);
