/* eslint-disable react/sort-comp */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import PushNotification from 'react-native-push-notification';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Animated,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import Modal1 from './components/Modal1';
import Modal2 from './components/Modal2';
import DeleteModal from './components/generalmodalcomponent';
import Footer from './components/Footer';
import Header from './Header';
import Taskeach from './EachTask';
import Logout from '../../database/dropTable';
import { giveAllTask } from '../../database/giveAllItem';
import Datetimemodal from './components/datetimemodal';
import SearchTask from './SearchTask';
import {
    undoType,
    Refreshing,
    updateTaskInRedux,
} from '../../actions/taskActions';
import { resetRedux } from '../../actions/UserActions';
import { updateTaskInDatabase } from '../../database/updateItem';
import { deleteWorkInDatabase } from '../../database/deleteItem';
import { updateWorkListAfterCloud, deleteWorkInRedux } from '../../actions/workListActions';
import UpdateCloudData from '../../syncronusupdate/UpdateCloudData';
import { actionAfterNotUndoOnDatabase } from '../settingup/UpdatingDatabase';
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
    'Dec',
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const SCREEN_WIDTH = Dimensions.get('window').width;
const upadding = Math.round(SCREEN_WIDTH * 0.03);
const Animatedtouchablehighlight = Animated.createAnimatedComponent(
    TouchableHighlight,
);

class Taskshowup extends Component {
    constructor(props) {
        super(props);
        this.headerRef = createRef();
        this.setcolornormal = false;
        this.deleteid = [];
        this.undoinuse = 0;
        this.state = {
            visibleModal: null,
            visibleWorkModal: false,
            opacity: new Animated.Value(0),
            selected_task: '',
            task_search_enable: false,
            scrollenable: true,
            visibledatetimeModal: true,
            deleteids: [],
        };
    }

    componentDidMount() {
        UpdateCloudData(this.props.userid,this.updatinglocalworklist,this.handleRefresh);
    }

    loggingout = () => {
        UpdateCloudData(this.props.userid);
        this.props.resetRedux();
        setTimeout(() => {
            Logout();
        }, 5000);
    };

    updatinglocalworklist = worklistbackend => {
        this.props.updateWorkListAfterCloud(
            worklistbackend
        );
    };

    handleRefresh = () => {
        this.props.giveAllTask(this.props.selectedwork.workid);
    };

    renderSeparator = () => (
        <View
            style={{
                height: 1,
                width: '86%',
                backgroundColor: '#CED0CE',
                marginLeft: '14%',
            }}
        />
    );

