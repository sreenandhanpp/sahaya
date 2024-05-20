import { USER } from "../constants/user";


const initialState = {
  loading: false,
  error: "",
  donors: [],
};

export const fetchDonorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.FETCH_DONORS_REQUEST:
      return { ...state, loading: true };
    case USER.FETCH_DONORS_SUCCESS:
      return { ...state, loading: false, donors: action.payload };
    case USER.FETCH_DONORS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
