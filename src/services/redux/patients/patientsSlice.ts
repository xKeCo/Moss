// Redux toolkit
import type { IPatient } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types

interface IPatientsState {
  loading: boolean;
  patients: IPatient[];
  activePatient: IPatient | null;
}

const initialState: IPatientsState = {
  loading: false,
  patients: [],
  activePatient: null,
};

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    onSetLoadingPatients: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadPatients: (state, action: PayloadAction<IPatient[]>) => {
      state.loading = false;
      state.patients = action.payload;
      state.activePatient = null;
    },

    onSetActivePatient: (state, action: PayloadAction<IPatient | null>) => {
      state.loading = false;
      state.activePatient = action.payload;
    },

    onAddNewPatient: (state, action: PayloadAction<IPatient>) => {
      state.patients.push(action.payload);
      state.activePatient = null;
    },

    onUpdatePatient: (state, action: PayloadAction<IPatient>) => {
      state.loading = false;

      state.patients = state.patients.map((patient) => {
        if (patient.dniNumber === action.payload.dniNumber) {
          return action.payload;
        }

        return patient;
      });

      state.activePatient = action.payload;
    },

    onDeletePatient: (state) => {
      state.loading = false;
      if (state.activePatient) {
        state.patients = state.patients.filter(
          (patient) => patient.dniNumber !== state.activePatient!.dniNumber
        );
        state.activePatient = null;
      }
    },

    onLogOutPatients: (state) => {
      state.patients = [];
      state.activePatient = null;
    },
  },
});

export const {
  onSetLoadingPatients,
  onLoadPatients,
  onSetActivePatient,
  onAddNewPatient,
  onUpdatePatient,
  onDeletePatient,
  onLogOutPatients,
} = patientsSlice.actions;
