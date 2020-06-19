/* eslint-disable no-underscore-dangle */
import React, { Component, createRef } from 'react';
import { FlatList, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { colorArray as COLORS } from '../../constants/Color';
import EachWork from './EachWork';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Tasklist extends Component {

    constructor(props) {
        super(props);
        this.flatListRef = createRef();
    }

    scrollToIndex = (index) => {
        console.log('scrolltoindex');
            this.flatListRef.current.scrollToIndex({ 'index': index, 'viewPosition': 0.4, 'animated':true  });
    } 
    render() {
        const list_len = this.props.data.length;
        return (
            <View style={{ flexDirection: 'column' }}>
                <FlatList
                    ref={this.flatListRef}
                    data={this.props.data}
                    getItemLayout={(data, index) => ({
                        length: upadding * 5, offset: upadding * 5 * index, index
                    })}
                    renderItem={({ item, index }) => {
                        
                       return (<EachWork
                            item={item}
                            color={COLORS[index % COLORS.length]}
                           data={this.props.data}
                           index={index}
                           last={list_len-1}
                           scrollToIndex={this.scrollToIndex}
                            navigation={this.props.navigation}
                        />
                    )}}
                    keyExtractor={(item, index) => (item.toString())}
                    contentContainerStyle={{paddingBottom:upadding, paddingRight:upadding *4}}

                />
            </View>
        );
    }

    componentDidMount() {
        console.log('componentMounted')
        
    }
}
const mapStateToProps = state => {
    return {
        data: state.worklist.state.data,
        selectedwork: state.worklist.state.selectedwork,
    };
};

export default connect(
    mapStateToProps,
    {}
)(Tasklist);
