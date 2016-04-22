/**
 * Created by Justin.Leach on 4/22/2016.
 */
import alt from '../alt';
import LoginAction from '../actions/LoginActions';

class LoginStore {
    constructor() {
        this.bindActions(LoginAction);
        this.userName = '';
        this.password = ''
    }
    
    onUpdateUserName(event) {
        this.userName = event.target.value;
    }
    
    onUpdatePassword(event) {
        this.password = event.target.value;
    }
    
}

export default alt.createStore(LoginStore);
