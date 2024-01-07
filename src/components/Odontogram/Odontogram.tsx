'use client';
import React from 'react';
import type { IToothState } from '@/interfaces';
import { Teeth } from './components/Teeth';

interface IOdontogramProps {
  odontogramState: IToothState[];
  readOnly?: boolean;
  loading?: boolean;
}

export const Odontogram = ({
  odontogramState = [],
  readOnly = false,
  loading = false,
}: IOdontogramProps) => {
  const handleToothUpdate = (id: number, toothState: IToothState) => {
    if (readOnly) return;

    if (odontogramState.filter((n) => n?.tooth === id).length === 0) {
      odontogramState[id] = toothState;
      return;
    }

    const index = odontogramState.findIndex((n) => n?.tooth === id);

    if (index !== -1) {
      odontogramState[index] = toothState;
    }
  };

  const teethGroup = [
    {
      start: 18,
      end: 11,
      x: 0.5,
      y: 0.5,
    },
    {
      start: 21,
      end: 28,
      x: 209.5,
      y: 0.5,
    },
    {
      start: 55,
      end: 51,
      x: 75,
      y: 40,
    },
    {
      start: 61,
      end: 65,
      x: 209.5,
      y: 40,
    },
    {
      start: 85,
      end: 81,
      x: 75,
      y: 80,
    },
    {
      start: 71,
      end: 75,
      x: 209.5,
      y: 80,
    },
    {
      start: 48,
      end: 41,
      x: 0.5,
      y: 120,
    },
    {
      start: 31,
      end: 38,
      x: 209.5,
      y: 120,
    },
  ];

  return (
    <svg className="my-6 mx-auto h-[180px] w-[486px] sm:h-[226px] sm:w-[607px] md:h-[256px] md:w-[688px] lg:h-[310px] lg:w-[810px]">
      {teethGroup.map(({ start, end, x, y }) => (
        <Teeth
          key={start}
          start={start}
          end={end}
          x={x}
          y={y}
          odontogramState={odontogramState}
          readOnly={readOnly}
          handleChange={handleToothUpdate}
          loading={loading}
        />
      ))}
    </svg>
  );
};
