export const formatCurrency = (currency: number): string => {
  if (!currency) {
    return 'N/A';
  }

  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  return formatter.format(currency).slice(0, -3);
};