    renderHeader = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', height: 40 }}>
            <View
                style={styles.headerStyle}>
                <Text style={{ color: '#8D8D8C', padding: 10 }}>
                    {`${this.props.title.toUpperCase()}`}
                </Text>
            </View>
        </View>
    );

    forceRerender = () => {
        this.setState({ state: this.state });
    };

    setColordefault = () => {
        this.setcolornormal = true;
        console.log("setColordefault",this.deleteid);
        this.deleteid.splice(0, this.deleteid.length);
        console.log(this.deleteid);
        this.forceRerender();
    };

    handleViewRef = ref => (this.position = ref);

    onBackdropPress = state => {
        this.setState({ visibleModal: state });
    };
    onCancelPressDeleteModal = state => {
        this.setState({ visibleWorkModal: state });
    };

    resetUndo = (deleteids, undotype, workid) => {
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 1,
        }).start();
        this.undoinuse--;
        const s = 'sdf';
       actionAfterNotUndoOnDatabase(deleteids,undotype,workid)
    };
    
    waitUndo = (deleteids, type) => {
        const workid = {
            workid: this.props.selectedwork.workid,
            workidbackend: this.props.selectedwork.workidbackend,
        };
        this.a = setTimeout(() => {
            this.resetUndo(deleteids, type, workid);
        }, 4000);
    };
    undoalreadyinuse = async (deleteids, type) => {
        await clearTimeout(this.a);
        const workid = {
            workid: this.props.selectedwork.workid,
            workidbackend: this.props.selectedwork.workid_backend,
        };
        this.resetUndo(this.state.deleteids, type, workid);
        this.setState({ deleteids: deleteids });
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
        }).start(this.waitUndo(deleteids, type));
    };

    callUndo = (deleteids, type) => {
        console.log("callUndo",deleteids);
        if (this.undoinuse === 0) {
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 500,
            }).start(this.waitUndo(deleteids, type));
            this.setState({ deleteids: deleteids});
            this.undoinuse++;
        } else {
            this.undoalreadyinuse(deleteids, type);
            this.undoinuse++;
        }
    };


    headerAction = (deleted) => {
        const { completed } = this.props.data;
        this.props.undoType([...this.deleteid], deleted ? 'Deleted' : !completed ? 'Completed' : 'Incompleted');
        this.callUndo(
          [...this.deleteid],
          deleted ? 'delete' : !completed ? 'complete' : 'incomplete',
        );
        console.log(this.deleteid);
        this.deleteid.splice(0, this.deleteid.length);
        console.log("headerAction",this.deleteid);
    };

    deletingWorkconfirmation = () => {
        const { workid, workidbackend } = this.props.selectedwork;
      
        this.props.deleteWorkInDatabase(workid,workidbackend);
        this.props.deleteWorkInRedux(workid,this.props.defaultwork);
        this.props.giveAllTask(this.props.defaultwork.workid);
    };

    renderFooter = () => {
        return <View style={{ height: 70, width: SCREEN_WIDTH }} />;
    };

    changescroll = change => {
        this._eachtask.setNativeProps({ scrollEnabled: change });
    };

    settingNotificationmodal = (visibledatetimeModal, selected_task) => {
        this.setState({ visibledatetimeModal, selected_task });
    };

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

        PushNotification.cancelLocalNotifications({
            id: this.state.selected_task.task_notificationid,
        });

        const {
            task_title: title,
            task_description: description,
            workid: workid,
            taskid: taskid,
            task_reminder: reminder,
            task_updatedAt: updatedAt,
            workid_backend: workid_backend,
        } = this.state.selected_task;

        updateTaskInDatabase({
                title,
                description,
                workid,
                taskid,
                reminder,
                updatedAt,
                workid_backend,
                notificationid,
                deadline,
		});
        this.props.updateTaskInRedux({ ...this.state.selected_task, task_deadline: deadline,task_notificationid:notificationid });
        this.setState({ visibledatetimeModal, selected_task: '' });
    }

    ondate = value => {
        this.setState({ visibledatetimeModal: value });
    };

    settaskSearch = value => {
        this.setState({ task_search_enable: value });
    };

    undoaction = async () => {
        console.log("Undo Pressed");
       
        await clearTimeout(this.a);
        await Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 100,
        }).start();
        this.undoinuse = 0;
        this.setState({ deleteids: [] });
        await this.props.giveAllTask(
            this.props.selectedwork.workid
        );
        if (this.state.task_search_enable) {
            this.searchtask.undoaction();
        }
    };
    setfootertouch = value => {
        this.footer.setpointer(value);
    };


    render() {
        const { navigation, data } = this.props;
        const tasklistlength = data.data.length;
        const undosize = this.state.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
        });

        return (
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}
            accessible>
            {tasklistlength === 0 ? (
              <View
                style={[
                  styles.fSlatList,
                  {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 30,
                  },
                ]}>
                <Text style={{color: '#8D8D8C66', fontSize: 16}}>
                  {'No Task Here'}
                </Text>
                {this.props.data.completed ? (
                  <Text />
                ) : (
                  <Text style={{color: '#8D8D8C66', fontSize: 16}}>
                    {"Look's like it is a fresh start all the best!!"}
                  </Text>
                )}
              </View>
            ) : (
              <FlatList
                data={this.props.data.data}
                renderItem={({item, index}) => {
                  return (
                    <Taskeach
                      callUndo={this.callUndo}
                      settingNotificationmodal={
                        this.settingNotificationmodal
                      }
                      setcolornormal={this.setcolornormal}
                      index={index}
                      Searchtask={false}
                      navigation={navigation}
                      deleteid={this.deleteid}
                      items={item}
                      byIds={this.props.byIds}
                      last={tasklistlength}
                      setColordefault={this.setColordefault.bind(
                        this,
                      )}
                      handleRefresh={this.handleRefresh.bind(
                        this,
                      )}
                      changeflip={count => {
                        this.headerRef.current.changeflip(
                          count,
                        );
                      }}
                      Deletetaskcountnumber={count => {
                        this.headerRef.current.deleteTaskCountNumber(
                          count,
                        );
                      }}
                      changescroll={this.changescroll}
                    />
                  );
                }}
                ref={component => (this._eachtask = component)}
                contentContainerStyle={styles.flatList}
                scrollEnabled
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={this.renderFooter}
                onRefresh={this.handleRefresh.bind(this)}
                refreshing={this.props.state.refreshing}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={6}
              />
            )}

            <Footer
              ref={refer => {
                this.footer = refer;
              }}
              navigation={this.props.navigation}
              callUndo={this.props.callUndo}
              completed={this.props.data.completed}
              onBackdropPress={this.onBackdropPress}
            />
            <Header
              ref={this.headerRef}
              title={this.props.selectedwork.work_title}
              headerAction={this.headerAction.bind(this)}
              setpointer={this.setfootertouch}
              settaskSearch={this.settaskSearch}
              navigation={navigation}
              setColordefault={this.setColordefault}
            />
            {this.state.task_search_enable ? (
              <SearchTask
                ref={searchtask => {
                  this.searchtask = searchtask;
                }}
                tasklist={this.props.data.data}
                byIds={this.props.byIds}
                callUndo={this.callUndo}
                settaskSearch={this.settaskSearch}
                settingNotificationmodal={this.settingNotificationmodal}
                navigation={navigation}
                deleteid={this.deleteid}
                handleRefresh={this.handleRefresh.bind(this)}
                changescroll={this.changescroll}
              />
            ) : (
              <View />
            )}
            <Animated.View
              style={[
                {opacity: this.state.opacity},
                styles.undoContainer,
              ]}>
              <Animated.Text
                style={[styles.undoCountText, {opacity: undosize}]}>
                {`${this.props.state.count} ${
                  this.props.state.undoType
                } `}
              </Animated.Text>
              <Animatedtouchablehighlight
                style={styles.undoButton}
                underlayColor={'#87cefa33'}
                onPress={() => {
                  this.undoaction();
                }}>
                <Animated.Text
                  style={{
                    fontSize: upadding * 1.3,
                    opacity: undosize,
                    fontWeight: 'bold',
                    color: '#FFA500',
                  }}>
                  {'Undo'}
                </Animated.Text>
              </Animatedtouchablehighlight>
            </Animated.View>
            <Modal
              isVisible={this.state.visibleModal === 1}
              useNativeDriver
              onBackdropPress={() => {
                this.onBackdropPress(null);
              }}
              style={styles.Modal2}>
              <Modal2
                navigation={this.props.navigation}
                email={this.props.email}
                Logout={this.loggingout}
                onBackdropPress={this.onBackdropPress}
              />
            </Modal>
			
            <DeleteModal
              visibleornot={this.state.visibleWorkModal}
              cancelFunction={this.onCancelPressDeleteModal}
              actiononbuttonpress={this.deletingWorkconfirmation}
              title={'Deleting the work'}
              message={
                'This action cannot be undo. If you delete the work all your related task will be deleted.'
              }
              Rightbuttontitle={'Cancel'}
              Leftbuttontitle={'Delete'}
            />
            <Modal
              isVisible={this.state.visibledatetimeModal === 1}
              useNativeDriver>
              <Datetimemodal
                onChangeDeadline={this.onChangeDeadline}
                setOpacity={this.setOpacity}
                onDate={this.ondate}
                title={this.state.selected_task.task_title}
                description={this.state.selected_task.task_description}
              />
            </Modal>
            <Modal
              isVisible={this.state.visibleModal === 2}
              useNativeDriver
              onBackdropPress={() => {
                this.onBackdropPress(null);
              }}
              style={{justifyContent: 'flex-end', margin: 0}}>
              <Modal1
                onCancelPressDeleteModal={this.onCancelPressDeleteModal}
                navigation={this.props.navigation}
                onBackdropPress={this.onBackdropPress}
              />
            </Modal>
          </View>
        );
    }
}

