/**
 * Created by dashzhao on 11/2/16.
 */
import {Dimensions} from 'react-native';
const window = Dimensions.get('window');
// let [width,height] = [window.width, window.height];
export const WW = {};

WW.getWidth = () => {
    return window.width;
}

WW.getHeight = () => {
    return window.height;
}
