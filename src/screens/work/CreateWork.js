import React from 'react';
import {
    TextInput,
    TouchableHighlight,
    View,
    Text,
    Dimensions,
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import {
    addWorkInRedux,
    updateWorkInRedux
} from '../../actions/workListActions';
import {
    addWorkInDatabase
} from '../../database/addItem';
import {
    updateWorkInDatabase
} from '../../database/updateItem';

import { giveAllTask } from '../../database/giveAllItem';
import { updateDefaultWork } from '../../actions/userActions';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Creatework extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: () =>
            <Text style={{ color: '#8D8D8C', fontSize: upadding * 1.3, fontWeight: 'bold' }}>
                {`${navigation.getParam('update') ? 'UPDATE WORK' : 'CREATE WORK'}`}
            </Text>
        ,
        headerRight: () =>
            <TouchableHighlight
                underlayColor={'#2B65EC33'}
                style={{
                    alignItems: 'center',
                    marginRight: upadding,
                    justifyContent: 'center'
                }}
                onPress={
                    navigation.getParam('update', false)
                        ? navigation.getParam('updating', () => {
                            Keyboard.dismiss();
                     })
                        : navigation.getParam('creating', () => {
                            Keyboard.dismiss();
                     })
                }
            >
                <Text style={{ fontSize: upadding, color: '#2B65EC', fontWeight: 'bold' }}>
                    {navigation.getParam('update', false)?'UPDATE':'CREATE'}
                </Text>
            </TouchableHighlight>
        ,
        headerTintColor: '#8D8D8C'
    });

    constructor(props) {
        super(props);
        this.activatecreatework = true;
        const update = props.navigation.getParam('update', false);
        if (update) {
            this.state = {
                work: props.selectedwork.work_title,
                update: true
            }
        } else {
            this.state = {
                work: '',
                update: false
            }
        }
    }


    componentDidMount() {
        this.props.navigation.setParams({ creating: this.onCreate.bind(this), updating: this.onUpdate.bind(this) });
    }

    onUpdate() {
        Keyboard.dismiss();

        if (this.props.defaultwork.workid === this.props.selectedwork.workid) {
            this.props.updateDefaultWork({ ...this.props.selectedwork, work_title: this.state.work });
        }
        const data = { ...this.props.selectedwork, work_title: this.state.work };
        this.props.updateWorkInRedux(data);
        updateWorkInDatabase(this.props.selectedwork.workid, this.state.work);
        this.props.navigation.navigate('task');
    }

    onCreate() {
        Keyboard.dismiss();

        const uuid = uuidv1();
        const data = {
            work_title: this.state.work,
            workid: uuid,
            work_created: new Date().toString(),
            work_selected: 0,
            work_deadline: "",
            workid_bakcend:""
        }
        this.props.addWorkInRedux(data);
        addWorkInDatabase(data);
        this.props.giveAllTask(uuid);
        this.props.navigation.navigate('task');
    }

    onChanges(value) {
        this.setState({ work: value });
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
                        autoFocus = {true}
                        value={this.state.work}
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
    return {
        selectedwork: state.worklist.state.selectedwork,
        defaultwork: state.user.user.work
    };
};
export default connect(
    mapStateToProps,
    {
        updateDefaultWork,
        giveAllTask,
        updateWorkInRedux,
        addWorkInRedux
    }
)(Creatework);
