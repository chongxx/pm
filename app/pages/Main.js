import React, {Component} from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ListView,
    DrawerLayoutAndroid,
} from "react-native";
import AppBar from '../components/AppBar';

const window = Dimensions.get('window');
var ScrollableTabView = require('react-native-scrollable-tab-view');
// 新闻类型的地址
const menus_url = 'http://api.woshipm.com/config/menuV3.html?_cP=1080*1920&_cT=Android&_cV=2.4.0';

// 开来有些常用的android的控件被react native 封装了一次是可以直接拿来用的
// Mian是需要返回所有的View 的，在组件didMount之后去请求网络，然后吧拿到的数据在来添加到顶部Tab中去
export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2)=>r1 !== r2,
            }),
            newsTypes: []
        }
    }

    render() {
        let i = 1;
        return (
            <View style={styles.root}>
                <AppBar style={styles.app_bar} title='ahahh'/>
                <ScrollableTabView
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarBackgroundColor="#fcfcfc"
                    tabBarActiveTextColor="#3e9ce9"
                    tabBarInactiveTextColor="#aaaaaa">
                    {
                        this.state.newsTypes.map((item)=> {
                            if (this.state.newsTypes.length <= 0) {
                                return null;
                            }
                            return (
                                <View key={i++} tabLabel={item.cName}>
                                    <Text >Hahaha</Text>
                                </View>
                            );

                        })
                    }
                </ScrollableTabView>
            </View>);
    }

    componentDidMount() {
        fetch(menus_url)
            .then((res)=>res.json())
            .then((resJson)=> {
                this.setState({
                    newsTypes: resJson.RESULT.menus,
                });
            })
            .done();
    }


    // 通过得到的新闻的类型网络请求，然后返回对应新闻的listview
    // renderContent(type) {
    //     return (
    //         <ListView>
    //
    //         </ListView>);
    // }

}

const styles = StyleSheet.create({
    root: {},
    app_bar: {
        flex: 1,
    },
    news_content: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }, tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 2
    }


});