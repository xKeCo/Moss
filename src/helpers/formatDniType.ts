export const formatDniType = (dniType: string) => {
  switch (dniType) {
    case 'CC':
      return 'CC';
    case 'TI':
      return 'TI';
    case 'O':
      return 'Otro';
    default:
      return 'Femenino';
  }
};
