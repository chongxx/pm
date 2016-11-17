/**
 * Created by dashzhao on 11/16/16.
 * 渐变的titlebar
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class GradientBar extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <View style={[this.props.style,styles.view_style]}>
                <View style={[styles.view_background, {opacity: this.props.opacityValue}]}/>

                <View style={{
                    backgroundColor: 'gray', position: 'absolute',
                    left: 10,
                    right: 0,
                    top: 10,
                    bottom: 0, width: 30, height: 30,
                    opacity: 1 - this.props.opacityValue,
                    borderRadius:15
                }}>

                </View>
                <Icon style={{ position: 'absolute',
                    left: 13,
                    right: 0,
                    top: 9,
                    bottom: 0,}} name="close" size={30} color="#585eaa"/>
            </View>);
    }

    componentDidMount() {
    }
}

const styles = StyleSheet.create({
    view_style: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: 50,
    },
    view_background: {
        backgroundColor: 'white',
        flex: 1,
    },
    button_container: {
        backgroundColor: 'black',
        opacity: 0.5,
        borderRadius: 20,
        width: 40,
        height: 40,
    },


});