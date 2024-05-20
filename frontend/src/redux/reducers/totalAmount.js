import { USER } from "../constants/user";

const initialState = {
  loading: false,
  error: "",
  totalAmountCollected: 0,
};

export const fetchTotalAmountReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.FETCH_TOTAL_AMOUNT_REQUEST:
      return { ...state, loading: true };
    case USER.FETCH_TOTAL_AMOUNT_SUCCESS:
      return { ...state, loading: false, totalAmountCollected: action.payload };
    case USER.FETCH_TOTAL_AMOUNT_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
