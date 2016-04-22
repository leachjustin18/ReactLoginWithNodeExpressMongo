/**
 * Created by Justin.Leach on 4/21/2016.
 */
import React from 'react';
import {Link} from 'react-router';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/users">Users</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </header>
        )
    }
};