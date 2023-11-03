import { ADMIN } from "../constants/admin";

let initialState = {
  loading: false,
  error: "",
  data: "",
};

export const createCampaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN.CREATE_CAMPAIGN_REQUEST:
      return { ...state, loading: true };
    case ADMIN.CREATE_CAMPAIGN_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ADMIN.CREATE_CAMPAIGN_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
