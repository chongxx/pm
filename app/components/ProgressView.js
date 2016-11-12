/**
 * Created by dashzhao on 11/10/16.
 * progress view
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
export default class ProgressView extends Component {
    render() {
        return (
            <View style={styles.bg_view}>
                <View style={[styles.fg_view, {width: this.props.progress}]}></View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    bg_view: {
        width: 150,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#DCDCDC'
    },
    fg_view: {
        width: 0,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FFFF00'
    }
});
