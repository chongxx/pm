/**
 * Created by dashzhao on 10/13/16.
 */

import React, {Component} from "react";
import {
    Navigator,
    Dimensions
} from "react-native";

import Splash from './pages/Splash'
let tempNavigator; // 全局使用一个navigator，通过这个navigator的栈可以返回上一个界面
const window = Dimensions.get('window');

export let [width,height] = [window.width, window.height];

export default class App extends Component {

    //TODO 这是JS的里面的静态方法吗？具体是什么意思呢？
    static ConfigureScene() {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {
        return (
            <Navigator
                configureScene={this.ConfigureScene}
                initialRoute={{
                    component: Splash,
                    name: 'Splash'
                }}
                renderScene={this.renderScene}
            />
        );
    }


    // Navigator进行页面跳转，和把route and navigator往下传递
    renderScene(route, navigator) {
        const Component = route.component;
        tempNavigator = navigator;
        return (<Component navigator={navigator} route={route}/>);
    }
}
