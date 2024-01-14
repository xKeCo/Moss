export interface IToothState {
  tooth: number;
  cavities: ICavities;
  extract: number;
  absent: number;
  crown: number;
  endodontics: number;
  filter: number;
  unerupted: number;
  implant: number;
  regeneration: number;
}

interface ICavities {
  toothId: number;
  center: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
}
