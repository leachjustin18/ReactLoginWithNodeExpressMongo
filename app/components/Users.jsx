/**
 * Created by Justin.Leach on 4/21/2016.
 */
import React from 'react';
import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';
import {Table, striped, bordered, condensed, hover} from 'react-bootstrap'

export default class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = UserStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        UserStore.listen(this.onChange);
        UserActions.getUsers();
    }

    componentWillUnmount() {
        UserStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        var characterNodes = this.state.users.map((character, index) => {
            return (

                <tr key={character._id}>
                    <td>{character._id + 1}</td>
                    <td>{character.firstName}</td>
                    <td>{character.lastName}</td>
                    <td>{character.email}</td>
                    <td>{character.userName}</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
            );
        });

        return (
            <Table
                striped
                bordered
                condensed
                hover>
                < thead >
                < tr >
                    < th >#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th colSpan="2">Actions</th>
                </tr>
                </thead>
                <tbody >

                {characterNodes}
                </tbody>
            </Table>



        )
    }
}