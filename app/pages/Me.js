/**
 * Created by dashzhao on 10/25/16.
 */
import React, {Component} from "react";
// http://stackoverflow.com/a/34015469/988941
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
    AsyncStorage,
    ScrollView,
    LayoutAnimation
} from "react-native";
import AppBar from '../components/AppBar';
import Button from 'react-native-button';
import {observer} from 'mobx-react/native'
const TAB_NORMAL_4 = require('../images/tabbar_4.png');
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
import observable_me from '../model/MeStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressView from '../components/ProgressView';

@observer
export default class Me extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            w: 60,
        }
    }

    render() {
        if (observable_me.me.havaDate) {
            return (
                <ScrollView>
                    <AppBar title='Me'/>
                    <View style={styles.me_data}>
                        <Image style={[styles.me_avtar, {width: this.state.w, height: this.state.w}]}
                               source={{uri: observable_me.me.avtar}}></Image>
                        <Image style={{width: 100, height: 100, tintColor: '#00FF00'}} source={TAB_NORMAL_4}/>
                        <Text>{observable_me.me.name}</Text>
                        <Text>{observable_me.count}</Text>
                        <Icon name="user-circle-o" size={80} color="#FF00FF"/>
                    </View>

                    <Button
                        style={{fontSize: 20, color: 'green'}}
                        styleDisabled={{color: 'red'}}
                        onPress={observable_me.add}>
                        +++
                    </Button>

                    <Button
                        style={{fontSize: 20, color: 'green'}}
                        styleDisabled={{color: 'red'}}
                        onPress={observable_me.reduce}>
                        ---
                    </Button>

                    <Button
                        style={{fontSize: 20, color: 'green'}}
                        styleDisabled={{color: 'red'}}
                        onPress={this.zoomIn}>
                        zoomIn
                    </Button>

                    <Button
                        style={{fontSize: 20, color: 'green'}}
                        styleDisabled={{color: 'red'}}
                        onPress={this.zoomOut}>
                        zoomOut
                    </Button>

                    <ProgressView style={{marginLeft: 10}} progress={observable_me.count}/>
                </ScrollView>
            );
        } else {
            return (<Text style={{fontSize: 50}}>Loading...</Text>)
        }
    }

    zoomIn = () => {
        // 让视图的尺寸变化以动画形式展现
        LayoutAnimation.spring();
        this.setState({w: this.state.w + 15})
    }

    zoomOut = () => {
        // 让视图的尺寸变化以动画形式展现
        LayoutAnimation.spring();
        this.setState({w: this.state.w - 15})
    }

    componentWillMount() {
        LayoutAnimation.spring(); // create animation
    }

    componentDidMount() {
        observable_me.load();
        console.log('component did mount---');
    }
}

const styles = StyleSheet.create({
    me_data: {
        flexDirection: 'row',
        width: 300,
        height: 200,
    },
    me_avtar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});

