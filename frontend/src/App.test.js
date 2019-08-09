import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {IntlProvider, addLocaleData} from 'react-intl';
import de from 'react-intl/locale-data/de.js';

import DebtorsModal from './components/DebtorsModal';

Enzyme.configure({adapter: new Adapter()});

describe('DebtorsModal', () => {
  addLocaleData([...de]);

  const props = {
    id:                  1,
    name:                'Test GmbH',
    amount:              10000,
    amountLeft:          4500,
    dateOfFirstPurchase: `2019-07-2`,
    updateSubmitData:    () => {},
    enableSubmit:        () => {},
    disableSubmit:       () => {}
  };

  it('Renders proper name on the modal', () => {
    const modalTest = mount(
      <IntlProvider locale="de">
        <DebtorsModal {...props} />
      </IntlProvider>);
    expect(modalTest.find('.debtors-modal__name').text()).toEqual(props.name);
  });

  it('Renders proper usedAmount on the modal with correct formatting', () => {
    const modalTest = mount(
      <IntlProvider locale="de">
        <DebtorsModal {...props} />
      </IntlProvider>);
    expect(modalTest.find('.debtors-modal__used').text()).toEqual('€ 5,500.00');
  });

  it('Accepts increasing changes into input', () => {
    const modalTest = mount(
      <IntlProvider locale="de">
        <DebtorsModal {...props} />
      </IntlProvider>);
    modalTest.find('input').simulate('change', {target: {value: '12000'}});
    expect(modalTest.find('.debtors-modal__delta').text()).toEqual('€ 2,000.00');
  });

  it('Accepts decreasing changes into input', () => {
    const modalTest = mount(
      <IntlProvider locale="de">
        <DebtorsModal {...props} />
      </IntlProvider>);
    modalTest.find('input').simulate('change', {target: {value: '8000'}});
    expect(modalTest.find('.debtors-modal__delta').text()).toEqual('-€ 2,000.00');
  });

  it('Accepts decimal values and rounds properly', () => {
    const modalTest = mount(
      <IntlProvider locale="de">
        <DebtorsModal {...props} />
      </IntlProvider>);
    modalTest.find('input').simulate('change', {target: {value: '12000.22'}});
    expect(modalTest.find('.debtors-modal__delta').text()).toEqual('€ 2,000.22');

    modalTest.find('input').simulate('change', {target: {value: '12000.4444'}});
    expect(modalTest.find('.debtors-modal__delta').text()).toEqual('€ 2,000.44');
  });

  it('Errors when value is less than allowed', () => {
    const modalTest = mount(
      <IntlProvider locale="de">
        <DebtorsModal {...props} />
      </IntlProvider>);
    modalTest.find('input').simulate('change', {target: {value: '4000'}});
    expect(modalTest.find('.debtors-modal__delta').text()).toEqual('-€ 6,000.00');
    expect(modalTest.find('.debtors-modal__error-value').text()).toEqual('€ 5,500.00');
  });
});
