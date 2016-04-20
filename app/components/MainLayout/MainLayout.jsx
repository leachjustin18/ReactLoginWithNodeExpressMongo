/**
 * Created by Justin.Leach on 4/20/2016.
 */
import React from 'react';
import { Link } from 'react-router'

export default class MainLayout extends React.Component {
  render() {
      return (
          <div className="app">
              <header className="primary-header"></header>
              <aside className="primary-aside">
                  <ul>
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/users">Users</Link></li>
                  </ul>
              </aside>
              <main>
                  {this.props.children}
              </main>
          </div> 
      )
  }
};