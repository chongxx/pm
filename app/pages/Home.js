import React, {Component} from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    ListView,
    DrawerLayoutAndroid,
    Image,
    TouchableOpacity,
    RefershControl,
    NativeModules
} from "react-native";
import AppBar from '../components/AppBar';
import {toastShort} from '../utils/ToastUtil';
import LoadingView from '../components/LoadingView';
const window = Dimensions.get('window');
let [width,height] = [window.width, window.height];
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';
// 新闻类型的地址
const menus_url = 'http://api.woshipm.com/config/menuV3.html?_cP=1080*1920&_cT=Android&_cV=2.4.0';
let news_list_url = 'http://api.woshipm.com/news/listV3.html?_cP=1080*1920&_cT=Android&_cV=2.4.0';

import NewsList from './NewsList';

// 开来有些常用的android的控件被react native 封装了一次是可以直接拿来用的
// Home是需要返回所有的View 的，在组件didMount之后去请求网络，然后吧拿到的数据在来添加到顶部Tab中去
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.renderContentPage = this.renderContentPage.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2)=>r1 !== r2,
            }),
            newsTypes: [],
            isLoad: false,
            currentPosition: 0,

        }
    }

    render() {
        return (
            <View style={styles.root}>
                <AppBar title="React Native"/>
                {this.renderContent()}
            </View>);
    }

    componentDidMount() {
        // delay 500ms 是为了在场景切换的时候不卡顿，事实上这很有效果
        setTimeout(()=> {
            // NativeModules.AndroidToast.show('哈哈哈', NativeModules.AndroidToast.LONG);
            fetch(menus_url)
                .then((res)=>res.json())
                .then((resJson)=> {
                    this.setState({
                        newsTypes: resJson.RESULT.menus
                    });
                })
                .done();
        }, 500);
    }

    renderContent() {
        console.log('state.newsTypes.length ===>' + this.state.newsTypes.length);
        if (this.state.newsTypes.length === 0) {
            return <LoadingView/>
        }

        return (<ScrollableTabView
            tabBarUnderlineStyle={styles.tabBarUnderline}
            tabBarBackgroundColor="#fcfcfc"
            tabBarActiveTextColor="#3e9ce9"
            tabBarInactiveTextColor="#aaaaaa"
            tabBarTextStyle={{marginBottom: 10}}
            tabBarStyle={{height: 36}}
            renderTabBar={()=><ScrollableTabBar style={{height: 40}}/>}>
            {this.renderContentPage()}
        </ ScrollableTabView >);
    }

    renderContentPage() {
        let i = -1;
        let contents = [];
        this.state.newsTypes.map((item)=> {
            contents.push(
                <NewsList navigator={this.props.navigator} tabLabel={item.cName} key={i++}
                          type={item.eName}/>
            );
        })
        return contents;
    }
}


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'white',
    },
    news_content: {
        flex: 1,
    }, tabBarUnderline: {
        backgroundColor: '#3e9ce9',
        height: 2
    },
    item_img: {},
    item_title: {
        fontSize: 15,
        margin: 5,
        color: '#000000',
        marginTop: 15,
    },
    item_desc: {
        fontSize: 12,
        marginLeft: 5,
        marginBottom: 5,
        color: '#505050',
        marginRight: 5,
    },
    divide: {
        width: width - 10,
        margin: 5,
        height: 1,
        backgroundColor: '#213355'
    },
    item_author_avatar: {
        width: 20,
        height: 20,
        borderRadius: 10
    },
    item_author_name: {
        fontSize: 13,
        marginLeft: 10,
    }, item_time: {
        fontSize: 13,
        alignItems: 'flex-end',
        marginLeft: 40,
    }
});
