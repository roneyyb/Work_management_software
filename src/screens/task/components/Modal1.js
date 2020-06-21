import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {giveAllTask} from '../../../database/giveAllItem';
import {connect} from 'react-redux';
import WrappedModal1Button from './WrappedModal1Button';
import WrappedModal2Button from './WrappedModal2Button';
const SCREEN_WIDTH = Dimensions.get('window').width;
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Modal1 extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  render() {
    const {
      sortBy,
      completed,
      workid,
      giveAllTask,
      onBackdropPress,
      title,
      handleRefresh,
      onCancelPressDeleteModal,
      workidbackend,
      defaultworkid,
    } = this.props;
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: upadding,
          borderTopRightRadius: upadding,
        }}>
        <View style={styles.containerStyle}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textStyle}>{'Task'}</Text>
          </View>
          <WrappedModal1Button
            onPress={() => {
              if (!completed) {
                giveAllTask(workid, true, sortBy);
              }
              onBackdropPress(false);
            }}
            completed={completed}
            buttonTitle={'Completed'}
          />
          <WrappedModal1Button
            onPress={() => {
              if (completed) {
                giveAllTask(workid, false, sortBy);
              }
              onBackdropPress(false);
            }}
            completed={!completed}
            buttonTitle={'Incompleted'}
          />
        </View>

        <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>{'Sort By'}</Text>
          <WrappedModal1Button
            onPress={() => {
              if (sortBy === 'myOrder') {
                giveAllTask(workid, completed, 'desc');
              }
              onBackdropPress(false);
            }}
            completed={sortBy === 'desc'}
            buttonTitle={'Date and Time'}
          />
          <WrappedModal1Button
            onPress={() => {
              if (sortBy === 'desc') {
                giveAllTask(workid, completed, 'myOrder');
              }
              onBackdropPress(false);
            }}
            completed={sortBy === 'myOrder'}
            buttonTitle={'My order'}
          />
        </View>
        <WrappedModal2Button
          onPress={() => {
            this.props.navigation.navigate('creatework', {
              update: true,
              onNavigateBack: handleRefresh,
              work: title,
              workid: workid,
            });
            onBackdropPress(false);
          }}
          style={{
            fontSize: upadding * 1.2,
            iconSize: upadding * 2,
            borderBottomWidth: 0,
          }}
          iconTitle={'edit'}
          buttonText={'Rename work'}
        />
        <WrappedModal2Button
          onPress={() => {
            onBackdropPress(false);
            onCancelPressDeleteModal(1);
          }}
          disabled={workidbackend === defaultworkid}
          style={{
            backgroundColor:
              workidbackend === defaultworkid ? '#dddddd' : 'white',
            fontSize: upadding * 1.2,
            iconSize: upadding * 2,
            borderBottomWidth: 0,
          }}
          iconTitle={'delete'}
          buttonText={'Delete work'}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    workid: state.worklist.state.selectedwork.workid,
    title: state.worklist.state.selectedwork.work_title,
    workidbackend: state.worklist.state.selectedwork.workid_backend,
    userid: state.user.user._id,
    defaultworkid: state.user.user.work._id,
    sortBy: state.task.data.sortBy,
    completed: state.task.data.completed,
  };
};
export default connect(
  mapStateToProps,
  {
    giveAllTask,
  },
)(Modal1);

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'column',
    paddingBottom: upadding,
    borderTopLeftRadius: upadding,
    borderTopRightRadius: upadding,
    borderBottomWidth: upadding * 0.03,
    borderColor: 'grey',
  },
  textStyle: {
    marginLeft: upadding * 1.5,
    fontSize: upadding * 1.2,
    fontWeight: 'bold',
    marginTop: upadding * 1.5,
    color: '#8D8D8C',
  },
  touchopacityStyle: {
    width: SCREEN_WIDTH,
    marginLeft: upadding * 3,
    marginTop: upadding * 1.5,
  },
});
