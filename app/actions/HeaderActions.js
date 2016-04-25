/**
 * Created by Justin.Leach on 4/25/2016.
 */
import alt from '../alt';
import $ from 'jquery';

class HeaderActions {
    constructor() {
        this.generateActions(
            'getLoggedUserSuccess'
        );
    }

    getLoggedUser() {
        $.ajax({url: '/api/users/session'})
            .done(data => {
                this.getLoggedUserSuccess(data);
            })
    }

    logUserOut() {
        $.ajax({url: '/logout'})
            .done(() => {
                location.reload();
            })
    }
}

export default alt.createActions(HeaderActions);