/**
 * Created by dashzhao on 11/7/16.
 * use show news list
 */
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
    WebView,
    BackAndroid,
    AsyncStorage
} from "react-native";
import LoadingView from '../components/LoadingView';
import NewsDetail from './NewsDetail';
let news_list_url = 'http://api.woshipm.com/news/listV3.html?_cP=1080*1920&_cT=Android&_cV=2.4.0';
const window = Dimensions.get('window');
let [width,height] = [window.width, window.height];



export default class NewsList extends Component {


    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.state = {
            isLoad: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2)=>r1 !== r2,
            }),
        }
    }

    render() {
        let news_request_list_url = news_list_url + '&type=' + this.props.type + '&PS=20';
        if (!this.state.isLoad) {
            console.log('Main request ' + news_request_list_url);

            // 开始请求数据
            setTimeout(()=> {
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
            }, 500);

            return <LoadingView/>
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderItem}
            >
            </ListView>);
    }

    //单个条目的渲染
    renderItem = (news)=> {
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
    onPress(news){
        console.log('click item.');
        const {navigator} = this.props;
        navigator.push({
            component: NewsDetail,
            name: 'NewsDetail',
            news
        });
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