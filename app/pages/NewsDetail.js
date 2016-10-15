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
    BackAndroid
} from "react-native";
import LoadingView from '../components/LoadingView';
import naviGoBack from '../utils/CommonUtil';

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
                </View>);
        }
    }

    goBack() {
        const {navigator} = this.props;
        return naviGoBack(navigator);
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    componentDidMount() {
        //这里获取从FirstPageComponent传递过来的参数: id
        let requestLink = link + this.props.route.news.id;
        console.log('link => ' + requestLink);
        fetch(requestLink)
            .then((res)=>res.json())
            .then((resJson)=> {
                this.setState({
                    content: resJson.RESULT.newsInfo.content,
                    isLoad: true
                })
            })
            .done();
    }

    // 组件卸载
    componentWillUnmmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }


}