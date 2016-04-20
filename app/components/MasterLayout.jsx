/**
 * Created by Justin.Leach on 4/19/2016.
 */
import React from 'react';
import {Route, Router, IndexRoute, browserHistory } from 'react-router';
import { createHistory } from 'history';
import Header from './Header/Header.jsx';
import Home from './Home/Home.jsx';
import MainLayout from './MainLayout/MainLayout.jsx';
import SearchLayout from './Search/Search.jsx';
import UserList from './UserList/UserList.jsx';




export default class MasterLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: 'React Login'
        };
    }
    render() {
        return (
            <div>
                <Header title={this.state.title}/>
                
                <Router history={browserHistory}>
                    <Route path="/" component={MainLayout}>
                        <IndexRoute component={Home} />
                        <Route component={SearchLayout}>
                            <Route path="users" component={UserList} />

                        </Route>
                    </Route>
                </Router>


                <footer>
                    Footer
                </footer>
            </div>

        )
    };
}