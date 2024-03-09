export const formatGender = (gender?: string | null) => {
  switch (gender) {
    case 'O':
      return 'Otro';
    case 'M':
      return 'Masculino';
    case 'F':
      return 'Femenino';
    default:
      return 'N/A';
  }
};
