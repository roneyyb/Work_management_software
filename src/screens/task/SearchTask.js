/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
    Dimensions,
    View,
    TextInput,
    StyleSheet,
    FlatList,
    Text,
    Animated
} from 'react-native';
import WrappedButton from './components/WrappedButton';
import Taskeach from './EachTask';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const Height = SCREEN_HEIGHT * 0.07;
const th_height = Height - 20;
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class SearchTask extends Component {
    constructor(props) {
        super(props);
        this.totaldata = [...this.props.tasklist];
        this.state = { searchActive: false, searchValue: '', searchresult: []};
       
        this.deleteelement = '';
    }


    
    searchTask = (text, total) => {
        text.trim();
        const arr = total ? this.totaldata : this.state.searchresult;
        const byIds = this.props.byIds;
        const items = arr.filter(item => {
            const task = byIds[item];
            const data = `${task.task_title.toLowerCase()} ${task.task_description.toLowerCase()}`;
            const textData = text.toLowerCase();
            const index = data.indexOf(textData);
            return index > -1;
        });
        this.setState({ searchresult: items, searchValue: text });
    };
    
    changescroll = (change) => {
        this._eachtask.setNativeProps({ scrollEnabled: change });
    }

    renderFooter = () => {
        return (
            <View style={{ height: upadding * 6, width: SCREEN_WIDTH }} />
        );
    }


    undoAction = () => {
        var arr = this.state.searchresult;
        arr.splice(this.deleteelement.index, 0, this.deleteelement.element);
        this.totaldata.push(this.deleteelement.element);
        setTimeout(() => {
            this.setState({ searchresult: arr });
        },500);
    }

    deleteTask = (taskid) => {
        var arr = [...this.state.searchresult];
        var index = arr.indexOf(taskid);
        this.deleteelement = { index, element: arr[index] };
        arr.splice(index, 1);
        var index1 = this.totaldata.indexOf(taskid);
        this.setState({
                searchresult:arr
        });
        this.totaldata.splice(index1, 1);
    }

    render() {
        const search_result_length = this.state.searchresult.length;
        return (
            <View style={styles.containerstyle}>
                <View style={styles.searchBar}>
                    <View style={styles.searchBaritem1}>
                        <WrappedButton
                            iconTitle={'arrow-back'}
                            onPress={() => {
                                this.props.settaskSearch(false);
                            }}
                        />
                    </View>
                    <View style={styles.searchBaritem2}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => {
                                if (text.length === 1) {
                                    this.setState({ searchActive: true });
                                }
                                if (this.state.searchValue.length === 0) {
                                    this.searchTask(text,true);
                                } else if (text.length === 0) {
                                    this.setState({ searchresult: [], searchValue: text, searchActive: false });
                                } else if (text.length > this.state.searchValue.length) {
                                    this.searchTask(text,false);
                                } else {
                                    false
                                    this.searchTask(text,true);
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
                    {this.state.searchActive ? (
                        <View style={styles.searchBaritem1}>
                            <WrappedButton
                                onPress={() => {
                                    this.setState({ searchValue: '', searchresult: [], searchActive: false });
                                }}
                                    iconTitle={'clear'}
                                />
                        </View>) : <View style={styles.searchBaritem1} />}
                </View>
                {search_result_length === 0 ?
                    <View style={[styles.flatList, { flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }]}>
                        <Text style={{ color: '#8D8D8C66', fontSize: 16 }}>{'No Task Found'}</Text>
                    </View> :
                    <View>
                        <AnimatedFlatList
                            data={this.state.searchresult}
                            renderItem={({ item, index }) => (
                                <Taskeach
                                    callUndo={this.props.callUndo}
                                    settingNotificationmodal={this.props.settingNotificationmodal}
                                    settaskSearch={this.props.settaskSearch}
                                    index={index}
                                    byIds={this.props.byIds}
                                    searchTask={true}
                                    last={search_result_length}
                                    navigation={this.props.navigation}
                                    deleteid={this.props.deleteid}
                                    items={item}
                                    deleteTask={this.deleteTask}
                                    changescroll={this.changescroll}
                                />
                            )}
                            ListFooterComponent={this.renderFooter}
                            ref={component => this._eachtask = component}
                            contentContainerStyle={{ paddingTop: 5 }}
                            scrollEnabled
                            renderF
                            keyExtractor={(item,index) => item.toString()}
                            onEndReachedThreshold={6}
                        />
                    </View>}
            </View>
        );
    }
}


export default SearchTask;
const styles = StyleSheet.create({
    containerstyle: {
        flex: 1,
        elevation: 10,
        position: 'absolute',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'white'
    },
    searchBar: {
        flexDirection: 'row',
        height: upadding * 3.5,
        marginRight: upadding / 2,
        marginLeft: upadding / 2,
        marginTop: upadding / 2,
        borderRadius: upadding / 3,
        backgroundColor: 'white',
        elevation: 4,
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
