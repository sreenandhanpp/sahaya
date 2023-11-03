import { USER } from "../constants/user";
import { setItem } from "../../../localStorage/setItem";
import { ADMIN } from "../constants/admin";

let initialState = {
  updatedLoading: false,
  error: "",
  data: [],
};

export const updateCampaignReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN.UPDATE_CAMPAIGN_REQUEST:
      return { ...state, updatedLoading: true };
    case ADMIN.CREATE_CAMPAIGN_SUCCESS:
      return { ...state, updatedLoading: false, data: action.payload };
    case ADMIN.CREATE_CAMPAIGN_FAILED:
      return { ...state, updatedLoading: false, error: action.payload };
    default:
      return state;
  }
};
