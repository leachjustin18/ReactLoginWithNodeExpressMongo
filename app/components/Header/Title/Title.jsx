/**
 * Created by Justin.Leach on 4/19/2016.
 */
import React from 'react';

export  default class Title extends React.Component {
    render() {
        return (
            <h1>{this.props.title}</h1>
        )
    }
};