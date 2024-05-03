// rootReducer.js
import { combineReducers } from 'redux';
import userRecordingReducer from './userRecordingReducer';

const rootReducer = combineReducers({
  userRecording: userRecordingReducer,
});

export default rootReducer;
