/**
 * Created by Justin.Leach on 4/19/2016.
 */
import React from 'react';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';

export default class Main extends React.Component {
    render() {
        return (
            <main>
                <TextField hintText="First name" underlineShow={false} fullWidth={true}/>
                <Divider/>
                <TextField hintText="Last name" underlineShow={false} fullWidth={true}/>
                <Divider/>
                <TextField hintText="Username" underlineShow={false} fullWidth={true}/>
                <Divider/>
                <TextField hintText="Email" type="email" underlineShow={false} fullWidth={true}/>
                <Divider/>
            </main>
        )
    }
}