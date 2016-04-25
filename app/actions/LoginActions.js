/**
 * Created by Justin.Leach on 4/22/2016.
 */
import alt from '../alt';
import { browserHistory } from 'react-router';
import $ from 'jquery';

class LoginActions {
    constructor() {
        this.generateActions(
            'updateUserName',
            'updatePassword'
        )

    }

    loginUser(username, password) {
        $.ajax({
                type: 'POST',
                url: '/api/users/session',
                data: {
                    userName: username,
                    password: password
                }
            })
            .done(() => {
                browserHistory.push('/');
                location.reload();
            });

    }
}

export default alt.createActions(LoginActions);