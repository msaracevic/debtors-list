export function formatDate(arg) {
  const date = new Date(arg);
  return date.toLocaleDateString('de-de');
}

export function formatNumber(arg) {
  const number = parseFloat(arg);
  return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(number);
}

export function formatPercentage(arg) {
  const number = parseFloat(arg);
  return new Intl.NumberFormat('de-DE', {
    style:                 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(number);
}

export function bem(base, modifiers, checks) {
  let bemClassName = base;
  if (!checks) throw new Error('BEM function called without modifiers');

  modifiers.forEach(modifier => bemClassName += ` ${base}--${modifier}`);

  Object.keys(checks).forEach(key => {if (checks[key]) bemClassName += ` ${base}--${key}`;});

  return bemClassName;
}
