/**
 * Created by dashzhao on 10/13/16.
 */
import React, {Component,PropTypes} from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
} from "react-native";
export default class AppBar extends Component {

    // 组件定义属性可以接受
    // static PropTypes = {
    //     title: PropTypes.string.isRequired,
    // }

    render() {
        return (
            <View style={styles.root}>
                <Text style={styles.titles}>{this.props.title}</Text>
            </View>);
    }

}

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        height:45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titles: {
        color: '#505050',
        fontSize: 23,
    }

});