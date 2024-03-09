export const formatDoctorType = (doctorType?: string | null) => {
  if (!doctorType) return 'N/A';

  switch (doctorType) {
    case 'G':
      return 'General';
    case 'E':
      return 'Especialista';
    default:
      return 'N/A';
  }
};
