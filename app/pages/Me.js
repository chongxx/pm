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
    ScrollView
} from "react-native";
import AppBar from '../components/AppBar';
import {WW} from '../utils/DeviceInfo';
import Button from 'react-native-button';
import {observer} from 'mobx-react/native'
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
import observable_me from '../model/MeStore';
@observer
export default class Me extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    render() {
        if (observable_me.me.havaDate) {
            return (
                <ScrollView>
                    <AppBar title='Me'/>
                    <View style={styles.me_data}>
                        <Image style={styles.me_avtar} source={{uri:observable_me.me.avtar}}></Image>
                        <Text>{observable_me.me.name}</Text>
                        <Image></Image>
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
                </ScrollView>
            );
        } else {
            return (<Text style={{fontSize: 50}}>Loading...</Text>)
        }
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

