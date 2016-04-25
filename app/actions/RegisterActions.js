/**
 * Created by Justin.Leach on 4/21/2016.
 */
import alt from '../alt';
import { browserHistory } from 'react-router';


class UserActions {
    constructor() {
        this.generateActions(
            'updateFirstName',
            'updateLastName',
            'updateEmail',
            'updateUserName',
            'updatePassword'
        );
    }

    addUser(firstName, lastName, email, userName, password) {
        $.ajax({
                type: 'POST',
                url: '/api/users',
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    userName: userName,
                    password: password
                }
            })
            .done(() => {
                browserHistory.push('/users');
            })
    }


}

export default alt.createActions(UserActions);