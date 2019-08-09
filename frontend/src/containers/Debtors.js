import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as debtorsActions from '../redux/debtorsActions';
import * as modalActions from '../redux/modalActions';
import {formatDate, formatNumber} from '../helpers';
import LoadingScreen from '../components/LoadingScreen';

class Debtors extends Component {
  componentDidMount() {
    this.props.fetchDebtors();
  }

  handleDebtorAmount = (debtor) => {
    const {showModal, setDebtorAmount} = this.props;

    showModal({
      type:          'DebtorsModal',
      data:          debtor,
      submitHandler: setDebtorAmount
    });
  };

  renderRow(debtor) {
    return (
      <tr key={debtor.id}>
        <td data-label="Name" onClick={() => this.handleDebtorAmount(debtor)}>
          <button className='link'>{debtor.name}</button>
        </td>
        <td data-label="First purchase" className="center">{formatDate(debtor.dateOfFirstPurchase)}</td>
        <td data-label="Max amount" className="number">{formatNumber(debtor.amount)}</td>
        <td data-label="Used amount" className="number">{formatNumber(debtor.amount - debtor.amountLeft)}</td>
        <td data-label="Remaining amount" className="number">{formatNumber(debtor.amountLeft)}</td>
      </tr>
    );
  }

  renderTable(debtors) {
    return (
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
        {debtors && debtors.map(debtor => this.renderRow(debtor))}
        </tbody>
      </table>
    );
  }

  render() {
    const {list: debtors} = this.props.debtors;

    if (!debtors) return <LoadingScreen/>;
    else return (
      <section className="debtors">
        <h1>Current Debtors</h1>
        {debtors.length ? this.renderTable(debtors) : 'No debtors in the system'}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    debtors: state.debtors
  };
};

const mapDispatchToProps = {...debtorsActions, ...modalActions};

export default connect(mapStateToProps, mapDispatchToProps)(Debtors);
