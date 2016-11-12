/**
 * Created by dashzhao on 11/10/16.
 */
import React from "react";
import {
    View,
    Text,
    Image,
    Animated, Easing
} from "react-native";
import Button from 'react-native-button';

export default class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        };
    }

    render() {
        return (
            <Animated.View style={{
                flex: 1,
                rsd: this.state.bounceValue,
            }}>
                <Image                         // Base: Image, Text, View
                    source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                    style={{
                        flex: 1
                    }}
                />

                <Button
                    style={{fontSize: 20, color: 'green'}}
                    styleDisabled={{color: 'red'}}
                    onPress={this.start_animation}>
                    diandia
                </Button>

            </Animated.View>
        );
    }

    start_animation = () => {
        this.state.bounceValue.setValue(0);     // Start large
        Animated.timing(                          // Base: spring, decay, timing
            this.state.bounceValue,                 // Animate `bounceValue`
            {
                duration: 3000,
                toValue: 1,
            }
        ).start();
    }

    componentDidMount() {
        // this.state.bounceValue.setValue(0.7);     // Start large
        // Animated.timing(                          // Base: spring, decay, timing
        //     this.state.bounceValue,                 // Animate `bounceValue`
        //     {
        //         duration: 5000,
        //         toValue: 0,                         // Animate to smaller size
        //         friction: 0.5,                          // Bouncier spring
        //     }
        // ).start();                                // Start the animation
    }
}
