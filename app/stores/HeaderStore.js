/**
 * Created by Justin.Leach on 4/25/2016.
 */
import alt from '../alt';
import HeaderActions from '../actions/HeaderActions';

class HeaderStore {
    constructor() {
        this.bindActions(HeaderActions);
        this.loggedUser = null;
    }

    onGetLoggedUserSuccess(user) {
        return this.loggedUser = user;
    }
}

export default alt.createStore(HeaderStore);