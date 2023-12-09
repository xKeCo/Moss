export const formatMaritalStatus = (status: string) => {
  switch (status) {
    case 'S':
      return 'Soltero';
    case 'C':
      return 'Casado';
    case 'V':
      return 'Viudo';
    case 'D':
      return 'Divorciado';
    case 'M':
      return 'Menor de edad';
    default:
      return 'N/A';
  }
};
