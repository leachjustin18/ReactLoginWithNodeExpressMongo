/**
 * Created by Justin.Leach on 4/20/2016.
 */
import React from 'react';
import {Route} from 'react-router';
import App from './App.jsx';
import Home from './Main/Main.jsx';

export default (
    <Route component={App}>
        <Route path='/' component={Home} />
    </Route>
);