/**
 * Created by dashzhao on 10/25/16.
 */
import Realm from 'realm';
class News extends Realm.Object {
}
News.schema = {
    name: 'News',
    properties: {
        title: 'string',
    }
}

export default new Realm({schema: News});