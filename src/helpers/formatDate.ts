export const formatDate = (date: string) => {
  if (!date) return 'N/A';

  const dateToDate = new Date(date);

  const dateString = dateToDate.toLocaleDateString('es-ES', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const [_, day, month, year] = dateString.split(' ');

  return `${day} ${month.toUpperCase()} ${year}`;
};
