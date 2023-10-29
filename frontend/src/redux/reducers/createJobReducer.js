import { ADMIN } from "../constants/admin"

let initialState = {
    loading:false,
    error:"",
    data:""
}

export const createJobReducer = (state = initialState,action) => {
    switch(action.type){
        case ADMIN.CREATE_JOB_REQUEST:
            return { ...state, loading:true}
        case ADMIN.CREATE_JOB_SUCCESS:
            return { ...state,loading: false,data: action.payload }
        case ADMIN.CREATE_JOB_FAILED:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

