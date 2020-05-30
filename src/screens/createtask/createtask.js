import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Datetimemodal from './components/datetimemodal';

import {
  onTitlechange,
  onDescriptionchange,
  onPresscreate,
  clearall,
  setState,
  handleDateTimePicker,
  dateTimePicker,
  setnotification,
  onPressdeletetask,
  onDeadlinechange
} from '../../actions/createtaskactions';
import { onPressupdate } from '../../actions/updatingtaskaction';
import { createTask } from '../../database/createqueries';
import { updateTask } from '../../database/updatequeries';
import { undoType } from '../../actions/taskshowaction';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

const paddingE = Math.round(SCREEN_WIDTH * 0.05);
const whichday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
class Createtask extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: () => 
      <Text
        style={{
          fontSize: upadding * 1.5,
          color: '#8D8D8C',
          fontWeight: 'bold'
        }}
      >
        {`${navigation.getParam('update',false) ? 'UPDATE TASK' : 'CREATE TASK'}`}
      </Text>
    ,
    headerRight: () => 
      <View style={{ flexDirection: 'row', marginRight: upadding }}>
        {navigation.getParam('update', false) ? (
          <TouchableOpacity
            onPress={navigation.getParam('deleting')}
            style={{ marginRight: upadding }}
          >
            <MaterialIcons name='delete' size={upadding * 2} color='#2B65EC' />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    ,
    headerTintColor: '#8D8D8C'
  });

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.cordinate = 0;
    if (navigation.getParam('update', false)) {
      const title = navigation.getParam('title', props.title);
      const description = navigation.getParam('description', props.description);
      const id = navigation.getParam('id', props.id);
      const update = navigation.getParam('update', props.update);
      const deadline = navigation.getParam('deadline', props.deadline);
      const notificationid = navigation.getParam(
        'notificationid',
        props.notificationid
      );
      const reminder = navigation.getParam('reminder', props.reminder);
      const taskid_backend = navigation.getParam(
        'taskidbackend',
        props.taskid_backend
      );
      if (deadline.length > 25) {
        props.setState({
          title,
          description,
          id,
          update,
          taskid_backend,
          notificationid: 0,
          deadline: 'Add Task Deadline For Completion',
          reminder: 'Add Task Reminder For Completion'
        });
      } else {
        props.setState({
          title,
          description,
          id,
          update,
          deadline,
          taskid_backend,
          notificationid,
          reminder
        });
      }
    }
    this.configure();
    this.focustextinput = true;
    this.deletepress = false;
    this.state = {
      opacity: 0,
      visibledatetimeModal: 0,
      visibleremindermodal: 0,
      date_modal_opacity: 1,
      reminder_modal_opacity: 1
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      deleting: this.onPressdelete.bind(this)
    });
    if (!this.props.navigation.getParam('update', false)) {
      this.props.clearall();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.focustextinput === true &&
      nextProps.navigation.getParam('update', false) === false
    ) {
      this.focustextinput = false;
      return true;
    }
    
    return true;
  }

  onDayPress = day => {
    this.setState({
      selectedDate: day.dateString
    });
  };
  ondate = value => {
    if (this.props.title.length === 0) {
    } else {
      this.setState({ visibledatetimeModal: value });
    }
  };

  visibleReminderModal = value => {
    this.setState({ visibleremindermodal: value });
  };
  setOpacity = value => {
    this.setState({ date_modal_opacity: value });
  };

  setReminderModalOpacity = value => {
    this.setState({ reminder_modal_opacity: value });
  };

  onPressdelete() {
    const { navigation } = this.props;

    const { Searchtask } = navigation.state.params;
    if (Searchtask) {
      const { callUndo, settaskSearch } = navigation.state.params;
      this.props.undoType(
        this.props.tasklist,
        [
          {
            taskid: this.props.taskid,
            taskid_backend: this.props.taskid_backend
          }
        ],
        'Deleted'
      );
      this.deletepress = true;
      settaskSearch(false);
      this.props.navigation.navigate('task');
      callUndo(
        [
          {
            taskid: this.props.taskid,
            taskid_backend: this.props.taskid_backend
          }
        ],
        'delete'
      );
    } else {
      const {
        deleteid,
        changeflip,
        Deletetaskcountnumber,
        callUndo
      } = navigation.state.params;

      const index = deleteid.findIndex(obj => {
        return obj.taskid === this.props.taskid;
      });
      if (index > -1) {
        this.deletepress = true;

        deleteid.splice(index, 1);
        if (deleteid.length === 0) {
          this.props.undoType(
            this.props.tasklist,
            [
              {
                taskid: this.props.taskid,
                taskid_backend: this.props.taskid_backend
              }
            ],
            'Deleted'
          );
          changeflip(0);
          this.props.navigation.navigate('task');
          callUndo(
            [
              {
                taskid: this.props.taskid,
                taskid_backend: this.props.taskid_backend
              }
            ],
            'delete'
          );
          return;
        }
        Deletetaskcountnumber(deleteid.length);
        this.props.undoType(
          this.props.tasklist,
          [
            {
              taskid: this.props.taskid,
              taskid_backend: this.props.taskid_backend
            }
          ],
          'Deleted'
        );
        this.props.navigation.navigate('task');
        callUndo(
          [
            {
              taskid: this.props.taskid,
              taskid_backend: this.props.taskid_backend
            }
          ],
          'delete'
        );
        return;
      }

      this.props.undoType(
        this.props.tasklist,
        [
          {
            taskid: this.props.taskid,
            taskid_backend: this.props.taskid_backend
          }
        ],
        'Deleted'
      );
      this.deletepress = true;
      this.props.navigation.navigate('task');
      callUndo(
        [
          {
            taskid: this.props.taskid,
            taskid_backend: this.props.taskid_backend
          }
        ],
        'delete'
      );
    }
  }

  onChangeDeadline = (dates, time, visibledatetimeModal, notificationid) => {
    const date = new Date(dates);
    const day = whichday[date.getDay()];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    if (time !== 'Select Deadline Time') {
      if (year > new Date().getFullYear()) {
        var deadline = `${day}, ${date.getDate()} ${month}, ${date.getFullYear()}, ${time}`;
      } else {
        var deadline = `${day}, ${date.getDate()} ${month}, ${time}`;
      }
    } else {
      if (year > new Date().getFullYear()) {
        var deadline = `${day}, ${date.getDate()} ${month}, ${date.getFullYear()}`;
      } else {
        var deadline = `${day}, ${date.getDate()} ${month}`;
      }
    }
    this.setState({ visibledatetimeModal });

    if (this.props.notificationid !== 0) {
      this.cancelNotification(
        this.props.notificationid,
        notificationid,
        deadline
      );
    } else {
      this.props.setnotification({ notificationid, deadline });
    }
  };
  configure() {
    PushNotification.configure({
      onRegister: () => {}, //this._onRegister.bind(this),

      onNotification: () => {}, //this._onNotification,


      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: false,

      
      requestPermissions: true,
    });
  }

  cancelNotification = (
    localNotificationId,
    notificationid = 0,
    deadline = 'Add Task Deadline For Completion'
  ) => {
    PushNotification.cancelLocalNotifications({id:localNotificationId});
    this.props.setnotification({ notificationid, deadline });
  };
  onChangetitle(title) {
    this.props.onTitlechange(title);
  }
  onChangedescription(description) {
    this.props.onDescriptionchange(description);
  }

  componentWillUnmount() {
    if (!this.deletepress) {
      const { navigation } = this.props;
      if (navigation.getParam('Searchtask', false)) {
        const a = navigation.getParam('settaskSearch');
        a(false);
      }
      const data = {
        title: this.props.title,
        description: this.props.description,
        date: this.props.date,
        workid: this.props.workid,
        taskid: this.props.taskid,
        deadline: this.props.deadline,
        reminder: this.props.reminder,
        notificationid: this.props.notificationid,
        updatedAt: this.props.date,
        workid_backend: this.props.workid_backend
      };

      const { onNavigateBack } = navigation.state.params;
      if (this.props.update) {
        const { props } = this;
        const title = navigation.getParam('title', props.title);
        const description = navigation.getParam(
          'description',
          props.description
        );
        const deadline = navigation.getParam('deadline', props.deadline);
        const notificationid = navigation.getParam(
          'notificationid',
          props.notificationid
        );

        if (
          data.title !== title ||
          data.description !== description ||
          data.notificationid !== notificationid
        ) {
          this.props.updateTask(data, onNavigateBack);
        }
        this.props.clearall();
      } else {
        if (this.props.title.length > 0 || this.props.description.length > 0) {
          this.props.createTask(data, onNavigateBack);
          this.props.clearall();
        }
      }
    } else {
      this.props.clearall();
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:'white',
        }}
      >
        {/* <KeyboardAvoidingView
          style={{
            flex: 1
          }}
          behavior='padding'
          //keyboardVerticalOffset={height + upadding * 3}
        > */}
          <ScrollView
            style={{
              flex: 1,
              paddingLeft: upadding * 2,
              paddingBottom: upadding * 4,
              paddingTop: upadding
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: upadding * 1.3,
                  fontWeight: '600',
                  marginBottom: upadding
                }}
              >
                {this.props.work.toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent:'center',
                marginRight: upadding * 2
              }}
            >
              <View style={styles.firstrcontainer}>
                <MaterialIcons
                  name='title'
                  size={upadding * 1.5}
                  width={1}
                  color='black'
                />
              </View>

              <TextInput
                placeholder={'Add Task'}
                value={this.props.title}
                onChangeText={this.onChangetitle.bind(this)}
                style={{
                  flex: 9,
                  fontSize: upadding * 1.2,
                  fontWeight: 'bold'
                }}
                autoCorrect={false}
                
                autoFocus={true}
                multiline
                placeholderTextColor='#8D8D8C'
                ref={c => {
                  this._input = c;
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: upadding,
                justifyContent:'center',
                marginRight: upadding * 2
              }}
            >
              <View style={styles.firstrcontainer}>
                <MaterialIcons
                  name='description'
                  size={upadding * 1.5}
                  color='black'
                />
              </View>
              <TextInput
                placeholder={'Add Description'}
                value={this.props.description}
                style={{
                  flex: 9,
                  fontSize: upadding * 1.1,
                  color: '#8D8D8C'
                }}
                onFocus={() => this.setState({ opacity: 1 })}
                onBlur={() => this.setState({ opacity: 0 })}
                autoCorrect={false}
                multiline
                placeholderTextColor='#8D8D8C'
                onChangeText={this.onChangedescription.bind(this)}
              />
            </View>
            <TouchableHighlight
              onPress={() => {
                this.ondate(1);
              }}
              underlayColor={'#8D8D8C0F'}
              style={styles.touchablehighlightstyle}
            >
              <View style={styles.remindercontainer}>
                <View style={styles.firstrcontainer}>
                  <MaterialIcons
                    name='alarm'
                    size={upadding * 1.5}
                    color='black'
                  />
                </View>
                <View
                  style={[
                    styles.secondrcontainer,
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }
                  ]}
                >
                  <Text
                    style={{
                      color: '#8D8D8C',
                      flex: 18,
                      fontSize: upadding * 1.2,
                      fontWeight: 'bold'
                    }}
                  >
                    {this.props.deadline}
                  </Text>
                  {this.props.notificationid !== 0 ? (
                    <TouchableHighlight
                      onPress={() => {
                        this.cancelNotification(this.props.notificationid);
                      }}
                      style={{ flex: 2 }}
                      underlayColor={null}
                    >
                      <MaterialIcons
                        name='clear'
                        size={paddingE}
                        color='#8D8D8C'
                      />
                    </TouchableHighlight>
                  ) : (
                    <View />
                  )}
                </View>
              </View>
            </TouchableHighlight>
            <View style={{ height: upadding * 4 }} />
          </ScrollView>
        <Modal
          isVisible={this.state.visibledatetimeModal === 1}
          useNativeDriver
        >
          <Datetimemodal
            onDate={this.ondate}
            setOpacity={this.setOpacity}
            onChangeDeadline={this.onChangeDeadline}
            visibleReminderModal={this.visibleReminderModal}
            title={this.props.title}
            description={this.props.description}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasklist: state.show.data,
    title: state.task.title,
    notificationid: state.task.notificationid,
    reminder: state.task.reminder,
    deadline: state.task.deadline,
    description: state.task.description,
    error: state.task.error,
    createsuccess: state.task.createsuccess,
    update: state.task.update,
    taskid: state.task.id,
    taskid_backend: state.task.taskid_backend,
    deletesuccess: state.task.deletesuccess,
    message: state.task.message,
    selected: state.worklist.selectedwork.work_selected,
    workid: state.worklist.selectedwork.workid,
    workid_backend: state.worklist.selectedwork.workid_backend,
    work: state.worklist.selectedwork.work_title,
    updatesuccess: state.task.updatesuccess,
    date: state.task.date,
    visible: state.task.visible
  };
};

export default connect(mapStateToProps, {
  undoType,
  updateTask,
  onPressdeletetask,
  onTitlechange,
  onDescriptionchange,
  onPresscreate,
  onDeadlinechange,
  setnotification,
  onPressupdate,
  clearall,
  setState,
  createTask,
  handleDateTimePicker,
  dateTimePicker
})(Createtask);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  touchablehighlightstyle: {
    height: upadding * 3,
    marginBottom: upadding,
    justifyContent: 'center',
    borderRadius: 3,
    marginRight: upadding * 2
  },
  remindercontainer: {
    flex: 1,
    flexDirection: 'row',
    height: upadding * 2
  },
  firstrcontainer: {
    flex: 1,
    justifyContent: 'center'
  },
  secondrcontainer: {
    flex: 9,
    backgroundColor: '#2B65EC0F',
    borderRadius: 3,
    justifyContent: 'center',
    paddingLeft: upadding
  }
});
