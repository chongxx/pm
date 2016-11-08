/**
 * Created by dashzhao on 11/2/16.
 */
import {observable, action} from 'mobx';
class MeStore {
    @observable count = 2;
    @observable me = {
        havaDate: false,
        avtar: '',
        name: '',
        gender: ''
    }

    add = ()=> {
        this.count++;
        // console.log("====" + this.count);
    }

    reduce = ()=> {
        this.count--;
    }

    // 这样就可以把业务逻辑都放在store中来处理，component 上面看起来就清晰多了，
    // 这些方法都是异步调用的吗？那就是说这些网络请求，计算等等耗时的操作不会导致UI的卡顿
    // It was so wonderful!
    load = ()=> {
        console.log('load XiaoMing Data');
        setTimeout(()=> {
            this.me = {
                havaDate: true,
                avtar: 'http://p1.qhmsg.com/t01fe66f8128665454c.png',
                name: 'XiaoMing',
                gender: 'male'
            };
        }, 1000);
    }
}

const observableMe = new MeStore();
export default observableMe;



