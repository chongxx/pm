/**
 * Created by dashzhao on 11/14/16.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Modal,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import Button from 'react-native-button';
import GradientBar from '../components/GradientBar';

import {observer} from 'mobx-react/native';
import threeStore from '../model/ThreeStore';

@observer
export default class ThreePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }


    componentWillMount() {
    }

    _onScroll = (range) => {
        offset = range.nativeEvent.contentOffset.y;
        threeStore.calculateOpacity(offset)
    }

    render() {
        return (

            <View style={{height: 800, position: 'relative'}}>


                <ScrollView
                    style={{}}
                    onScroll={this._onScroll}
                >
                    <View style={{backgroundColor: 'red', height: 400}}></View>
                    <View style={{backgroundColor: 'blue', height: 800}}></View>
                    {/*<View>
                     <Modal
                     animationType={'fade'}
                     transparent={true}
                     visible={this.state.modalVisible}
                     onRequestClose={()=>this.setState({modalVisible: !this.state.modalVisible})}
                     >

                     <View style={{flex: 1, flexDirection: 'row'}}>
                     <TouchableHighlight style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                     onPress={()=>this.setState({modalVisible: !this.state.modalVisible})}>
                     <View style={{backgroundColor: '#00FF00', width: 200, height: 100}}>
                     <View style={{backgroundColor: 'blue', height: 50, width: 50}}>

                     </View>

                     <View style={{backgroundColor: 'red', height: 50, width: 50}}>

                     </View>
                     </View>
                     </TouchableHighlight>
                     </View>

                     </Modal>

                     <Button onPress={()=> Alert.alert(
                     'Alert Title',
                     'On iOS you can specify any number of buttons. Each button can optionally specify a style, which is one of \'default\', \'cancel\' or \'destructive\'.',
                     [
                     {
                     text: 'OK', onPress: () => {
                     this.setState({modalVisible: !this.state.modalVisible})
                     }
                     },
                     {text: 'Cancel', onPress: () => console.log('Foo Pressed!')},
                     ]
                     )
                     }>
                     Alert
                     </Button>
                     <View style={{width: 100, height: 100, opacity: 0.5, backgroundColor: '#00FF00'}}></View>
                     <View style={{width: 100, height: 1550, opacity: 0.5, backgroundColor: '#00FFFF'}}></View>
                     </View>*/}

                </ScrollView>

                <GradientBar opacityValue={threeStore.opacity}/>

            </View>
        );
    }

    componentDidMount() {
    }

}