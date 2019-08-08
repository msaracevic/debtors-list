import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as debtorsActions from '../redux/debtorsActions';
import {formatDate, formatNumber} from '../helpers';

import LoadingScreen from '../components/LoadingScreen';

class Debtors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: true,
      search:   null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchDebtors().then(() => this.setState({fetching: false}));
  }

  renderRow(debtor) {
    let activeSearch = this.state.search;
    return (
      <React.Fragment key={debtor.id}>
        {activeSearch === null || debtor.name.toLowerCase().indexOf(activeSearch.toLowerCase()) !== -1 ?
          <tr>
            <td data-label="Name">{debtor.name}</td>
            <td data-label="First purchase" className="center">{formatDate(debtor.date_of_first_purchase)}</td>
            <td data-label="Max amount" className="number">{formatNumber(debtor.amount)}</td>
            <td data-label="Used amount" className="number">{formatNumber(debtor.amount - debtor.amount_left)}</td>
            <td data-label="Remaining amount" className="number">{formatNumber(debtor.amount_left)}</td>
          </tr> : null}
      </React.Fragment>
    );
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    if (this.state.fetching && this.props.debtors.length === 0) return <LoadingScreen/>;
    else return (
      <section className="debtors">
        <h1>Current Debtors</h1>
        <p>Search: <input name="search" onChange={this.handleInputChange} placeholder="Name"/></p>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th className="center">First purchase</th>
            <th className="number">Max amount</th>
            <th className="number">Used amount</th>
            <th className="number">Remaining amount</th>
          </tr>
          </thead>
          <tbody>
          {this.props.debtors.map(debtor => this.renderRow(debtor))}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps    = state => state,
      mapDispatchToProps = {...debtorsActions};

export default connect(mapStateToProps, mapDispatchToProps)(Debtors);
