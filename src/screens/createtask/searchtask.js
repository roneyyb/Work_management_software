/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Dimensions,
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Animated,
  TouchableHighlight
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Taskeach from './eachtask';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const Height = SCREEN_HEIGHT * 0.07;
const th_height = Height - 20;
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Searchtask extends Component {
  constructor(props) {
    super(props);
    this.state = { searchActive: false, searchValue: '', searchresult: [] };
    this.totaldata = this.props.tasklist;
    this.deleteelement = '';
  }
  

  searchtask = text => {
    text.trim();
    const items = this.state.searchresult.filter(item => {
      const data = `${item.task_title.toLowerCase()} ${item.task_description.toLowerCase()}`;
      const textData = text.toLowerCase();
      const index = data.indexOf(textData);
      return index > -1;
    });
    this.setState({ searchresult: items, searchValue: text });
  };

  Searchtotaltask = text => {
    text.trim();
    const items = this.totaldata.filter(item => {
      let data = `${item.task_title.toLowerCase()} ${item.task_description.toLowerCase()}`;
      let textData = text.toLowerCase();
      let index = data.indexOf(textData);
      return index > -1;
    });
    this.setState({ searchresult: items, searchValue: text });
  };

  changescroll = (change) => {
    this._eachtask.setNativeProps({ scrollEnabled: change});
  }

  renderFooter = () => {
    return (
      <View style={{height: upadding*6, width: SCREEN_WIDTH}}/>
    );
  }


  undoaction = () => {
    var arr = this.state.searchresult;
    arr.splice(this.deleteelement.index,0,this.deleteelement.element);
    this.setState({searchresult:arr});
    this.totaldata.push(this.deleteelement.element);
  }

  deleteTask = (taskid,workid) => {
    const arr = this.state.searchresult;
    var index = arr.findIndex((obj) => { return obj.taskid===taskid && obj.workid===workid;});
    this.deleteelement = {index,element:arr[index]};
        arr.splice(index,1);
    index = this.totaldata.findIndex((obj) => { return obj.taskid===taskid && obj.workid===workid;});
     this.totaldata.splice(index,1);
     this.setState({searchresult:arr});
  }

  render() {
    return (
      <View style={styles.containerstyle}>
        <View style={styles.searchBar}>
          <View style={styles.searchBaritem1}>
            <TouchableHighlight
              style={styles.touchablehighlightstyle}
              onPress={() => { this.props.settaskSearch(false); }}
              underlayColor={'#8D8D8C33'}
            >
              <MaterialIcons
                size={upadding * 1.6}
                name={'arrow-back'}
                color={'grey'}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.searchBaritem2}>
            <TextInput
              style={styles.textInput}
              onChangeText={text => {
                if(text.length===1) {
                  this.setState({searchActive:true});
                }
                   if(this.state.searchValue.length===0)
                   {
                     this.Searchtotaltask(text);
                   } else if (text.length === 0) {
                     this.setState({searchresult: [], searchValue:text, searchActive:false});
                   } else if(text.length> this.state.searchValue.length)
                   {
                     this.searchtask(text);
                   } else {false
                     this.Searchtotaltask(text);
                   }
                  }}
              ref={c => {
                this.textInputRef = c;
              }}
              autoFocus
              value={this.state.searchValue}
              placeholderTextColor='#8D8D8C'
              placeholder={'SEARCH TASK'}
            />
          </View>
          {this.state.searchActive?(
            <View style={styles.searchBaritem1}>
              <TouchableHighlight
                style={styles.touchablehighlightstyle}
                onPress={() => {
                    this.setState({ searchValue: '', searchresult:[], searchActive:false });
                }}
                underlayColor={'#8D8D8C33'}
              >
                <MaterialIcons
                  size={upadding * 1.6}
                  name={'clear'}
                  color={'grey'}
                />
              </TouchableHighlight>
            </View>):<View style={styles.searchBaritem1}/>}
        </View>
        <View>
        <AnimatedFlatList
          data={this.state.searchresult}
          renderItem={({ item, index }) => (
            <Taskeach
            callUndo={this.props.callUndo}
            settingNotificationmodal={this.props.settingNotificationmodal}
            settaskSearch={this.props.settaskSearch}
            completed={this.props.completed}
            sortBy={this.props.sortBy}
            Makeremoterequest={this.props.Give_all_task}
            workid={this.props.workid}
            index={index}
            Searchtask={true}
            work={this.props.title}
            navigation={this.props.navigation}
            deleteid={this.props.deleteid}
            tasklist={this.props.tasklist}
            items={item}
            deleteTask={this.deleteTask}
            handleRefresh={this.props.handleRefresh}
            undoType={this.props.undoType}
            changescroll={this.changescroll}
            />
          )}
          ListFooterComponent={this.renderFooter}
          ref={component => this._eachtask = component}
          contentContainerStyle={{ paddingTop: 5 }}
          scrollEnabled
          renderF
          keyExtractor={item => item.taskid}
          onEndReachedThreshold={6}
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerstyle: {
    flex: 1,
    elevation:20,
    position:'absolute',
    width:SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: 'white'
  },
  searchBar: {
    flexDirection: 'row',
    height: upadding * 3.5,
    marginRight:upadding/2,
    marginLeft:upadding/2,
    marginTop:upadding/2,
    borderRadius:upadding /3,
    backgroundColor:'white',
    elevation:4,
  },
  searchBaritem1: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  searchBaritem2: {
    flex: 6,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    paddingLeft: upadding,
    fontSize: upadding * 1.3,
  },
  touchablehighlightstyle: {
    height: th_height,
    width: th_height,
    borderRadius: th_height / 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Searchtask;
