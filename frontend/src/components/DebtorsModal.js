import React, {Component} from 'react';
import {formatNumber} from '../helpers';

export default class DebtorsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: this.props.amount,
      error:  false,
      delta:  0
    };

    // we want to have button disabled on modal load, no point of submitting same value
    this.props.disableSubmit();
  }

  handleInputChage = e => {
    if (isNaN(parseFloat(e.target.value))) return;
    this.handleAmountChange(e.target.value);
  };

  handleAmountChange = inputAmount => {
    const {id, amount, amountLeft, enableSubmit, disableSubmit, updateSubmitData} = this.props;

    const nextState  = {...this.state},
          nextAmount = parseFloat(inputAmount),
          amountUsed = amount - amountLeft;

    let canSubmit = true;

    nextState.amount = nextAmount;
    nextState.delta  = nextAmount - amount;

    // if the entered amount is same as it is currently assigned to client then disable submit
    if (nextState.amount === amount) canSubmit = false;

    // if we are trying to set new limit to less than they already owe and we didn't had this error till now
    // then set error flag and disable submit
    if (nextAmount - amountUsed < 0) {
      nextState.error = true;
      canSubmit       = false;
    }
    // else if we had an error but now we recovered with last change, remove error flag
    else if (nextAmount - amountUsed >= 0 && nextState.error === true) nextState.error = false;

    this.setState(nextState);
    if (canSubmit) {
      updateSubmitData({id, amount: nextAmount});
      enableSubmit();
    } else disableSubmit();
  };

  static renderDeltaMessage(delta, defaultValue, amount) {
    return (
      <p className="debtors-modal__message debtors-modal__message--center">
        {delta > 0 ? 'Increase of ' : 'Decrease of '}
        <span className="debtors-modal__delta">{formatNumber(amount - defaultValue)}</span>
      </p>
    );
  }

  static renderInitialMessage() {
    return (
      <p className="debtors-modal__message debtors-modal__message--center">
        Please set new maximum
      </p>
    );
  }

  static renderErrorMessage(defaultValue, amountLeft) {
    return (
      <p className="debtors-modal__message debtors-modal__message--center debtors-modal__message--error">
        Client already used <span
        className="debtors-modal__error-value">{formatNumber(defaultValue - amountLeft)}</span>
      </p>
    );
  }

  static renderUsed(delta, defaultValue, amount, amountLeft) {
    if (delta !== 0) {
      return (
        <p className="debtors-modal__message debtors-modal__message--center">
          New amount will be set to {formatNumber(amount)}
        </p>
      );
    } else {
      return (
        <p className="debtors-modal__message debtors-modal__message--center">
          Already used <span className="debtors-modal__used">{formatNumber(defaultValue - amountLeft)}</span>
        </p>
      );
    }
  }

  render() {
    const {amount: defaultValue, name, amountLeft} = this.props;
    const {delta, amount, error}                   = this.state;

    return (
      <div className="debtors-modal">
        <h2 className="debtors-modal__name">{name}</h2>
        <form className="debtors-modal__form" onSubmit={e => e.preventDefault()}>
          <label>Amount(€):
            <input name='amount'
                   className='debtors-modal__input'
                   type='number'
                   min='0'
                   pattern="[0-9]+([\.,][0-9]+)?"
                   step="1000"
                   defaultValue={defaultValue.toFixed(0)}
                   onChange={this.handleInputChage}/>
          </label>
        </form>
        {delta !== 0 ? DebtorsModal.renderDeltaMessage(delta, defaultValue, amount) : DebtorsModal.renderInitialMessage()}
        {error ? DebtorsModal.renderErrorMessage(defaultValue, amountLeft) : DebtorsModal.renderUsed(delta, defaultValue, amount, amountLeft)}
      </div>
    );
  }
}
