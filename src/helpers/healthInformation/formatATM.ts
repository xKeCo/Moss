export const formatATM = (atm?: string | null) => {
  switch (atm) {
    case 'SinAlteraciones':
      return 'Sin alteraciones';
    case 'Brinco':
      return 'Brinco';
    case 'Subluxacion':
      return 'Subluxación';
    case 'Luxacion':
      return 'Luxación';
    case 'Retrodisquitis':
      return 'Retrodisquitis';
    case 'Sinovitis':
      return 'Sinovitis';
    case 'Artrosis':
      return 'Artrosis';
    case 'Anquilosis':
      return 'Anquilosis';
    case 'Fractura':
      return 'Fractura';
    case 'Tumores':
      return 'Tumores';
    case 'Crecimiento':
      return 'Crecimiento';
    case 'Atrofia':
      return 'Atrofia';
    case 'Hipertrofia':
      return 'Hipertrofia';
    default:
      return 'N/A';
  }
};
