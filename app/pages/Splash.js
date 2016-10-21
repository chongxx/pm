import React, {Component} from "react";
// 状态栏的颜色改变可以直接使用StatusBar来搞定，挺不错
import {
    StyleSheet, Text, View, Image, Dimensions, StatusBar,
    Navigator
} from "react-native";
import Home from './Home';
var splashRes = require('./../images/splash.png');
const window = Dimensions.get('window');

import Main from './Main';
let [screenWidth, screenHeight] = [window.width, window.height];
export default class Splash extends Component {



    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <StatusBar backgroundColor="#3e9ce9"
                           barStyle="light-content"/>
                <Image source={splashRes} style={styles.splash_img}/>

            </View>
        );
    }


    componentDidMount() {
        // 跳转到主页
        setTimeout(()=> {
            const { navigator } = this.props;
            navigator.push({
                component: Main,
                name: 'Main'
            });
        }, 1000);
    }

}

const styles = StyleSheet.create({
    splash_img: {
        width: screenWidth,
        height: screenHeight
    }
});
