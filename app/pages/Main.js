/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    StatusBar,
} from 'react-native';

//引入tabbar支持包
import TabNavigator from 'react-native-tab-navigator';
//首页
import Home from './Home';
import Me from './Me';

const TabNavigatorItem = TabNavigator.Item;

export const TAB_NORMAL_1 = require('../images/tabbar_1.png');
const TAB_NORMAL_2 = require('../images/tabbar_2.png');
const TAB_NORMAL_3 = require('../images/tabbar_3.png');
const TAB_NORMAL_4 = require('../images/tabbar_4.png');
const TAB_PRESS_1 = require('../images/tabbar_1_press.png');
const TAB_PRESS_2 = require('../images/tabbar_2_press.png');
const TAB_PRESS_3 = require('../images/tabbar_3_press.png');
const TAB_PRESS_4 = require('../images/tabbar_4_press.png');

import {observer} from 'mobx-react/native'
import observable_me from '../model/MeStore';
import Playground from './Animation';
export default class Main extends Component {

    constructor() {
        super();
        this.state = {
            selectedTab: 'read',
        }
    }

    /**
     tab点击方法
     **/
    onPress(tabName) {
        if (tabName) {
            this.setState(
                {
                    selectedTab: tabName,
                }
            );
        }
    }

    /**
     渲染每项
     **/
    renderTabView(title, tabName, tabContent, isBadge) {
        var tabNomal;
        var tabPress;
        switch (tabName) {
            case 'read':
                tabNomal = TAB_NORMAL_1;
                tabPress = TAB_PRESS_1;
                break;
            case 'question':
                tabNomal = TAB_NORMAL_2;
                tabPress = TAB_PRESS_2;
                break;
            case 'find':
                tabNomal = TAB_NORMAL_3;
                tabPress = TAB_PRESS_3;
                break;
            case 'me':
                tabNomal = TAB_NORMAL_4;
                tabPress = TAB_PRESS_4;
                break;
            default:

        }
        return (
            <TabNavigatorItem
                title={title}
                renderIcon={()=><Image style={styles.tabIcon} source={tabNomal}/>}
                renderSelectedIcon={()=><Image style={styles.tabIcon} source={tabPress}/>}
                selected={this.state.selectedTab === tabName}
                selectedTitleStyle={{color: '#f85959'}}
                onPress={()=>this.onPress(tabName)}
                renderBadge={()=>isBadge ?
                    <View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View> : null}>
                {
                    this.tabPage(tabName, tabContent)
                }
            </TabNavigatorItem>
        );
    }

    tabPage(tabName, tabContent) {
        switch (tabName) {
            case 'read':
                return (<Home navigator={this.props.navigator}/>);
            case 'question':
                return (<Playground />);
            case 'find':
                return (<View
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>{tabContent}</Text></View>);
            case 'me':
                // const NewMe = observer(Me);
                // return (<NewMe store={observable_me}/>);
                return <Me/>
        }
    }

    /**
     自定义tabbar
     **/
    tabBarView() {
        return (
            <View style={{flex: 1}}>
                <TabNavigator
                    tabBarStyle={styles.tab}
                >
                    {this.renderTabView('阅读', 'read', 'home', false)}
                    {this.renderTabView('问答', 'question', '问答', false)}
                    {this.renderTabView('发现', 'find', '发现', false)}
                    {this.renderTabView('我的', 'me', '我的', false)}
                </TabNavigator>
            </View>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                {this.tabBarView()}
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',

    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tab: {
        height: 52,
        alignItems: 'center',
        backgroundColor: '#f4f5f6',
    },
    tabIcon: {
        width: 25,
        height: 25,
    },
    badgeView: {
        width: 22,
        height: 14,
        backgroundColor: '#f85959',
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 5,
        borderColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 8,
    }
});