import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class FrontView extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', completed:'Icom' };
    this.active = false;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.searchvaluereset && this.active) {
      this.active = false;
      this.setState({ value: '' });
    }
  }
  
  componentWillUnmount() {
    this.setState({ vlaue: '' });
  }
  barref = null;

  handleref = ref => {
    this.barref = ref;
  };
  
  render() {
    return (
      <View style={FrontViewstyles.Containerstyle}>
        <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
          <TouchableHighlight
            style={FrontViewstyles.touchstyle}
            underlayColor={'#8D8D8C33'}
            onPress={() => {
              this.props.navigation.navigate('worklist', {
                onNavigateBack: this.props.navigation.getParam('onNavigateBack', () => {})
              });
            }}
          >
            <MaterialIcons
              name='menu'
              size={upadding*2.5}
              color='#8D8D8C'  
            />
          </TouchableHighlight>
        </View>
        <TouchableHighlight  style={{ flex:6, flexDirection:'row', alignItems:'center', paddingLeft:upadding*0.8}}onPress={() => {this.props.settaskSearch(true)}} underlayColor={null}>       
         <View >
          <Text style={{fontSize:upadding * 1.5, fontWeight:'bold', color:'#8D8D8C' }}>{`${this.props.work.toUpperCase()}`}</Text>
      </View>
          </TouchableHighlight>
        <View style={styles.Container1style}>
          <TouchableHighlight
            style={FrontViewstyles.touchstyle}
            underlayColor={'#8D8D8C33'}
            onPress={() => {
              this.props.settaskSearch(true);
            }}
          >
            <MaterialIcons
              name='search'
              size={upadding * 2}
              color='#8D8D8C'
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

class BackView extends Component {
  render() {
    const { props } = this;
    return (
      <View
        style={FrontViewstyles.Containerstyle}
      >
        <View style={styles.Container1style}>
          <TouchableHighlight
            style={FrontViewstyles.touchstyle}
            underlayColor={'#8D8D8C33'}
            onPress={props.onPressreturn}
          >
            <MaterialIcons
              name='clear'
              size={upadding * 2.2}
              color='#2B65EC'
            />
          </TouchableHighlight>
        </View>
        {props.deletecount !== 0 ? (
          <View style={styles.Container2style}>
            <Text
              style={{
                marginLeft: upadding * 0.8,
                color: '#2B65EC',
                fontWeight:'500',
                fontSize: upadding * 1.2
              }}
            >{`${props.deletecount} TASK SELECTED`}</Text>
          </View>
        ) : (
          <View />
        )}
        <View style={styles.Container1style}>
          <TouchableHighlight
          underlayColor={'#8D8D8C33'}
            style={FrontViewstyles.touchstyle}
            onPress={props.onPressUpdate}
          >
            <MaterialIcons
              name='done-all'
              size={upadding * 2.2}
              color='#2B65EC'
            />
          </TouchableHighlight>
        </View>
        <View style={styles.Container1style}>
          <TouchableHighlight
             underlayColor={'#8D8D8C33'}
            style={FrontViewstyles.touchstyle}
            onPress={props.onPressdelete}
          >
            <MaterialIcons
              name='delete'
              size={upadding * 2.2}
              color='#2B65EC'
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false, deletecount: 0 };
    this.searchvaluereset = false;
    this.changeflip = this.changeflip.bind(this);
    this.onPressreturn = this.onPressreturn.bind(this);
    this.onPressdelete = this.onPressdelete.bind(this);
    this.onPressUpdate = this.onPressUpdate.bind(this);
    this.onSearchreset = this.onSearchreset.bind(this);
    this.Deletetaskcountnumber = this.Deletetaskcountnumber.bind(this);
    }


  // eslint-disable-next-line react/sort-comp
  changeflip = count => {
    this.searchvaluereset = true;
    if(this.state.isFlipped) {
      this.props.setpointer(false);
    } else {
      this.props.setpointer(true);
    }
    this.setState({ isFlipped: !this.state.isFlipped, deletecount: count });
  };

  onPressreturn() {
    this.props.setColordefault();
    this.changeflip(0);
  }

  onPressdelete() {
    this.props.undoType(this.props.tasklist, this.props.deleteid, 'Deleted');
    this.props.deleteMultipletask(this.props.deleteid,'delete');
    this.changeflip(0);
  }
 

  onPressUpdate() {
    if(!this.props.completed)
    {
    this.props.undoType(this.props.tasklist, this.props.deleteid, 'Completed');
    this.props.deleteMultipletask(this.props.deleteid,'complete');
    this.changeflip(0);
    }
    else
    {
      this.props.undoType(this.props.tasklist, this.props.deleteid, 'Incompleted');
    this.props.deleteMultipletask(this.props.deleteid,'incomplete');
    this.changeflip(0);
    }
  }
  
  onSearchreset() {
    this.searchvaluereset = false;
  }
  Deletetaskcountnumber(count) {
    this.setState({ deletecount: count });
  }
  render() {
    return (
      <View style={{ position:'absolute', paddingTop: upadding * 0.5, left:upadding/2, right:upadding/2 }}>
        <FlipCard
          flip={this.state.isFlipped}
          friction={100}
          perspective={5000}
          flipHorizontal={true}
          clickable={false}
          flipVertical={false}
          >
          {/* Face Side */}
           <FrontView
              settaskSearch={this.props.settaskSearch}
              navigation={this.props.navigation}
              work={this.props.work}
              
            />
            {/* Back Side */}
            <BackView
              onPressreturn={this.onPressreturn}
              onPressdelete={this.onPressdelete}
              onPressUpdate={this.onPressUpdate}
              deletecount={this.state.deletecount}
            />
            </FlipCard>
      </View>
    );
  }
}

export default Header;

const styles = {
  Container1style: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Container2style: {
    flex: 6,
    justifyContent:'center', 
  }
};

const FrontViewstyles = {
  Containerstyle: 
    { height: upadding * 3.5, flexDirection:'row', elevation:upadding / 3, backgroundColor:'white', 
      borderRadius: upadding /3, marginRight: upadding/2,marginLeft: upadding/2 }
  ,
  touchstyle: {
    height: upadding * 3,
    width: upadding * 3,
    borderRadius: upadding * 1.5,
    alignItems: 'center',
    justifyContent: 'center'
  },

}
