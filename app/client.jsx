/**
 * Created by Justin.Leach on 4/21/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory } from 'react-router';

import routes from './routes.jsx';


const app = document.getElementById('app');

ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, app);
