export interface IToothState {
  id?: string;
  tooth: number;
  cavities: ICavities | null;
  extract: number;
  absent: number;
  crown: number;
  endodontics: number;
  filter: number;
  unerupted: number;
  implant: number;
  regeneration: number;
  initialOdontogramId?: string;
}

export interface ICavities {
  center: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  toothId?: string;
}
