/**
 * Created by Justin.Leach on 4/19/2016.
 */
import React from 'react';

import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';



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
                <Main/>
                <footer>
                    Footer
                </footer>
            </div>

        )
    };
}