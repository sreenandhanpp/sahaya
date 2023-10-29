import { combineReducers } from "redux";
import { userReducer } from "./reducers/signupReducer";
import { verifyReducer } from "./reducers/verifyOtp";
import { resendOtp } from "./reducers/resendOtp";
import { sendReducer } from "./reducers/sendReducer";
import { updateReducer } from "./reducers/updateReducer";
import { loginReducer } from "./reducers/loginReducer";
import { jobsReducer } from "./reducers/jobsReducer";
import { jobReducer } from "./reducers/jobReducer";
import { deleteJobReducer } from "./reducers/deleteJobReducer";
import { createJobReducer } from "./reducers/createJobReducer";
import { applicationsReducer } from "./reducers/applicationsReducer";
import { userFetchJobReducer } from "./reducers/userFetchJobReducer";
import { getUserDetailsReducer } from "./reducers/getUserDetailsReducer";
import { downloadReducer } from "./reducers/downloadReducer";


export const rootReducers = combineReducers({
  userData: userReducer,
  verify: verifyReducer,
  resendOtp: resendOtp,
  sendOtp: sendReducer,
  updatedData: updateReducer,
  login: loginReducer,
  jobs: jobsReducer,
  job: jobReducer,
  deleteJob: deleteJobReducer,
  createJob: createJobReducer,  
  applications: applicationsReducer,
  userJobDetails: userFetchJobReducer,
  getUserDetails : getUserDetailsReducer,
  download:downloadReducer
});
