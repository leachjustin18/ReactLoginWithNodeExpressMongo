/**
 * Created by Justin.Leach on 4/22/2016.
 */
import React from 'react';
import {Col} from 'react-bootstrap';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import LoginStore from '../stores/LoginStore';
import LoginAction from '../actions/LoginActions';

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = LoginStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        LoginStore.listen(this.onChange);
    }

    componentWillUnmount() {
        LoginStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();

        var userName = this.state.userName;
        var password = this.state.password;


        LoginAction.loginUser(userName, password);
    }


    render() {
        return (

            <form onSubmit={this.handleSubmit.bind(this)}>

                <fieldset>
                    <legend>Login</legend>
                    <TextField hintText="User Name" floatingLabelText="Please enter your user name"
                               fullWidth={true} ref='userNameTextField' value={this.state.userName}
                               onChange={LoginAction.updateUserName} autoFocus/>

                    <TextField hintText="Password" floatingLabelText="Please enter your password"
                               fullWidth={true} ref='passwordTextField' value={this.state.password}
                               onChange={LoginAction.updatePassword}/>


                    <RaisedButton label="Submit" secondary={true} type="submit"/>

                </fieldset>

            </form>

        )
    }
};
