import { USER } from "../constants/user"

let initialState = {
    loading:false,
    error:"",
    data:[]
}

export const allCampaigns = (state = initialState,action) => {
    switch(action.type){
        case USER.FETCH_CAMPAIGNS_REQUEST:
            return { ...state, loading:true}
        case USER.FETCH_CAMPAIGNS_SUCCESS:
            return { ...state,loading: false,data: action.payload }
        case USER.FETCH_CAMPAIGNS_SUCCESS:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

