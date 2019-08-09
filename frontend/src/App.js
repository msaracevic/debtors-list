import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';

import Debtors from './containers/Debtors';
import Modal from './containers/Modal';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <header className="header">
          <NavLink exact to="/" className="link link--white">Debtors Application</NavLink>
        </header>
        <main className="main">
          <Switch>
            <Route exact path="/debtors" component={Debtors}/>
            <Route exact path="/" component={Home}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </main>
        <Modal/>
      </BrowserRouter>
    );
  }
}

export default App;
