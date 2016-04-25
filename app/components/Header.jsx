/**
 * Created by Justin.Leach on 4/21/2016.
 */
import React from 'react';
import {Link} from 'react-router';
import HeaderStore from '../stores/HeaderStore';
import HeaderActions from '../actions/HeaderActions';


export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = HeaderStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        HeaderStore.listen(this.onChange);
        HeaderActions.getLoggedUser();
    }

    componentWillUnmount() {
        HeaderStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    logCurrentUserOut() {
        HeaderActions.logUserOut();
    }

    render() {
        if (this.state.loggedUser) {
           var test = this.state.loggedUser.map((character, index) => {
                return (
                    <div key={character._id}>
                        <div >
                            {character.userName}

                            <div onClick={this.logCurrentUserOut}>
                                Logout
                            </div>
                        </div>
                        <nav>

                            <Link to="/">Home</Link>
                            <Link to="/users">Users</Link>
                            <Link to="/register">Register</Link>

                        </nav>
                    </div>

                );

            });


            return (
                <div>
                    {test}
                </div>
            )
        } else {

                return (
                    <div>
                        <nav>

                            <Link to="/">Home</Link>
                            <Link to="/users">Users</Link>
                            <Link to="/register">Register</Link>
                            <Link to="/login">Login</Link>
                        </nav>
                    </div>

                );

        }

    }
};