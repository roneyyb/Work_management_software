/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    Animated,
    PanResponder,
    TouchableHighlight,
    LayoutAnimation,
    UIManager,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import FlipCard from 'react-native-flip-card';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colorArray } from '../../constants/Color';
import { undoType } from '../../actions/taskActions';
import PushNotification from 'react-native-push-notification';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;
const SWIPE_OUT_DURATION = 100;


const AnimateTouchablehightlight = Animated.createAnimatedComponent(
    TouchableHighlight,
);
const upadding = Math.round(SCREEN_WIDTH * 0.03);
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
class Return_background extends Component {
    state = { name: 'done', paddingLeft: 0, paddingLeft: 0 };

    changeView = (name, paddingLeft) => {
        this.setState({ name, paddingLeft });
    };

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    paddingLeft: this.state.paddingLeft,
                }}>
                {this.state.name === 'done' ? (
                    <MaterialIcons name={this.state.name} size={30} color={'white'} />
                ) : (
                        <MaterialIcons name={'delete'} size={30} color={'white'} />
                    )}
            </View>
        );
    }
}

class Taskeach extends Component {
    constructor(props) {
        super(props);
        this.front = 0;
        this.touched1 = true;
        this.touched2 = true;
        this.touched = true;
        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (
                    (gestureState.dx > upadding * 1.25 ||
                        gestureState.dx < -upadding * 1.25) &&
                    this.front === 0 && !this.props.taskTouchDisable
                ) {
                    this.props.changescroll(false);
                    return true;
                }
                return false;
            },
            onPanResponderTerminationRequest: (evt, gestureState) => {
                return false;
            },
            onPanResponderMove: (event, gesture) => {
                if (gesture.dx > 0 || (gesture.dx < 0 && this.front === 0)) {
                    if (this.touched) {
                        this.animated_card.setNativeProps({
                            elevation: 1,
                            borderRadius: 8,
                        });
                        this.touched = false;
                    }
                    if (gesture.dx > 0 && this.touched1) {
                        this.touched1 = false;
                        this.touched2 = true;
                        this.return_background.changeView('done', 20);
                        this.view_change.setNativeProps({ backgroundColor: 'green' });
                    }
                    if (gesture.dx < 0 && this.touched2) {
                        this.touched2 = false;
                        this.touched1 = true;
                        this.return_background.changeView('delete', SCREEN_WIDTH - 50);
                        this.view_change.setNativeProps({ backgroundColor: 'red' });
                    }
                    position.setValue({ x: gesture.dx, y: 0 });
                }
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.props.changescroll(true);
                    this.resetPosition();
                }
            },
        });

        this.state = {
            isFlipped: false,
            panResponder,
            backcolor: 'white',
            bgcolor: '#FFFFFF',
            position,
            flag: 0,
            zIndex: 0,
            paddingright: 0,
            borderradius: 0,
        };
    }

    returndatabaseDate = date => {
        const created = date.split(' ');
        const time = created[5].split(':');

        const currentdate = new Date();
        const currentday = currentdate.getDay();
        const currentmonth = currentdate.getMonth();
        const currentyear = currentdate.getFullYear();
        const day = created[2];
        const year = created[3];
        const month = monthNames.indexOf(created[1]) + 1;
        if (year === currentyear && month === currentmonth && day === currentday) {
            return `${time[0]}:${time[1]}`;
        } else if (year == currentyear) {
            return `${monthNames[month - 1]} ${day}`;
        }
        return `${day}, ${year} `;
    };

    forceSwipe(direction) {
        const value =
            direction === 'right' ? SCREEN_WIDTH + 100 : -(SCREEN_WIDTH + 100);
        Animated.timing(this.state.position, {
            toValue: { x: value, y: 0 },
            duration: SWIPE_OUT_DURATION,
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        if (direction === 'right') {
            if (!this.props.completed) {
                this.onSwipeAction(false, true);
            } else {
                this.onSwipeAction(false, false);
            }
        } else {
            this.onSwipeAction(true, false);
        }
    }

    getCardStyle() {
        const { position } = this.state;
        return {
            ...position.getLayout(),
        };
    }

    setToInitialState = () => {
        console.log('settoinitialstate');
        this.animated_card.setNativeProps({ elevation: 0, borderRadius: 0 });
        this.view_change.setNativeProps({ backgroundColor: 'white' });
    };

    resetPosition() {
        const { position } = this.state;
        Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 250,
        }).start(() => {
            this.setToInitialState();
        });

        this.touched = true;
        this.touched1 = true;
        this.touched2 = true;
    }

    onSwipeAction = (deletetask, complete) => {
        const { byIds,index,last } = this.props;
        const data = byIds[this.props.items];
        const { taskid } = data;
        if (this.props.searchTask) {
            console.log('deleting task in search');
            this.props.deleteTask(taskid);
        }
        this.props.undoType(
            [{ taskid }],
            deletetask ? 'Deleted' : complete ? 'Completed' : 'Incompleted',
        );

        this.props.callUndo(
            [{ taskid }],
            deletetask ? 'delete' : complete ? 'complete' : 'incomplete',
        );
        if ((last - 1) !== index) {
            this.state.position.setValue({ x: 0, y: 0 });
            this.setToInitialState();
            this.touched = true;
            this.touched1 = true;
            this.touched2 = true;
        }
    };

    UNSAFE_componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInOut);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.setcolornormal) {
            nextProps.setcolornormal = false;
            this.front = 0;
            this.setState({
                flag: 0,
                isFlipped: false,
                bgcolor: 'white',
                paddingright: 0,
            });
        }
    }
    returntime = time => {
        var hours = time[0];
        var minutes = time[1];
        var newformat = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ':' + minutes + ' ' + newformat;
    };

    returnCompletedDate = date => {
        const newdate = date.split(' ');
        const time = newdate[4].split(':');
        const todaydate = new Date();
        if (todaydate.getFullYear() == newdate[3]) {
            return `${newdate[0]}, ${newdate[1]} ${newdate[2]}, ${this.returntime(
                time,
            )}`;
        } else {
            return `${newdate[0]}, ${newdate[1]} ${newdate[2]}, ${newdate[3]}`;
        }
    };

    onPresstask() {
        if (this.props.searchTask) {
            this.props.settaskSearch(false);
        }
        const { byIds, items } = this.props;
        this.props.navigation.navigate('createtask', {
            update: true,
            items: byIds[items],
            searchTask: this.props.searchTask,
            settaskSearch: this.props.settaskSearch,
            callUndo: this.props.callUndo
        });
    }

    returnDeadlineorCompleted = (task_deadline, task_completedAt) => {
        if (!this.props.completed) {
            if (task_deadline.length < 26) {
                return (
                    <View
                        style={{
                            flex: 1,
                            elevation: 4,
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                        }}>
                        <TouchableHighlight
                            onPress={() => {
                                this.props.settingNotificationmodal(1, this.props.byIds[this.props.items]);
                            }}
                            underlayColor={'#2B65EC1A'}>
                            <View style={styles.dedlineContainderstyle}>
                                <View style={{ alignSelf: 'center', paddingLeft: upadding / 3 }}>
                                    <MaterialIcons
                                        name="today"
                                        size={upadding * 1.25}
                                        width={5}
                                        color={`${
                                            colorArray[this.props.index % colorArray.length]
                                            }99`}
                                    />
                                </View>
                                <View style={styles.deadlineinsideContainer}>
                                    <Text style={{ color: '#8D8D8C', fontSize: upadding }}>
                                        {task_deadline}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                );
            }
            return <View />;
        }
        return (
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={styles.dedlineContainderstyle}>
                    <View style={{ alignSelf: 'center', paddingLeft: upadding / 3 }}>
                        <MaterialIcons
                            name="done"
                            size={upadding * 1.25}
                            width={5}
                            color={`${colorArray[this.props.index % colorArray.length]}99`}
                        />
                    </View>

                    <View style={styles.deadlineinsideContainer}>
                        <Text style={{ color: 'black', fontSize: upadding }}>
                            {this.returnCompletedDate(task_completedAt)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    showtitleornot = task_title => {
        if (task_title.length > 0) {
            if (task_title.length > 100) {
                return (
                    <Text style={styles.titlestyle}>
                        {`${task_title.substring(0, 100)}...`}
                    </Text>
                );
            }
            return <Text style={styles.titlestyle}>{`${task_title}`}</Text>;
        }
    };

    showdescriptionornot = task_description => {
        if (task_description.length > 0) {
            if (task_description.length > 180) {
                return (
                    <Text style={styles.descriptionstyle}>
                        {`${task_description.substring(0, 180)}......`}
                    </Text>
                );
            }
            return (
                <Text style={styles.descriptionstyle}>{`${task_description}`}</Text>
            );
        }
    };

    shouldComponentUpdate(nextProps) {
        if (this.props.items !== nextProps.items) {
            if (this.front === 1) {
                console.log('setting state');
                this.front = 0;
                this.setState({
                    isFlipped: false,
                    bgcolor: 'white',
                    paddingright: 0,
                    borderradius: 0,
                });
                return false;
            }
        } else {
            return true;
        }
        return true;
    }

    changecolor = taskid => {
        this.props.onSelectingTask(taskid, this.front);
        if (this.front === 0) {
            this.front = 1;
            this.setState({
                isFlipped: true,
                bgcolor: `#2B65EC1A`,
                paddingright: upadding,
                borderradius: upadding / 2,
                backcolor: 'white',
            });
            return;
        }
        this.front = 0;
        this.setState({
            isFlipped: false,
            bgcolor: 'white',
            paddingright: 0,
            borderradius: 0,
        });
        return;
    };

    render() {
        // return (
        //     <View/>
        // );
        const { byIds, completed, searchTask } = this.props;
        const data = byIds[this.props.items];
        const {
            taskid,
            task_title,
            task_description,
            task_deadline,
            task_completedAt,
            task_createdAt,
        } = data;
        return (
            <View
                ref={child => {
                    this.view_change = child;
                }}
                style={{
                    marginTop: upadding * 0.2,
                    backgroundColor: this.state.backcolor,
                    paddingLeft: this.state.paddingright,
                    justifyContent: 'center',
                }}>
                <Return_background
                    ref={child => {
                        this.return_background = child;
                    }}
                />

                <Animated.View
                    ref={child => {
                        this.animated_card = child;
                    }}
                    style={[
                        this.getCardStyle(),
                        {
                            backgroundColor: this.state.bgcolor,
                            borderRadius: this.state.borderradius,
                        },
                    ]}
                    key={toString(taskid)}
                    {...this.state.panResponder.panHandlers}>
                    <AnimateTouchablehightlight
                        onPress={() => {
                            if (!completed && !this.props.taskTouchDisable) {
                                this.onPresstask();
                            }
                        }}
                        onLongPress={() => {
                            if (!completed && !searchTask) {
                                this.changecolor(taskid);
                            }
                        }}
                        underlayColor={null}>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={[
                                    styles.cardStyle,
                                    {
                                        paddingLeft:
                                            upadding / 1.5 +
                                            upadding / 1.5 -
                                            this.state.paddingright,
                                    },
                                ]}>
                                <TouchableHighlight
                                    underlayColor={null}
                                    style={{ flex: 1 }}
                                    onPress={() => {
                                        if (!searchTask) {
                                            this.changecolor(taskid);
                                        }
                                    }}>
                                    <FlipCard
                                        flip={this.state.isFlipped}
                                        clickable={false}
                                        friction={100}
                                        perspective={5000}
                                        flipHorizontal={true}
                                        flipVertical={false}>
                                        {/* Face Side */}
                                        <View
                                            style={[
                                                styles.flipcoinstyle,
                                                {
                                                    backgroundColor: `${
                                                        colorArray[this.props.index % colorArray.length]
                                                        }99`,
                                                },
                                            ]}>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    fontFamily: 'cursive',
                                                    fontSize: upadding * 1.6,
                                                }}>{`${
                                                    task_title.length > 0 ? task_title.trim()[0] : ''
                                                    }`}</Text>
                                        </View>
                                        {/* BackSide */}
                                        <View
                                            style={[
                                                styles.flipcoinstyle,
                                                { backgroundColor: '#2B65EC' },
                                            ]}>
                                            <MaterialIcons
                                                name="check"
                                                size={upadding * 1.5}
                                                width={0}
                                                color="white"
                                                borderWidth={1}
                                                fontSize={2}
                                                iconSize={3}
                                                light
                                            />
                                        </View>
                                    </FlipCard>
                                </TouchableHighlight>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={styles.titledescontainer}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginBottom: upadding / 2,
                                    }}>
                                    <View
                                        style={{
                                            flex: 6,
                                            flexDirection: 'column',
                                        }}>
                                        {this.showtitleornot(task_title)}
                                        {this.showdescriptionornot(task_description)}
                                    </View>
                                    <View style={{ flex: 1, paddingTop: upadding }}>
                                        <Text
                                            style={{
                                                fontSize: upadding,
                                                fontWeight: 'bold',
                                                color: 'black',
                                            }}>
                                            {this.returndatabaseDate(task_createdAt)}
                                        </Text>
                                    </View>
                                </View>
                                {this.returnDeadlineorCompleted(
                                    task_deadline,
                                    task_completedAt,
                                )}
                            </View>
                        </View>
                        {/* </View> */}
                    </AnimateTouchablehightlight>
                </Animated.View>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        workid: state.worklist.state.selectedwork.workid,
        title: state.worklist.state.selectedwork.work_title,
        completed: state.task.data.completed,
        sortBy: state.task.data.sortBy
    }
}

export default connect(mapStateToProps, {
    undoType
})(Taskeach);

const styles = StyleSheet.create({
    flipcoinstyle: {
        height: upadding * 2.5,
        width: upadding * 2.5,
        borderRadius: upadding * 1.25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlestyle: {
        fontSize: upadding * 1.4,
        fontWeight: 'bold',
        color: 'black',
    },
    descriptionstyle: {
        fontSize: upadding * 1.2,
        color: 'black',
    },
    cardStyle: {
        flex: 0.9,
        paddingTop: (upadding / 2) * 1.25,
        paddingRight: upadding,
        paddingBottom: upadding / 2
    },
    titledescontainer: {
        flex: 9,
        paddingTop: upadding / 2,
        paddingBottom: upadding / 2,
        flexDirection: 'column',
    },

    dedlineContainderstyle: {
        backgroundColor: `#8D8D8C33`,
        flexDirection: 'row',
        height: upadding * 2.5,
        borderRadius: upadding / 4,
    },
    deadlineinsideContainer: {
        alignSelf: 'center',
        paddingLeft: upadding * 0.6,
        paddingRight: upadding * 0.8,
    },
});

