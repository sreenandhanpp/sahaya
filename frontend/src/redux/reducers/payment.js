import { USER } from "../constants/user";

let initialState = {
    loading: false,
    error: "",
    success: false, // To track the success state of the payment
    data: null, // Assuming data might contain information about the payment (e.g., confirmation details)
  };
  
  export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER.PAYMENT_REQUEST:
        return { ...state, loading: true, error: "", success: false };
      case USER.PAYMENT_SUCCESS:
        return { ...state, loading: false, data: action.payload, success: true };
      case USER.PAYMENT_FAILED:
        return { ...state, loading: false, error: action.payload, success: false };
      default:
        return state;
    }
  };