const mapStatetoprops = state => {
   return {
        byIds: state.task.byIds,
        data: state.task.data,
        state: state.task.state,
        selectedwork:state.worklist.state.selectedwork,
        userid: state.user._id,
        defaultwork: state.user.work
    };
};

export default connect(
    mapStatetoprops,
    {
        undoType,
        resetRedux,
        deleteWorkInRedux,
        deleteWorkInDatabase,
        giveAllTask,
        updateTaskInRedux,
        updateTaskInDatabase,
        updateWorkListAfterCloud,
        Refreshing,
    },
)(Taskshowup);

const styles = StyleSheet.create({
    flatList: {
        paddingTop: upadding * 4.5,
    },
    Modal2: {
        justifyContent: 'flex-end',
        margin: 0,
        borderRadius: upadding * 1.5,
    },
    undoButton: {
        elevation: 24,
        height: upadding * 3,
        width: upadding * 4,
        borderRadius: upadding / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    undoContainer: {
        position: 'absolute',
        bottom: upadding * 9,
        alignSelf: 'center',
        padding: upadding * 1.5,
        height: upadding * 4,
        width: SCREEN_WIDTH - upadding * 1.5,
        borderRadius: upadding / 2,
        elevation: upadding * 2,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    undoCountText: {
        fontSize: upadding * 1.2,
        color: 'white',
    },
    headerStyle: {
        elevation: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        backgroundColor: 'white',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    }

});