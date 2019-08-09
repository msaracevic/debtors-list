import debtorsMock from '../model/debtors-mock';

let debtors;

export function getDebtors(req, res) {
  debtors = debtors || debtorsMock();

  const response = Object.keys(debtors).map(key => {
    return {
      id:                  key,
      name:                debtors[key].name,
      amount:              debtors[key].amount,
      amountLeft:          debtors[key].amountLeft,
      dateOfFirstPurchase: debtors[key].dateOfFirstPurchase
    };
  });
  res.json(response);
}


export function updateDebtor(req, res) {
  debtors = debtors || debtorsMock();

  const id     = req.params.id,
        amount = req.body.amount;

  if (!debtors[id]) throw new Error('Client does not exist');

  debtors[id].amountLeft = debtors[id].amountLeft + (amount - debtors[id].amount);
  debtors[id].amount     = amount;

  const response = {
    id:                  id,
    name:                debtors[id].name,
    amount:              debtors[id].amount,
    amountLeft:          debtors[id].amountLeft,
    dateOfFirstPurchase: debtors[id].dateOfFirstPurchase
  };

  res.json(response);
}
