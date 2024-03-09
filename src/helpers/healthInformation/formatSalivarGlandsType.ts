export const formatSalivarGlandsType = (salivarGlandsType?: string | null): string => {
  switch (salivarGlandsType) {
    case 'SinAlteraciones':
      return 'Sin alteraciones';
    case 'Sialorrea':
      return 'Sialorrea';
    case 'Xerostomia':
      return 'Xerostomía';
    case 'Sialolitiasis':
      return 'Sialolitiasis';
    case 'Sialoadenitis':
      return 'Sialoadenitis';
    case 'Tumores':
      return 'Tumores';
    case 'Crecimiento':
      return 'Crecimiento';
    case 'Atrofia':
      return 'Atrofia';
    case 'Hipertrofia':
      return 'Hipertrofia';
    case 'Fistulas':
      return 'Fístulas';
    case 'Quistes':
      return 'Quistes';
    case 'Sialocele':
      return 'Sialocele';
    case 'Ranula':
      return 'Ranula';
    case 'Mucocele':
      return 'Mucocele';
    case 'Sialadenosis':
      return 'Sialadenosis';
    case 'Sialosis':
      return 'Sialosis';
    default:
      return 'N/A';
  }
};
