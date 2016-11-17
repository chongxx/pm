/**
 * Created by dashzhao on 11/16/16.
 */
import {observable} from 'mobx';
class ThreeStore {
    @observable opacity = 0;

    // 这里具体除以多少还是要看控件的移动距离的回调是怎么给值的
    calculateOpacity = (range)=> {
        if (range < 400) {
            console.log("range " + range);
            this.opacity = range / 200;
        }
    }
}

export default new ThreeStore();