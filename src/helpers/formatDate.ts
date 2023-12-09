export const formatDate = (date: string) => {
  if (!date) return 'N/A';

  const [year, month, day] = date.split('T')[0].split('-');
  return `${day}/${month}/${year}`;
};
