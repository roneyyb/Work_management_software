import React from 'react';
import {
  TextInput,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import {
  onChangework,
  onPressDone,
  dataupdate,
  clearallwork,
  setState,
  workupdate
} from '../../actions/worklistaction';
import {
  createWork
} from '../../database/createqueries';
import { 
  updateWork
} from '../../database/updatequeries';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Creatework extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      headerTitle: () => 
        <Text style={{ color: '#8D8D8C', fontSize: upadding * 1.3 , fontWeight: 'bold' }}>
        {`${navigation.getParam('update') ? 'UPDATE WORK' : 'CREATE WORK'}`}
        </Text>
      ,
      headerRight: () => 
        <TouchableHighlight
        underlayColor={'#2B65EC33'}
        style={{
          height: upadding * 3,
          width: upadding * 4,
          borderRadius: upadding/2,
          alignItems: 'center',
          marginRight:upadding,
          justifyContent: 'center'
        }}
        onPress={
          navigation.getParam('update', false)
            ? navigation.getParam('updating', () => {})
            : navigation.getParam('creating', () => {})
        }
      >
        <Text style={{ fontSize: upadding*1.3, color:'#2B65EC', fontWeight:'bold' }}>
          {'DONE'}
        </Text>
      </TouchableHighlight>
      ,
      headerTintColor: '#8D8D8C'
          });

  constructor(props) {
    super(props);
    this.activatecreatework = true;
    if (props.navigation.getParam('update', false)) {
      const work = props.navigation.getParam('work', '');
      this.workid = props.navigation.getParam('workid', '');
      if (work.length > 0) {
        props.setState(work);
      }
    }
  }

  
  componentDidMount() {
    this.props.navigation.setParams({ creating: this.onDone.bind(this),updating: this.onUpdate.bind(this), updates:true });
  }

  shouldComponentUpdate(nextProps) {
  
    this.textref.setNativeProps({autoFocus:true});
    if (nextProps.created) {
      nextProps.navigation.state.params.onNavigateBack(1);
      nextProps.navigation.navigate('task');
      return false;
    }
    if (nextProps.workupdated) {
      const onNavigateBack = nextProps.navigation.getParam(
        'onNavigateBack',
        () => {}
      );
      onNavigateBack(1);
      nextProps.navigation.navigate('task');
      return false;
    }
    return true;
  }
  componentWillUnmount() {
    this.props.clearallwork();
  }
  onUpdate() {
       this.props.updateWork(this.workid, this.props.work, this.props.selectedwork,this.props.worklist);
  }

  onDone() {
    this.props.createWork(this.props.work, this.props.worklist);
  }
  onChanges(value) {
    this.props.onChangework(value);
  }
  render() {
    
    return (
      <View style={{ backgroundColor: `${'#D3D3D3'}80`, flex: 1 }}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            elevation: 4
          }}
        >
          <TextInput
            style={{
              height: upadding * 5,
              marginRight: upadding * 2,
              marginLeft: upadding * 2,
              fontWeight: 'bold',

              color: 'black',
              fontSize: upadding * 1.3
            }}
            ref={c => {
              this.textref = c;
            }}
            autoFocus
            value={this.props.work}
            onChangeText={this.onChanges.bind(this)}
            placeholder={'Enter work title'}
            autoCorrect={false}
            multiline
            placeholderTextColor='#8D8D8C'
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
    work: state.worklist.work,
    userid,
    worklist: state.worklist.data,
    selectedwork: state.worklist.selectedwork,
    workupdated: state.worklist.workupdated,
    error: state.worklist.error,
    created: state.worklist.created
  };
};
export default connect(
  mapStateToProps,
  {
    updateWork,
    createWork,
    workupdate,
    onChangework,
    onPressDone,
    dataupdate,
    clearallwork,
    setState
  }
)(Creatework);
