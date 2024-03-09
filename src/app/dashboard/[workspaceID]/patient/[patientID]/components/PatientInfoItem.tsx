interface PatientInfoItemProps {
  label: string;
  value: string;
  colSpan?: number;
  className?: string;
}

export const PatientInfoItem = ({ label, value, colSpan = 1, className }: PatientInfoItemProps) => {
  return (
    <div className={`flex flex-col gap-1 items-start justify-start col-span-${colSpan}`}>
      <h1 className="text-sm font-medium text-muted-foreground">{label}</h1>
      <p className={className}>{value}</p>
    </div>
  );
};
