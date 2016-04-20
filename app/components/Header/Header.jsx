/**
 * Created by Justin.Leach on 4/19/2016.
 */
import React from 'react';

import Title from './Title/Title.jsx';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <Title title={this.props.title}/>
            </header>
        )  
    };
};