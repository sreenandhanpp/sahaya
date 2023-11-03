import { USER } from "../constants/user"
import {setItem} from "../../../localStorage/setItem"

let initialState = {
    loading:false,
    error:"",
    data:[]
}

export const campaign = (state = initialState,action) => {
    switch(action.type){
        case USER.FETCH_CAMPAIGN_REQUEST:
            return { ...state, loading:true}
        case USER.FETCH_CAMPAIGN_SUCCESS:
            return { ...state,loading: false,data: action.payload }
        case USER.FETCH_CAMPAIGN_FAILED:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

