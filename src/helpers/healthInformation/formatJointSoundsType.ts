export const formatJointSoundsType = (jointSoundsType?: string | null): string => {
  switch (jointSoundsType) {
    case 'SinAlteraciones':
      return 'Sin alteraciones';
    case 'Click':
      return 'Click';
    case 'Brinco':
      return 'Brinco';
    case 'Crepitacion':
      return 'Crepitación';
    default:
      return 'N/A';
  }
};
