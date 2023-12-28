import { configureStore } from '@reduxjs/toolkit';

// Slices imports
import { authSlice } from './auth/authSlice';
import { patientsSlice } from './patients/patientsSlice';
import { treatmentsSlice } from './treatments/treatmentsSlice';
// import { activitiesSlice } from './activities/activitiesSlice';
// import { profilesSlice } from './profiles/profilesSlice';
// import { searchSlice } from './search/searchSlice';
// import { reportsSlice } from './reports/reportsSlice';
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    patients: patientsSlice.reducer,
    treatments: treatmentsSlice.reducer,
    // activities: activitiesSlice.reducer,
    // profiles: profilesSlice.reducer,
    // search: searchSlice.reducer,
    // reports: reportsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
