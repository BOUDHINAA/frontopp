// userRecordingReducer.js
import { START_RECORDING, STOP_RECORDING } from './userRecordingActions';

const initialState = {
  recording: false,
};

const userRecordingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_RECORDING:
      return {
        ...state,
        recording: true,
      };
    case STOP_RECORDING:
      return {
        ...state,
        recording: false,
      };
    default:
      return state;
  }
};

export default userRecordingReducer;
