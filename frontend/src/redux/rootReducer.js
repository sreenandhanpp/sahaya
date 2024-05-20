import { combineReducers } from "redux";
import { userReducer } from "./reducers/signupReducer";
import { verifyReducer } from "./reducers/verifyOtp";
import { resendOtp } from "./reducers/resendOtp";
import { sendReducer } from "./reducers/sendReducer";
import { updateCampaignReducer } from "./reducers/updateCampaignReducer";
import { loginReducer } from "./reducers/loginReducer";
import { allCampaigns } from "./reducers/allCampaigns";
import { campaign } from "./reducers/campaign";
import { deleteCampaignReducer } from "./reducers/deleteCampaignReducer";
import { createCampaignReducer } from "./reducers/createCampaignReducer";
import { applicationsReducer } from "./reducers/applicationsReducer";
import { userFetchJobReducer } from "./reducers/userFetchJobReducer";
import { getUserDetailsReducer } from "./reducers/getUserDetailsReducer";
import { downloadReducer } from "./reducers/downloadReducer";
import { paymentReducer } from "./reducers/payment";
import { fetchDonorsReducer } from "./reducers/fetchdonors";
import { fetchTotalAmountReducer } from "./reducers/totalAmount";
import { updateUserDataReducer } from "./reducers/updateUserData";

export const rootReducers = combineReducers({
  userData: userReducer,
  verify: verifyReducer,
  resendOtp: resendOtp,
  sendOtp: sendReducer,
  updatedData: updateCampaignReducer,
  login: loginReducer,
  allCampaigns: allCampaigns,
  campaign: campaign,
  deleteCampaign: deleteCampaignReducer,
  createCampaign: createCampaignReducer,
  applications: applicationsReducer,
  userJobDetails: userFetchJobReducer,
  getUserDetails: getUserDetailsReducer,
  download: downloadReducer,
  payment:paymentReducer,
  fetchDonors: fetchDonorsReducer,
  totalAmount: fetchTotalAmountReducer,
  updateUserDetails: updateUserDataReducer
});
