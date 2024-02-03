import { cn } from '@/lib/utils';
import { Fragment } from 'react';

export const OdontogramSkeleton = () => {
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

  const getArray = (start: number, end: number) => {
    const increment = start <= end ? 1 : -1;
    return Array.from(
      { length: Math.abs(end - start) + 1 },
      (_, index) => start + index * increment
    );
  };

  return (
    <svg className="my-6 mx-auto h-[180px] w-[486px] sm:h-[226px] sm:w-[607px] md:h-[256px] md:w-[688px] lg:h-[310px] lg:w-[810px]">
      <g className="scale-[1.2] sm:scale-[1.5] md:scale-[1.7] lg:scale-[2]">
        {teethGroup.map(({ start, end, x, y }) => {
          const tooths = getArray(start, end);

          return (
            <svg className={cn('fill-white cursor-default')} key={start}>
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
          );
        })}
      </g>
    </svg>
  );
};
