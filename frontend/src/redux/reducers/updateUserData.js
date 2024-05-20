import { USER } from "../constants/user";
import {setItem} from '../../../localStorage/setItem'

const initialState = {
  loading: false,
  error: "",
  userData: null,
};

export const updateUserDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.UPDATE_USER_DATA_REQUEST:
      return { ...state, loading: true };
    case USER.UPDATE_USER_DATA_SUCCESS:
      return { ...state, loading: false, userData: action.payload };
    case USER.UPDATE_USER_DATA_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
