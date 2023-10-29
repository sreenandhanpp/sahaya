import { ADMIN } from "../constants/admin"

let initialState = {
    loading:false,
    error:"",
    data:[]
}

export const applicationsReducer = (state = initialState,action) => {
    switch(action.type){
        case ADMIN.FETCH_APPLICATIONS_REQUEST:
            return { ...state, loading:true}
        case ADMIN.FETCH_APPLICATIONS_SUCCESS:
            return { ...state,loading: false,data: action.payload }
        case ADMIN.FETCH_APPLICATIONS_FAILED:
            return { ...state,loading: false,error: action.payload }
        default:
            return state
    }
}

