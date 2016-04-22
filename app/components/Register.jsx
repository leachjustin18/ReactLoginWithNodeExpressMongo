/**
 * Created by Justin.Leach on 4/21/2016.
 */
import React from 'react';
import {Col} from 'react-bootstrap';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import RegisterStore from '../stores/RegisterStore';
import RegisterActions from '../actions/RegisterActions';


export default class Register extends React.Component {
    constructor() {
        super();
        this.state = RegisterStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        RegisterStore.listen(this.onChange);
    }

    componentWillUnmount() {
        RegisterStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();

        var firstName = this.state.firstName;
        var lastName = this.state.lastName;
        var email = this.state.email;
        var userName = this.state.userName;
        var password = this.state.password;

        RegisterActions.addUser(firstName, lastName, email, userName, password);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
               
                    <Col xs={12}>Register</Col>
                    <Col xs={12}>
                        <TextField hintText="First Name" floatingLabelText="Please enter your first name"
                                   fullWidth={true} ref='firstNameTextField' value={this.state.firstName}
                                   onChange={RegisterActions.updateFirstName} autoFocus/>


                    </Col>
                    <Col xs={12}>
                        <TextField hintText="Last Name" floatingLabelText="Please enter your last name"
                                   fullWidth={true} ref="lastNameTextField" value={this.state.lastName}
                                   onChange={RegisterActions.updateLastName}/>
                    </Col>
                    <Col xs={12}>
                        <TextField hintText="Email" floatingLabelText="Please enter your email" fullWidth={true}
                                   type="email" ref="emailTextField" value={this.state.email}
                                   onChange={RegisterActions.updateEmail}/>
                    </Col>
                    <Col xs={12}>
                        <TextField hintText="Username" floatingLabelText="Please enter your username" fullWidth={true}
                                   ref="userNameTextField" value={this.state.userName}
                                   onChange={RegisterActions.updateUserName}/>
                    </Col>
                    <Col xs={12}>
                        <TextField hintText="Password" floatingLabelText="Please enter your password" fullWidth={true}
                                   ref="passwordTextField" value={this.state.password}
                                   onChange={RegisterActions.updatePassword}/>
                    </Col>

                    <Col xs={12}>
                        <RaisedButton label="Submit" secondary={true} type="submit"/>
                    </Col>
              
            </form>
        )
    }
}