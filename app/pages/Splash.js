import React, {Component} from "react";
// 状态栏的颜色改变可以直接使用StatusBar来搞定，挺不错
import {
    StyleSheet, Text, View, Image, Dimensions, StatusBar,
    Navigator,
    Animated
} from "react-native";
import Home from './Home';
var splashRes = require('./../images/splash.png');
const window = Dimensions.get('window');

import Main from './Main';
let [screenWidth, screenHeight] = [window.width, window.height];
export default class Splash extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Animated.Image                         // Base: Image, Text, View
                    source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                    style={{
                        flex: 1,
                        transform: [                        // `transform` is an ordered array
                            {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
                        ]
                    }}
                />


            </View>
        );
    }

    start_animation = () => {

    }

    componentDidMount() {
        this.state.bounceValue.setValue(1.0);     // Start large
        Animated.timing(                          // Base: spring, decay, timing
            this.state.bounceValue,                 // Animate `bounceValue`
            {
                duration: 1000,
                toValue: 1.3,                         // Animate to smaller size
            }
        ).start();// Start the animation

        // 跳转到主页
        setTimeout(()=> {
            const {navigator} = this.props;
            navigator.replace({
                component: Main,
                name: 'Main'
            });
        }, 1000);
    }


}

const styles = StyleSheet.create({
    splash_img: {
        flex: 1,
        width: screenWidth,
        height: screenHeight
    }
});
