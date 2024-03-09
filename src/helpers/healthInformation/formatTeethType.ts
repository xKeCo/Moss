export const formatTeethType = (teethType?: string | null): string => {
  switch (teethType) {
    case 'Temporales':
      return 'Temporales';
    case 'Mixto':
      return 'Mixto';
    case 'Permanentes':
      return 'Permanentes';
    case 'EdentuloTotal':
      return 'Edéntulo Total';
    case 'EdentuloParcial':
      return 'Edéntulo Parcial';
    case 'Agenesias':
      return 'Agenesias';
    case 'Anodoncia':
      return 'Anodoncia';
    default:
      return 'N/A';
  }
};
