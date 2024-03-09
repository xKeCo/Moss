export const formatOralHabits = (oralHabits?: string | null): string => {
  switch (oralHabits) {
    case 'Saludables':
      return 'Saludables';
    case 'SuccionLingual':
      return 'Succión lingual';
    case 'SuccionDigital':
      return 'Succión digital';
    case 'Onicofagia':
      return 'Onicofagia';
    case 'Bruxismo':
      return 'Bruxismo';
    case 'Tabaco':
      return 'Tabaco';
    case 'ModerObjetos':
      return 'Morder objetos';
    case 'Otros':
      return 'Otros';
    default:
      return 'N/A';
  }
};
