/**
 * Created by Justin.Leach on 4/21/2016.
 */
import React from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
    render() {
        return (
            <section>
                <Header/>
                {this.props.children}
                <Footer/>

            </section>
        )
    }
}