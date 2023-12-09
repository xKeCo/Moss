export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'A' | 'U';
  photoURL: string;
}
