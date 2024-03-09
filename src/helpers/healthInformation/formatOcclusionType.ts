export const formatOcclusionType = (occlusionType?: string | null): string => {
  switch (occlusionType) {
    case 'ClaseI':
      return 'Clase I';
    case 'ClaseII':
      return 'Clase II';
    case 'ClaseIII':
      return 'Clase III';
    case 'MordidaAbierta':
      return 'Mordida abierta';
    case 'MordidaCruzada':
      return 'Mordida cruzada';
    case 'MordidaProfunda':
      return 'Mordida profunda';
    case 'Organica':
      return 'Orgánica';
    case 'EnGrupo':
      return 'En grupo';
    case 'BilateralBalanceada':
      return 'Bilateral balanceada';
    default:
      return 'N/A';
  }
};
