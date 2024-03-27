export const formatDate = (date?: string | Date | null, appointmentFormat: boolean = false) => {
  if (!date) return 'N/A';

  if (appointmentFormat) {
    // Format as 22 Nov, Mar

    const dateToDate = new Date(date);

    const dateString = dateToDate.toLocaleDateString('es-ES', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const [weekDay, day, month, _] = dateString.split(' ');

    return `${day} ${month}, ${weekDay.replace(',', '')}`;
  }

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
