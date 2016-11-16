/**
 * Created by dashzhao on 11/16/16.
 * 渐变的titlebar
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class GradientBar extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (<View style={[styles.view_style, {opacity: this.props.opacityValue}]}>

        </View>);
    }

    componentDidMount() {
    }
}

const styles = StyleSheet.create({
    view_style: {
        height: 50,
        backgroundColor: 'black',
        position:'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});