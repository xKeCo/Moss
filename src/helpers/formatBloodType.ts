export const formatBloodType = (bloodType: string) => {
  const [bloodGroup, rhesusFactor] = bloodType.split('_');
  const rhesusSymbol = rhesusFactor === 'POSITIVE' ? '+' : '-';
  const bloodTypeFormatted = `${bloodGroup}${rhesusSymbol}`;
  return bloodTypeFormatted;
};
