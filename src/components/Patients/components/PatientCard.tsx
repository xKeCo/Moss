import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { IPatientCard } from '@/interfaces';
import React from 'react';

interface IPatientGridProps {
  patient: IPatientCard;
}

export const PatientCard = ({ patient }: IPatientGridProps) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={patient?.photoURL ?? ''} alt={patient?.name || ''} />
        <AvatarFallback>
          {patient?.name
            .split(' ')
            .map((name) => name[0])
            .join('')}
        </AvatarFallback>
      </Avatar>

      <div>
        <h3 className="text-lg font-semibold">{patient?.name}</h3>
        <p className="text-sm text-gray-500">{patient?.email}</p>
      </div>
    </div>
  );
};

PatientCard.Skeleton = function PatientCardSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>S</AvatarFallback>
      </Avatar>

      <div>
        <h3 className="text-lg font-semibold">Sergio</h3>
        <p className="text-sm text-gray-500">posada@posada.com</p>
      </div>
    </div>
  );
};
