import { USER } from "../constants/user"

let initialState = {
    loading:false,
    error:"",
    data:[]
}

export const userFetchJobReducer = (state = initialState,action) => {
    switch(action.type){
        case USER.FETCH_JOB_REQUEST:
            return { ...state, loading:true}
        case USER.FETCH_JOB_SUCCESS:
            return { ...state,loading: false,data: action.payload }
        case USER.FETCH_JOB_FAILED:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

