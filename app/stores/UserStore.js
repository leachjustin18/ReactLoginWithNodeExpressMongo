/**
 * Created by Justin.Leach on 4/22/2016.
 */
import alt from '../alt';
import UserActions from '../actions/UserActions';

class UserStore {
    constructor() {
        this.bindActions(UserActions);
        this.users = [];
    }

    onGetUsersSuccess(data) {
        return this.users = data;
    }
}

export default alt.createStore(UserStore);
