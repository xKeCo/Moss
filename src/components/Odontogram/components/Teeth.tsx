import { Tooth } from './Tooth';
import { IToothState } from '@/interfaces';

interface TeethProps {
  start: number;
  end: number;
  x: number;
  y: number;
  odontogramState: IToothState[];
  readOnly?: boolean;
  handleChange: (id: number, toothState: IToothState) => void;
}

export const Teeth = ({
  start,
  end,
  x,
  y,
  odontogramState,
  readOnly = false,
  handleChange,
}: Readonly<TeethProps>) => {
  const getArray = (start: number, end: number) => {
    const increment = start <= end ? 1 : -1;
    return Array.from(
      { length: Math.abs(end - start) + 1 },
      (_, index) => start + index * increment
    );
  };

  const tooths = getArray(start, end);

  return (
    <g className="scale-[1.2] sm:scale-[1.5] md:scale-[1.7] lg:scale-[2]">
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
    </g>
  );
};
