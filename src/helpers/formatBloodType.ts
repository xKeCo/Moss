export const formatBloodType = (bloodType: string) => {
  if (!bloodType) {
    return 'N/A';
  }

  const [bloodGroup, rhesusFactor] = bloodType.split('_');
  const rhesusSymbol = rhesusFactor === 'POSITIVE' ? '+' : '-';
  const bloodTypeFormatted = `${bloodGroup}${rhesusSymbol}`;
  return bloodTypeFormatted;
};
