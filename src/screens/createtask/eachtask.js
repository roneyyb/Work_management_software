/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  TouchableHighlight,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  StyleSheet
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.5;
const SWIPE_OUT_DURATION = 100;
var colorArray = [
  '#FF6633',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
  '#4D8000',
  '#B33300',
  '#CC80CC',
  '#66664D',
  '#991AFF',
  '#E666FF',
  '#4DB3FF',
  '#1AB399',
  '#E666B3',
  '#33991A',
  '#CC9999',
  '#B3B31A',
  '#00E680',
  '#4D8066',
  '#809980',
  '#E6FF80',
  '#1AFF33',
  '#999933',
  '#FF3380',
  '#CCCC00',
  '#66E64D',
  '#4D80CC',
  '#9900B3',
  '#E64D66',
  '#4DB380',
  '#FF4D4D',
  '#99E6E6',
  '#6666FF'
];

const AnimateTouchablehightlight = Animated.createAnimatedComponent(TouchableHighlight);
const upadding = Math.round(SCREEN_WIDTH * 0.03);

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
          paddingLeft: this.state.paddingLeft
        }}
      >
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
      onStartShouldSetPanResponder: (evt, gestureState) => {
        return false;
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (
          (gestureState.dx > upadding * 1.25 ||
            gestureState.dx < -upadding * 1.25) &&
          this.front === 0
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
              borderRadius: 8
            });
            this.touched = false;
          }
          if (gesture.dx > 0 && this.touched1) {
            this.touched1 = false;
            this.touched2 = true;
            this.return_background.changeView('done', 20);
            this.view_change.setNativeProps({ backgroundColor: 'green' });
             //this.setState({ zindex: 4, borderradius: upadding * 1.25, backcolor:'green' });
          }
          if (gesture.dx < 0 && this.touched2) {
            this.touched2 = false;
            this.touched1 = true;
            this.return_background.changeView('delete', SCREEN_WIDTH - 50);
            this.view_change.setNativeProps({ backgroundColor: 'red' });
            //this.setState({ zindex: 4, borderradius: upadding * 1.25, backcolor:'green' });
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
      }
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
      borderradius: 0
    };
  }

  returnDate = date => {
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
    var createdate = new Date(Date.parse('2011-09-29 14:58:12'));
    const currentdate = new Date();
    const currentday = currentdate.getDay();
    const currentmonth = currentdate.getMonth();
    const currentyear = currentdate.getFullYear();
    const day = createdate.getDate();
    const month = createdate.getMonth();
    const year = createdate.getFullYear();
    if (year === currentyear && month === currentmonth && day === currentday) {
      return `${createdate.getHours()}:${createdate.getMinutes()}`;
    } else if (year === currentyear) {
      return `${monthNames[month]} ${day}`;
    }
    return `${year}${day}`;
  };

  returndatabaseDate = date => {
    const a = date.split(' ');
    const time = a[1].split(':');
    const datee = a[0].split('-');
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
    const createdate = new Date(date);
    const currentdate = new Date();
    const currentday = currentdate.getDay();
    const currentmonth = currentdate.getMonth();
    const currentyear = currentdate.getFullYear();
    const day = datee[2];
    const month = datee[1];
    const year = datee[0];
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
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    if (direction === 'right') {
      if (!this.props.completed) {
        this.onPresscomplete(this.props.items.taskid);
      } else {
        this.onPressincomplete(this.props.items.taskid);
      }
    } else {
      this.onPressdelete(this.props.items.taskid);
    }

  }

  getCardStyle() {
    const { position } = this.state;
    return {
      ...position.getLayout()
    };
  }

  doit = () => {
    this.animated_card.setNativeProps({ elevation: 0, borderRadius: 0 });
    this.view_change.setNativeProps({ backgroundColor: 'white' });
  };
  resetPosition() {
    const { position } = this.state;
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 250
    }).start(() => {
      this.doit();
    });

    this.touched = true;
    this.touched1 = true;
    this.touched2 = true;
  }

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
        paddingright: 0
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
        time
      )}`;
    } else {
      return `${newdate[0]}, ${newdate[1]} ${newdate[2]}, ${newdate[3]}`;
    }
  };

  returnDeadlineorCompleted = () => {
    if (!this.props.completed) {
      if (this.props.items.task_deadline.length < 26) {
        return (
          <View
            style={{ flex: 1 ,elevation:4, flexDirection: 'row', alignItems: 'flex-start' }}
          >
            <TouchableHighlight
              onPress={() => {
                this.props.settingNotificationmodal(1, this.props.items);
              }}
              underlayColor={'#2B65EC1A'}
            >
              <View style={styles.dedlineContainderstyle}>
                <View
                  style={{ alignSelf: 'center', paddingLeft: upadding / 3 }}
                >
                  <MaterialIcons
                    name='today'
                    size={upadding * 1.25}
                    width={5}
                    color={`${
                      colorArray[this.props.index % colorArray.length]
                    }99`}
                  />
                </View>
                <View style={styles.deadlineinsideContainer}>
                  <Text style={{ color: '#8D8D8C', fontSize: upadding }}>
                    {this.props.items.task_deadline}
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
        <View style={{ alignSelf: 'center', paddingLeft: upadding / 3 }} >
          <MaterialIcons
            name='done'
            size={upadding * 1.25}
            width={5}
            color={`${colorArray[this.props.index % colorArray.length]}99`}
          />
          </View>
        
        <View style={styles.deadlineinsideContainer}>
          <Text style={{ color: 'black', fontSize: upadding }}>
            {this.returnCompletedDate(this.props.items.task_completedAt)}
          </Text>
        </View>
      </View>
      </View>
    );
  };
  onPresscomplete(id) {
    if(this.props.Searchtask) {
      this.props.deleteTask(this.props.items.taskid,this.props.items.workid);
    }
    this.props.undoType(
      this.props.tasklist,
      [{ taskid: id, taskid_backend: this.props.items.taskid_backend }],
      'Completed'
    );
    this.props.callUndo([
      { taskid: id, taskid_backend: this.props.items.taskid_backend }
    ],'complete');
  }

  onPressincomplete = id => {
    if(this.props.Searchtask) {
      this.props.deleteTask(this.props.items.taskid,this.props.items.workid);
    }
    this.props.undoType(
      this.props.tasklist,
      [{ taskid: id, taskid_backend: this.props.items.taskid_backend }],
      'Incompleted'
    );
    this.props.callUndo([
      { taskid: id, taskid_backend: this.props.items.taskid_backend }
    ],'incomplete');
  };

  onPressdelete(id) {
    if(this.props.Searchtask) {
      this.props.deleteTask(this.props.items.taskid,this.props.items.workid);
    }
    this.props.undoType(
      this.props.tasklist,
      [{ taskid: id, taskid_backend: this.props.items.taskid_backend }],
      'Deleted'
    );
    this.props.callUndo([
      { taskid: id, taskid_backend: this.props.items.taskid_backend }
    ],'delete');
  }

  onPresstask() {
    if(this.props.Searchtask) {
      this.props.settaskSearch(false);
    }
    this.props.navigation.navigate('createtask', {
      update: true,
      title: this.props.items.task_title,
      description: this.props.items.task_description,
      id: this.props.items.taskid,
      workid: this.props.workid,
      Searchtask: this.props.Searchtask,
      settaskSearch:this.props.settaskSearch,
      notificationid: this.props.items.task_notificationid,
      reminder: this.props.items.task_reminder,
      work: this.props.work,
      date: this.date,
      createdAt: this.createdAt,
      callUndo: this.props.callUndo,
      taskidbackend: this.props.items.taskid_backend,
      deadline: this.props.items.task_deadline,
      onNavigateBack: this.props.navigation.getParam('onNavigateBack'),
      deleteid: this.props.deleteid,
      Deletetaskcountnumber: this.props.Deletetaskcountnumber,
      changeflip: this.props.changeflip
    });
  }

  viewcompleteordelete() {
    return (
      <Animated.View
        style={{
          backgroundColor: '#cfebfd',
          height: 100,
          margin: 0,
          borderRadius: 6
        }}
      />
    );
  }

  showtitleornot = () => {
    if (this.props.items.task_title.length > 0) {
      if (this.props.items.task_title.length > 100) {
        return (
          <Text style={styles.titlestyle}>
            {`${this.props.items.task_title.substring(0, 100)}...`}
          </Text>
        );
      }
      return (
        <Text style={styles.titlestyle}>
          {`${this.props.items.task_title}`}
        </Text>
      );
    }
  };

  showdescriptionornot = () => {
    if (this.props.items.task_description.length > 0) {
      if (this.props.items.task_description.length > 180) {
        return (
          <Text style={styles.descriptionstyle}>
            {`${this.props.items.task_description.substring(0, 180)}......`}
          </Text>
        );
      }
      return (
        <Text style={styles.descriptionstyle}>
          {`${this.props.items.task_description}`}
        </Text>
      );
    }
  };

  changecolor = () => {
    if (this.front === 0) {
      this.front = 1;
      this.props.deleteid.push({
        taskid: this.props.items.taskid,
        taskid_backend: this.props.items.taskid_backend
      });
      if (this.props.deleteid.length === 1) {
        this.props.changeflip(1);
      } else if (this.props.deleteid.length > 1) {
        this.props.Deletetaskcountnumber(this.props.deleteid.length);
      }
      this.setState({
        isFlipped: true,
        bgcolor: `#2B65EC1A`,
        paddingright: upadding,
        borderradius: upadding / 2,
        backcolor: 'white'
      });
      return;
    }
    this.front = 0;

    var index = this.props.deleteid.findIndex(
      obj => obj.taskid === this.props.items.taskid
    );
    if (index > -1) {
      this.props.deleteid.splice(index, 1);
      this.props.Deletetaskcountnumber(this.props.deleteid.length);
    }
    if (this.props.deleteid.length === 0) {
      this.props.changeflip(0);
    }
    this.setState({
      isFlipped: false,
      bgcolor: 'white',
      paddingright: 0,
      borderradius: 0
    });
    return;
  };

  render() {
    return (
      <View
        ref={child => {
          this.view_change = child;
        }}
        style={{
          marginTop: upadding * 0.2,
          backgroundColor: this.state.backcolor,
          paddingLeft: this.state.paddingright,
          justifyContent: 'center'
        }}
      >
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
                borderRadius: this.state.borderradius
              }
            ]}
            key={this.props.items.taskid}
            {...this.state.panResponder.panHandlers}
          >
        <AnimateTouchablehightlight
        onPress={this.onPresstask.bind(this)}
        onLongPress={() => {
        if(!this.props.searchtask){
        this.changecolor();
        }
        }}   underlayColor={null}
        >
          <View style={{flexDirection:'row'}} >
            <View
              style={{
                flex: 0.9,
                paddingTop: (upadding/2) * 1.25,
                paddingLeft: upadding/1.5 + upadding/1.5 - this.state.paddingright,
                paddingRight: upadding,
                paddingBottom: upadding/2
              }}
            >
              <TouchableHighlight
                underlayColor={null}
                style={{ flex: 1 }}
                onPress={() => {
                  if(!this.props.Searchtask) {
                  this.changecolor();
                  }
                }}
              >
                <FlipCard
                  flip={this.state.isFlipped}
                  clickable={false}
                  friction={100}
                  perspective={5000}
                  flipHorizontal={true}
                  flipVertical={false}
                >
                  {/* Face Side */}
                  <View
                    style={[
                      styles.flipcoinstyle,
                      {
                        backgroundColor: `${
                          colorArray[this.props.index % colorArray.length]
                        }99`
                      }
                    ]}
                  >
                    <Text
                      style={{ color: 'white', fontFamily:'cursive', fontSize: upadding * 1.6 }}
                    >{`${
                      this.props.items.task_title.length > 0
                        ? this.props.items.task_title[0]
                        : ''
                    }`}</Text>
                  </View>
                  {/* BackSide */}
                  <View
                    style={[
                      styles.flipcoinstyle,
                      { backgroundColor: '#2B65EC' }
                    ]}
                  >
                    <MaterialIcons
                      name='check'
                      size={upadding * 1.5}
                      width={0}
                      color='white'
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
                style={{ flexDirection: 'row', marginBottom: upadding / 2 }}
              >
                <View
                  style={{
                    flex: 6,
                    flexDirection: 'column'
                  }}
                >
                  {this.showtitleornot()}
                  {this.showdescriptionornot()}
                </View>
                <View style={{ flex: 1, paddingTop: upadding }}>
                  <Text
                    style={{
                      fontSize: upadding,
                      fontWeight: 'bold',
                      color: 'black'
                    }}
                  >
                    {this.returndatabaseDate(this.props.items.task_createdAt)}
                  </Text>
                </View>
              </View>
              {this.returnDeadlineorCompleted()}
            </View>
          </View>
            {/* </View> */}
            </AnimateTouchablehightlight>
          </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flipcoinstyle: {
    height: upadding * 2.5,
    width: upadding * 2.5,
    borderRadius: upadding * 1.25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titlestyle: {
    fontSize: upadding * 1.4,
    fontWeight: 'bold',
    color: 'black'
  },
  descriptionstyle: {
    fontSize: upadding*1.2,
    color: 'black'
  },
  titledescontainer: {
    flex: 9,
    paddingTop: upadding/2,
    paddingBottom: upadding/2,
    flexDirection: 'column'
  },

  dedlineContainderstyle: {
    backgroundColor: `#8D8D8C33`,
    flexDirection: 'row',
    height: upadding * 2.5,
    borderRadius: upadding / 4
  },
  deadlineinsideContainer: {
    alignSelf: 'center',
    paddingLeft: upadding * 0.6,
    paddingRight: upadding * 0.8
  }
});

export default Taskeach;
