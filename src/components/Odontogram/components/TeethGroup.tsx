'use client';
import { Button } from '@/components/ui';
import { Teeth } from './Teeth';

export interface IToothState {
  cavities: {
    center: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  extract: number;
  absent: number;
  crown: number;
  endodontics: number;
  filter: number;
  unerupted: number;
  implant: number;
  regeneration: number;
}

export const TeethGroup = () => {
  let odontogramState: IToothState[] = [];

  const handleToothUpdate = (id: number, toothState: IToothState) => {
    odontogramState[id] = toothState;
  };

  return (
    <>
      <svg
        version="1.1"
        className="my-0 mx-auto h-[180px] w-[486px] sm:h-[226px]  sm:w-[607px]  md:h-[256px] md:w-[688px] lg:h-[310px] lg:w-[810px]"
      >
        <Teeth start={18} end={11} x={0} y={0} handleChange={handleToothUpdate} />
        <Teeth start={21} end={28} x={210} y={0} handleChange={handleToothUpdate} />

        <Teeth start={55} end={51} x={75} y={40} handleChange={handleToothUpdate} />
        <Teeth start={61} end={65} x={210} y={40} handleChange={handleToothUpdate} />

        <Teeth start={85} end={81} x={75} y={80} handleChange={handleToothUpdate} />
        <Teeth start={71} end={75} x={210} y={80} handleChange={handleToothUpdate} />

        <Teeth start={48} end={41} x={0} y={120} handleChange={handleToothUpdate} />
        <Teeth start={31} end={38} x={210} y={120} handleChange={handleToothUpdate} />
      </svg>

      <Button onClick={() => console.log(odontogramState.filter((n) => n))}>Log</Button>
    </>
  );
};
