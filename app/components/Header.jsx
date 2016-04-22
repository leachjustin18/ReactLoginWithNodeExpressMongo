/**
 * Created by Justin.Leach on 4/21/2016.
 */
import React from 'react';
import {Link} from 'react-router';
import {Nav, NavItem} from 'react-bootstrap';



export default class Header extends React.Component {
  render() {
      return (
          <header>
              <nav>
                  <Nav bsStyle="pills">
                      <NavItem eventKey={1} href="/">Home</NavItem>
                      <NavItem eventKey={2} href="/users">Users</NavItem>
                      <NavItem eventKey={3} href="/register">Register</NavItem>
                  </Nav>
              </nav>
          </header>
      )
  }
};