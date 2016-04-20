/**
 * Created by Justin.Leach on 4/20/2016.
 */
import React from 'react';

export default class SearchLayout extends React.Component {
  render() {
      return (
          <div className="search">
              <header className="search-header"></header>
              <div className="results">
                  {this.props.children}
              </div>
              <div className="search-footer pagination"></div>
          </div>
      )
  }  
};