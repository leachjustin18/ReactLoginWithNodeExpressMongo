/**
 * Created by Justin.Leach on 4/22/2016.
 */
import alt from '../alt';

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
            url: '/api/users',
            data: {
                userName: username,
                password: password,
                saveUser: false
            }
        });

    }
}

export default alt.createActions(LoginActions);