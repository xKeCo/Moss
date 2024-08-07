export interface IWorkspace {
  id: string;
  name: string;
  key: string;
  logoURL: string;
  createdAt: Date;
  updatedAt: Date;
  users: IUser[];
}
export interface IUser {
  id: string;
  email: string;
  username: string;
  name: string;
  photoURL: string;
  workspaces: IWorkspace[];
  createdAt: string;
  updatedAt: string;
}
