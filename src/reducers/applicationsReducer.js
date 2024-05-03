/*import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    setApplications(state, action) {
      state.applications = action.payload;
    },
    removeApplication(state, action) {
      state.applications = state.applications.filter(application => application._id !== action.payload);
    },
  },
});

export const { setApplications, removeApplication } = applicationsSlice.actions;
export default applicationsSlice.reducer;
*/