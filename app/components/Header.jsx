/**
 * Created by Justin.Leach on 4/21/2016.
 */
import React from 'react';
import {Link} from 'react-router';


export default class Header extends React.Component {
  render() {
      return (
          <header>
              <nav>
                  <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/users">Users</Link></li>
                      <li><Link to="/register">Register</Link></li>
                  </ul>
              </nav>
          </header>
      )
  }
};