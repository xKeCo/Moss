import { IToothState } from './TeethGroup';
import { Tooth } from './Tooth';

interface TeethProps {
  start: number;
  end: number;
  x: number;
  y: number;
  handleChange: (id: number, toothState: IToothState) => void;
}

export const Teeth = ({ start, end, x, y, handleChange }: Readonly<TeethProps>) => {
  const getArray = (start: number, end: number) => {
    const list = [];

    const increment = start <= end ? 1 : -1;
    for (let i = start; i !== end + increment; i += increment) {
      list.push(i);
    }

    return list;
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
        />
      ))}
    </g>
  );
};
