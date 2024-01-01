// Redux toolkit
import { ITreatment } from '@/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types

interface ITreatmentsState {
  loading: boolean;
  treatments: ITreatment[];
  activeTreatment: ITreatment | null;
}

const initialState: ITreatmentsState = {
  loading: false,
  treatments: [],
  activeTreatment: null,
};

export const treatmentsSlice = createSlice({
  name: 'treatments',
  initialState,
  reducers: {
    onSetLoadingTreatments: (state, { payload }) => {
      state.loading = payload;
    },

    onLoadTreatments: (state, action: PayloadAction<ITreatment[]>) => {
      state.loading = false;
      state.treatments = action.payload;
      state.activeTreatment = null;
    },

    onSetActiveTreatment: (state, action: PayloadAction<ITreatment | null>) => {
      state.loading = false;
      state.activeTreatment = action.payload;
    },

    onAddNewTreatment: (state, action: PayloadAction<ITreatment>) => {
      state.treatments.push(action.payload);
      state.activeTreatment = null;
    },

    onUpdateTreatment: (state, action: PayloadAction<ITreatment>) => {
      state.loading = false;

      if (state.activeTreatment) {
        state.treatments = state.treatments.map((treatment) =>
          treatment._id === action.payload._id ? action.payload : treatment
        );
        // state.activeTreatment = action.payload;
      }
    },

    // onDeleteTreatment: (state) => {
    //   state.loading = false;
    //   if (state.activeTreatment) {
    //     state.treatments = state.treatments.filter(
    //       (treatment) => treatment.dniNumber !== state.activeTreatment!.dniNumber
    //     );
    //     state.activeTreatment = null;
    //   }
    // },

    onLogOutreatments: (state) => {
      state.treatments = [];
      state.activeTreatment = null;
    },
  },
});

export const {
  onSetLoadingTreatments,
  onLoadTreatments,
  onSetActiveTreatment,
  onAddNewTreatment,
  onUpdateTreatment,
  // onDeleteTreatment,
  onLogOutreatments,
} = treatmentsSlice.actions;
