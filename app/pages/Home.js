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
} from "react-native";
import AppBar from '../components/AppBar';
import {toastShort} from '../utils/ToastUtil';
import LoadingView from '../components/LoadingView';
import NewsDetail from './NewsDetail';

const window = Dimensions.get('window');
let [width,height] = [window.width, window.height];
var ScrollableTabView = require('react-native-scrollable-tab-view');
// 新闻类型的地址
const menus_url = 'http://api.woshipm.com/config/menuV3.html?_cP=1080*1920&_cT=Android&_cV=2.4.0';
let news_list_url = 'http://api.woshipm.com/news/listV3.html?_cP=1080*1920&_cT=Android&_cV=2.4.0';

// 开来有些常用的android的控件被react native 封装了一次是可以直接拿来用的
// Home是需要返回所有的View 的，在组件didMount之后去请求网络，然后吧拿到的数据在来添加到顶部Tab中去
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this._onChangeTab = this._onChangeTab.bind(this);
        // this._onRefresh = this._onRefresh.bind(this);
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
        let i = -1;
        return (
            <View style={styles.root}>
                <AppBar title="React Native"/>
                <ScrollableTabView
                    tabBarUnderlineStyle={styles.tabBarUnderline}
                    tabBarBackgroundColor="#fcfcfc"
                    tabBarActiveTextColor="#3e9ce9"
                    tabBarInactiveTextColor="#aaaaaa"
                    onChangeTab={this._onChangeTab}
                >
                    {
                        this.state.newsTypes.map((item)=> {
                            if (this.state.newsTypes.length <= 0) {
                                return null;
                            }

                            return (
                                <View style={styles.news_content} key={i++} tabLabel={item.cName}>
                                    {
                                        this.renderContent(item.eName, i)
                                    }
                                </View>
                            );

                        })
                    }
                </ScrollableTabView>
            </View>);
    }

    componentDidMount() {
        // delay 500ms 是为了在场景切换的时候不卡顿，事实上这很有效果
        setTimeout(()=> {
            fetch(menus_url)
                .then((res)=>res.json())
                .then((resJson)=> {
                    resJson.RESULT.menus
                    this.setState({
                        // 这里这加载五个条目就行了
                        newsTypes: resJson.RESULT.menus.slice(0, 5),
                    });
                })
                .done();
        }, 500);
    }


    // 通过得到的新闻的类型网络请求，然后返回对应新闻的listview
    renderContent(type, position) {
        console.log('position' + position + ' currentPosition' + this.state.currentPosition);
        if (position === this.state.currentPosition) {
            let news_request_list_url = news_list_url + '&type=' + type + '&PS=20';
            if (!this.state.isLoad) {
                console.log('Main request ' + news_request_list_url);
                // 开始请求数据
                fetch(news_request_list_url).then((res)=> {
                    return res.json();
                })
                    .then((resJson)=> {
                        console.log(resJson.RESULT.news[0].title);
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(resJson.RESULT.news),
                            isLoad: true
                        });
                    })
                    .done();
                return <LoadingView/>
            }

            return (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem}

                >
                </ListView>);
        }
    }

    //单个条目的渲染
    renderItem(news) {
        return (
            <TouchableOpacity onPress={()=>this.onPress(news)} style={{}}>
                <View style={styles.item_img}>

                    <Image style={{
                        width: width - 10,
                        height: width / 2 - 10,
                        margin: 5,
                        resizeMode: Image.resizeMode.stretch
                    }}
                           source={{uri: news.imageList[0]}}/>
                    <Text style={{marginTop: -30, marginLeft: width - 30}}>{news.praiseCount}</Text>
                </View>

                <Text style={styles.item_title}>{news.title}</Text>
                <Text style={styles.item_desc}>{news.description}</Text>

                <View style={{flex: 1, flexDirection: 'row', marginLeft: 5}}>
                    <Image style={styles.item_author_avatar} source={{uri: news.UAvatar}}/>
                    <Text style={styles.item_author_name}>{news.creator}</Text>
                    <Text style={styles.item_author_name}>点击量 {news.tClickCount}</Text>
                    <Text style={styles.item_time}>{news.publishTimeStr}</Text>

                </View>

                <View style={styles.divide}></View>
            </TouchableOpacity>);
    }

    // 点击新闻,跳转到新闻详情页
    onPress(news) {
        const {navigator} = this.props;
        navigator.push({
            component: NewsDetail,
            name: 'NewsDetail',
            news
        });
    }

    _onChangeTab({i, ref, from,}) {
        this.setState({
            currentPosition: i,
            isLoad: false
        });

        console.log('i => ' + i + ' ref => ' + ref + ' from => ' + from);
    }

    // _onRefresh(url){
    //     console.log('refresh ===> request : '+url)
    // }


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