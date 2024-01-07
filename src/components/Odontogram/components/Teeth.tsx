import { Fragment } from 'react';
import { Tooth } from './Tooth';
import type { IToothState } from '@/interfaces';
import { cn } from '@/lib/utils';

interface TeethProps {
  start: number;
  end: number;
  x: number;
  y: number;
  odontogramState: IToothState[];
  readOnly?: boolean;
  handleChange: (id: number, toothState: IToothState) => void;
  loading?: boolean;
}

export const Teeth = ({
  start,
  end,
  x,
  y,
  odontogramState,
  readOnly = false,
  handleChange,
  loading = false,
}: Readonly<TeethProps>) => {
  const getArray = (start: number, end: number) => {
    const increment = start <= end ? 1 : -1;
    return Array.from(
      { length: Math.abs(end - start) + 1 },
      (_, index) => start + index * increment
    );
  };

  const tooths = getArray(start, end);

  const polygons = [
    {
      points: '0,0 20,0 15,5 5,5',
      zone: 'top',
    },
    {
      points: '5,15 15,15 20,20 0,20',
      zone: 'bottom',
    },
    {
      points: '15,5 20,0 20,20 15,15',
      zone: 'left',
    },
    {
      points: '0,0 5,5 5,15 0,20',
      zone: 'right',
    },
    {
      points: '5,5 15,5 15,15 5,15',
      zone: 'center',
    },
  ];

  return (
    <g className="scale-[1.2] sm:scale-[1.5] md:scale-[1.7] lg:scale-[2]">
      {loading ? (
        <svg className={cn('cursor-pointer fill-white', readOnly && 'cursor-default')}>
          {tooths.map((i) => (
            <Fragment key={i}>
              <g transform={`translate(${Math.abs((i - start) * 25) + x},${y})`}>
                {polygons.map((polygon) => (
                  <polygon
                    key={polygon.zone}
                    points={polygon.points}
                    className="stroke-black fill-gray-400 stroke-[0.5px]"
                  />
                ))}
              </g>
            </Fragment>
          ))}
        </svg>
      ) : (
        <>
          {tooths.map((i) => (
            <Tooth
              onChange={handleChange}
              key={i}
              number={i}
              positionY={y}
              positionX={Math.abs((i - start) * 25) + x}
              readOnly={readOnly}
              initialState={odontogramState.find((t) => t?.tooth === i)}
            />
          ))}
        </>
      )}
    </g>
  );
};
