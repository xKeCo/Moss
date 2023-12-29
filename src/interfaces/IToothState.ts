export interface IToothState {
  tooth: number;
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
