import { IToothState } from './TeethGroup';
import Tooth from './Tooth';

interface TeethProps {
  start: number;
  end: number;
  x: number;
  y: number;
  handleChange: (id: number, toothState: IToothState) => void;
}

function Teeth({ start, end, x, y, handleChange }: Readonly<TeethProps>) {
  const getArray = (start: number, end: number) => {
    const list = [];

    if (start <= end) {
      for (let i = start; i <= end; i++) {
        list.push(i);
      }
    } else {
      for (let i = start; i >= end; i--) {
        list.push(i);
      }
    }

    return list;
  };

  const tooths = getArray(start, end);

  return (
    <g transform="scale(2)" id="gmain">
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
}

export default Teeth;
