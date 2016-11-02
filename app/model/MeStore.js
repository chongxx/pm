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
        this.count = 4;
    }

    load = ()=> {
        console.log('load XiaoMing Data');
        setTimeout(()=> {
            this.me = {havaDate: true, avtar: 'http://p1.qhmsg.com/t01fe66f8128665454c.png', name: 'XiaoMing', gender: 'male'};
        }, 1000);
    }
}

const observableMe = new MeStore();
export default observableMe;


