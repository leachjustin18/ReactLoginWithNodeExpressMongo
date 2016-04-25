/**
 * Created by Justin.Leach on 4/22/2016.
 */
import alt from '../alt';
import $ from 'jquery';

class UserActions {
    constructor() {
        this.generateActions(
            'getUsersSuccess'
        );
    }

    getUsers() {
        $.ajax({url: '/api/users'})
            .done(data => {
                this.getUsersSuccess(data);
            })
    }
}

export default alt.createActions(UserActions);
