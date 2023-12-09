export const formatGender = (gender: string) => {
  switch (gender) {
    case 'O':
      return 'Otro';
    case 'M':
      return 'Masculino';
    default:
      return 'Femenino';
  }
};
