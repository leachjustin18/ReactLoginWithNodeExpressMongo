/**
 * Created by Justin.Leach on 4/21/2016.
 */
import alt from '../alt';
import RegisterActions from '../actions/RegisterActions';

class RegisterStore {
    constructor() {
        this.bindActions(RegisterActions);
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.userName = '';
        this.password = '';
    }
    
    onUpdateFirstName(event) {
        this.firstName = event.target.value;
    }
    
    onUpdateLastName(event) {
        this.lastName = event.target.value;
    }
    
    onUpdateEmail(event) {
        this.email = event.target.value;
    }
    
    onUpdateUserName(event) {
        this.userName = event.target.value;
    }
    
    onUpdatePassword(event) {
        this.password = event.target.value;
    }
    
    
}

export default alt.createStore(RegisterStore);