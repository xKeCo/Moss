export const formatPhone = (phone: string) => {
  if (!phone) return 'N/A';

  return phone ? phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : 'N/A';
};
