import { ADMIN } from "../constants/admin"
import { USER } from "../constants/user"

let initialState = {
    loading:false,
    error:"",
    message:""
}

export const deleteJobReducer = (state = initialState,action) => {
    switch(action.type){
        case ADMIN.DELETE_JOB_REQUEST:
            return { ...state, loading:true}
        case ADMIN.DELETE_JOB_SUCCESS:
            return { ...state,loading: false,message: action.payload }
        case ADMIN.DELETE_JOB_FAILED:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

