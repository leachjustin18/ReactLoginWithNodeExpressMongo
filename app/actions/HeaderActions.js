/**
 * Created by Justin.Leach on 4/25/2016.
 */
import alt from '../alt';

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
}

export default alt.createActions(HeaderActions);