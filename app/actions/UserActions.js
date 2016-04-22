/**
 * Created by Justin.Leach on 4/22/2016.
 */
import alt from '../alt';

class UserActions {
    constructor() {
        // this.generateActions(
        //     'getTwoCharactersSuccess'
        // );
    }

    getUsersSuccess(data) {
        return data;
    }

    getUsers() {
        $.ajax({url: '/api/users' })
            .done(data => {
                console.log(data)
                this.getUsersSuccess(data);
            })

    }
}

export default alt.createActions(UserActions);
