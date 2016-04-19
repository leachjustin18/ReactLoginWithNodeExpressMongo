/**
 * Created by Justin.Leach on 4/19/2016.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/lib/text-field';


class App extends React.Component {
    render() {
        return (
            <header>
                <TextField
                    hintText="Hint Text"
                    floatingLabelText="User name"
                />
            </header>
        )
    }
}

const app = document.getElementById('app');

ReactDOM.render(<App/>, app);