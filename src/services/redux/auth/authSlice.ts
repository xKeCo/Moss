// Redux toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types

interface InitialUser {
  _id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  photoURL?: string;
}

interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: InitialUser;
  errorMessage?: string;
}

const undefinedUser: InitialUser = {
  _id: undefined,
  name: undefined,
  email: undefined,
  username: undefined,
  role: undefined,
  photoURL: undefined,
};

const initialState: AuthState = {
  status: 'not-authenticated',
  user: undefinedUser,
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onCheckingCredentials: (state) => {
      state.status = 'checking';
      state.user = undefinedUser;
    },

    onLogin: (state, action: PayloadAction<InitialUser>) => {
      state.status = 'authenticated';
      state.user = action.payload;
    },

    onUpdateUser: (state, action: PayloadAction<InitialUser>) => {
      state.user = action.payload;
    },

    onLogout: (state) => {
      state.status = 'not-authenticated';
      state.user = undefinedUser;
    },

    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onLogin,
  onLogout,
  onUpdateUser,
  onCheckingCredentials,
  clearErrorMessage,
} = authSlice.actions;
