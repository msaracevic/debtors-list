export function getDebtorsList(req, res) {
  const response = [{
    id:                     1,
    name:                   'Musterfirma',
    amount:                 10000.0000,
    amount_left:            4500.0000,
    date_of_first_purchase: '2019-07-07'
  }, {
    id:                     2,
    name:                   'Some Company Inc.',
    amount:                 10000.0000,
    amount_left:            4327.7265,
    date_of_first_purchase: '2019-07-07'
  }];

  res.json(response);
}
