import { USER } from "../constants/user"
import {setItem} from "../../../localStorage/setItem"
import { ADMIN } from "../constants/admin"

let initialState = {
    loading:false,
    error:"",
    data:[]
}

export const jobReducer = (state = initialState,action) => {
    switch(action.type){
        case ADMIN.FETCH_JOB_REQUEST:
            return { ...state, loading:true}
        case ADMIN.FETCH_JOB_SUCCESS:
            return { ...state,loading: false,data: action.payload }
        case ADMIN.FETCH_JOB_FAILED:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

