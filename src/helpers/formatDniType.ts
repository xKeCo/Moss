export const formatDniType = (dniType: string, longText: boolean = false) => {
  switch (dniType) {
    case 'CC':
      return longText ? 'Cédula de ciudadanía' : 'CC';
    case 'TI':
      return longText ? 'Tarjeta de identidad' : 'TI';
    case 'O':
      return 'Otro';
    default:
      return longText ? 'Cédula de ciudadanía' : 'CC';
  }
};
