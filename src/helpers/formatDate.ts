export const formatDate = (date: string, showTime: boolean = false) => {
  if (!date) return 'N/A';

  const dateSting = date.toString();

  const [_, month, day, year] = dateSting.split(' ');

  return `${month} ${day} ${year}`;
};
