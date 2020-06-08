import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import FlipCard from 'react-native-flip-card';
import { connect } from 'react-redux';
import { undoType } from '../../actions/taskshowaction';
import WrappedButton from './components/WrappedButton';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class FrontView extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '', completed: 'Icom' };
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
                <WrappedButton
                    iconTitle={'menu'}
                    onPress={() => {
                        this.props.navigation.navigate('worklist', {
                            onNavigateBack: this.props.navigation.getParam('onNavigateBack', () => { })
                        });
                    }}
                />
                <TouchableHighlight style={{ flex: 6, flexDirection: 'row', alignItems: 'center', paddingLeft: upadding * 0.8 }} onPress={() => { this.props.settaskSearch(true) }} underlayColor={null}>
                    <View >
                        <Text style={{ fontSize: upadding * 1.5, fontWeight: 'bold', color: '#8D8D8C' }}>{`${this.props.work.toUpperCase()}`}</Text>
                    </View>
                </TouchableHighlight>
                <WrappedButton
                    iconTitle={'search'}
                    onPress={() => {
                        this.props.settaskSearch(true);
                    }}
                />
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
                {props.deletecount !== 0 ? (
                    <View style={styles.Container2style}>
                        <Text
                            style={{
                                marginLeft: upadding * 0.8,
                                color: '#2B65EC',
                                fontWeight: '500',
                                fontSize: upadding * 1.2
                            }}
                        >{`${props.deletecount} TASK SELECTED`}</Text>
                    </View>
                ) : (
                        <View />
                    )}
                <WrappedButton
                    onPress={() => { props.onPressButton(false); }}
                    iconTitle={'done-all'}
                />
                <WrappedButton
                    onPress={() => { props.onPressButton(true) }}
                    iconTitle={'delete'}
                />


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
        this.onPressButton = this.onPressButton.bind(this);
        this.onSearchreset = this.onSearchreset.bind(this);
        this.Deletetaskcountnumber = this.Deletetaskcountnumber.bind(this);
    }


    // eslint-disable-next-line react/sort-comp
    changeflip = count => {
        this.searchvaluereset = true;
        if (this.state.isFlipped) {
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

    onPressButton(deleted) {
        const { completed } = this.props;
        this.props.undoType(this.props.deleteid, deleted ? 'Deleted' : !completed ? 'Completed' : 'Incompleted');
        this.props.deleteMultipletask(this.props.deleteid, deleted ? 'delete' : !completed ? 'complete' : 'incomplete');
        this.changeflip(0);
    }

    onSearchreset() {
        this.searchvaluereset = false;
    }

    Deletetaskcountnumber(count) {
        this.setState({ deletecount: count });
    }
    render() {
        return (
            <View style={{ position: 'absolute', paddingTop: upadding * 0.5, left: upadding / 2, right: upadding / 2 }}>
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
                        work={this.props.title}
                    />
                    {/* Back Side */}
                    <BackView
                        onPressreturn={this.onPressreturn}
                        onPressButton={this.onPressButton}
                        deletecount={this.state.deletecount}
                    />
                </FlipCard>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        workid:state.worklist.state.selectedwork.workid,
        title: state.worklist.state.selectedwork.work_title,
        completed: state.task.data.completed,
    };
}

export default connect(mapStateToProps, { undoType })(Header);

const styles = {
    Container2style: {
        flex: 6,
        justifyContent: 'center',
    }
};

const FrontViewstyles = {
    Containerstyle:
    {
        height: upadding * 3.5, flexDirection: 'row', elevation: upadding / 3, backgroundColor: 'white',
        borderRadius: upadding / 3, marginRight: upadding / 2, marginLeft: upadding / 2
    }
}
