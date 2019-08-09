function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function () {
  const debtors = {};
  const names   = ['Musterfirma',
                   'Some Company Inc.',
                   'Mitte GmbH',
                   'Wilmersdorf GmbH',
                   'Charlottenburg GmbH',
                   'Schöneberg GmbH'];

  names.forEach((name, index) => {
    const amount   = parseFloat(randomNumber(10, 20) * 1000);
    debtors[index] = {
      name:                name,
      amount:              amount,
      amountLeft:          amount - parseFloat(((randomNumber(1000000, 5000000)) / 1000).toFixed(4)),
      dateOfFirstPurchase: `2019-07-${index + 1}`
    };
  });

  return debtors;
}
