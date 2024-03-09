export const formatTongue = (tongue?: string | null) => {
  switch (tongue) {
    case 'SinAlteraciones':
      return 'Sin alteraciones';
    case 'Bifida':
      return 'Bífida';
    case 'Geografica':
      return 'Geográfica';
    case 'Fisurada':
      return 'Fisurada';
    case 'Macroglosia':
      return 'Macroglosia';
    case 'Microglosia':
      return 'Microglosia';
    case 'Pliegues':
      return 'Pliegues';
    case 'Frenillos':
      return 'Frenillos';
    case 'Ulceras':
      return 'Úlceras';
    case 'Quemaduras':
      return 'Quemaduras';
    case 'Mordeduras':
      return 'Mordeduras';
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
