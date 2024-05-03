// userRecordingActions.js
export const START_RECORDING = 'START_RECORDING';
export const STOP_RECORDING = 'STOP_RECORDING';

export const startRecording = () => ({
  type: START_RECORDING,
});

export const stopRecording = () => ({
  type: STOP_RECORDING,
});
