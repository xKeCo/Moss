export const formatEmailDate = (date?: string | Date | null) => {
  if (!date) return 'N/A';

  const dateToDate = new Date(date);

  const dateString = dateToDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return dateString;
};
