export const formatPhone = (phone?: string | null) => {
  if (!phone) return 'N/A';

  if (phone.length === 10) return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  if (phone.length === 7) return phone.replace(/(\d{3})(\d{2})(\d{2})/, '($1) $2 $3');

  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};
