export function formatDate(arg) {
  const date = new Date(arg);
  return date.toLocaleDateString('de-de');
}

export function formatNumber(arg) {
  const number = parseFloat(arg);
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number);
}
