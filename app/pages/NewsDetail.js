/**
 * Created by dashzhao on 10/14/16.
 */
import React, {
    Component
}from 'react';

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
import naviGoBack from '../utils/CommonUtil';
import ActionButton from 'react-native-action-button';
import {TAB_NORMAL_1, styles} from './Main';
import {} from '../utils/ToastUtil'
const link = 'http://api.woshipm.com/news/detailV3.html?_cP=1080*1920&_cT=Android&_cV=2.4.0&cwith=1080&id=';

export default class NewsDetail extends Component {

    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = {
            content: '',
            isLoad: false
        }
    }

    render() {
        if (!this.state.isLoad) {
            console.log('loading....')
            return (<LoadingView />);
        } else {
            console.log('...show content');
            return (
                <View style={{flex: 1}}>
                    <WebView
                        source={{html: this.state.content}}
                    />
                    <ActionButton
                        buttonColor="rgba(231,76,60,1)"
                        onPress={() => {
                            this.favorideNews()
                        }}
                    />
                </View>);
        }
    }

    // 收藏文章
    //
    favorideNews() {
        console.log('save news');
        let news = this.props.route.news;
        AsyncStorage.getItem('newsss', (error, result)=> {
            if (result === null) {
                AsyncStorage.setItem('newsss', '{"news":[' + JSON.stringify(news) + ']}');
            } else {
                let favoride = JSON.parse(result);
                favoride.news.push(news);
                AsyncStorage.setItem('newsss', JSON.stringify(favoride));
            }
        });


    }

    goBack() {
        const {navigator} = this.props;
        const routes = navigator.getCurrentRoutes();
        console.log('route length = ' + routes.length);
        if (routes.length > 1) {
            navigator.pop();
            return true;
        }
        return false;
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    componentDidMount() {
        //这里获取从FirstPageComponent传递过来的参数: id
        let requestLink = link + this.props.route.news.id;
        console.log('link => ' + requestLink);
        setTimeout(()=> {
            fetch(requestLink)
                .then((res)=>res.json())
                .then((resJson)=> {
                    this.setState({
                        content: resJson.RESULT.newsInfo.content,
                        isLoad: true
                    })
                })
                .done();
        }, 500);
    }

    // 组件卸载
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }


}