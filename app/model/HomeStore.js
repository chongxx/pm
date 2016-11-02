/**
 * Created by dashzhao on 10/21/16.
 */
import {observable} from 'mobx';
// 首页的列表数据
const homeStore = observable({
    data: {}
})

// type:请求的新闻数据类型
homeStore.getData = (type)=>{

}

export default homeStore;