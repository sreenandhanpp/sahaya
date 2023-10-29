import { USER } from "../constants/user"
import {setItem} from "../../../localStorage/setItem"
import { ADMIN } from "../constants/admin"

let initialState = {
    loading:false,
    error:"",
    data:[]
}

export const jobsReducer = (state = initialState,action) => {
    switch(action.type){
        case USER.FETCH_JOBS_REQUEST:
            return { ...state, loading:true}
        case USER.FETCH_JOBS_SUCCESS:
            return { ...state,loading: false,data: action.payload }
        case USER.FETCH_JOBS_FAILED:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

