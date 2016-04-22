/**
 * Created by Justin.Leach on 4/21/2016.
 */
import React from 'react';
import {Route} from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Users from './components/Users.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

export default (
    <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
    </Route>
)
