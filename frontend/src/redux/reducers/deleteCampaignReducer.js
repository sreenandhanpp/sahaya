import { ADMIN } from "../constants/admin"
import { USER } from "../constants/user"

let initialState = {
    loading:false,
    error:"",
    message:""
}

export const deleteCampaignReducer = (state = initialState,action) => {
    switch(action.type){
        case ADMIN.DELETE_CAMPAIGN_REQUEST:
            return { ...state, loading:true}
        case ADMIN.CREATE_CAMPAIGN_SUCCESS:
            return { ...state,loading: false,message: action.payload }
        case ADMIN.DELETE_CAMPAIGN_FAILED:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

