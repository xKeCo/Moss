export const formatPainThreshold = (painThreshold?: string | null): string => {
  switch (painThreshold) {
    case 'Normal':
      return 'Normal';
    case 'Hipersensibilidad':
      return 'Hipersensibilidad';
    case 'Hiposensibilidad':
      return 'Hiposensibilidad';
    case 'Anestesia':
      return 'Anestesia';
    case 'Parestesia':
      return 'Parestesia';
    case 'Alto':
      return 'Alto';
    case 'Bajo':
      return 'Bajo';
    default:
      return 'N/A';
  }
};
