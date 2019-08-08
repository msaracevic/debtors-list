import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='home'>
          <h1>Dashboard</h1>
          <NavLink exact to="/debtors" className="link link--panel">
            List of debtors
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}
