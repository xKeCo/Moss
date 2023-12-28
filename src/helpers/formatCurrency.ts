export const formatCurrency = (currency: number): string => {
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  return formatter.format(currency).slice(0, -3);
};
